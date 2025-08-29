from datetime import timedelta
import json
import os
from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.core.files.storage import default_storage
from django.core.mail import send_mail
from django.http import JsonResponse, HttpResponseRedirect
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import SignupSerializer
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import PGVector
from langchain_cohere import CohereEmbeddings
from ..documents import CONNECTION_STRING, COLLECTION_NAME, load_vectorstore
from ..gemini import get_bot_response
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from dotenv import load_dotenv
load_dotenv()
COHERE_API_KEY = os.getenv("COHERE_API_KEY")

User = get_user_model()

# ---------- Signup ----------
@api_view(['POST'])
def signup_view(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token
        return Response({
            'message': 'Signup successful!',
            'access': str(access),
            'refresh': str(refresh)
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ---------- Login ----------
@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    remember = bool(request.data.get('remember'))

    user = authenticate(request, email=email, password=password)
    if user is None:
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    access = refresh.access_token

    if remember:
        access.set_exp(lifetime=timedelta(days=1))
        refresh.set_exp(lifetime=timedelta(days=30))

    return Response({
        'message': 'Login successful',
        'access': str(access),
        'refresh': str(refresh),
    }, status=status.HTTP_200_OK)


# ---------- Forgot Password ----------
@api_view(['POST'])
def forgot_password_view(request):
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'message': 'If this email exists, a reset link has been sent.'})

    token_generator = PasswordResetTokenGenerator()
    uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
    token = token_generator.make_token(user)
    reset_link = f"http://localhost:3000/reset-password?uid={uidb64}&token={token}"

    try:
        send_mail(
            subject="Password Reset",
            message=f"Use this link to reset your password: {reset_link}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=False,
        )
        return Response({'message': 'Password reset email sent.'}, status=200)
    except Exception as e:
        print("Email sending error:", e)
        return Response({'error': 'Failed to send email.'}, status=500)


# ---------- Google OAuth Helpers ----------
from django.shortcuts import redirect

def google_login_redirect(request):
    return redirect('/accounts/google/login/')

def google_post_login(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect('http://localhost:3000/login?error=google_auth_failed')

    refresh = RefreshToken.for_user(request.user)
    access = refresh.access_token
    frontend_url = f"http://localhost:3000/login?access={str(access)}&refresh={str(refresh)}"
    return HttpResponseRedirect(frontend_url)


# ---------- RAG Endpoints ----------
@csrf_exempt
def upload_document(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=405)

    pdf_file = request.FILES.get("file")
    if not pdf_file:
        return JsonResponse({"error": "No PDF file uploaded"}, status=400)

    file_path = default_storage.save(pdf_file.name, pdf_file)
    full_path = os.path.join(settings.MEDIA_ROOT, file_path)

    loader = PyPDFLoader(full_path)
    documents = loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=150)
    chunks = splitter.split_documents(documents)

    embeddings = CohereEmbeddings(
        model="embed-english-v3.0",
        cohere_api_key=COHERE_API_KEY
    )

    PGVector.from_documents(
        documents=chunks,
        embedding=embeddings,
        connection_string=CONNECTION_STRING,
        collection_name=COLLECTION_NAME,
        pre_delete_collection=True
    )

    return JsonResponse({"message": "✅ PDF processed and embeddings stored."})


@csrf_exempt
def chat_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=405)

    data = json.loads(request.body)
    query = data.get("text", "").strip()
    if not query:
        return JsonResponse({"error": "Empty message"}, status=400)

    vectorstore = load_vectorstore()
    doc_context = ""
    if vectorstore:
        results = vectorstore.similarity_search_with_score(query, k=2)
        if results:
            top_doc, top_score = results[0]
            if top_score > 0.66:
                doc_context = "\n\n".join([doc.page_content for doc, score in results])

    if doc_context:
        enriched_query = (
            f"You are a helpful assistant.\n\n"
            f"Here are some PDF excerpts that *might* help:\n{doc_context}\n\n"
            f"User's question: {query}\n\n"
            f"If the excerpts are relevant, use them. If not, ignore them and answer normally."
        )
        response = get_bot_response(enriched_query)
    else:
        response = get_bot_response(query)

    return JsonResponse({"response": response})
