from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import SignupSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.conf import settings
import os
import json

from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import PGVector
from langchain_cohere import CohereEmbeddings

from ..documents import CONNECTION_STRING, COLLECTION_NAME, load_vectorstore
from ..gemini import get_bot_response  # ✅ reuse Gemini wrapper

from dotenv import load_dotenv
load_dotenv()
COHERE_API_KEY = os.getenv("COHERE_API_KEY")

@api_view(['POST'])
def signup_view(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Signup successful!'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(request, email=email, password=password)

    if user is not None:
        # ✅ Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'Login successful',
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

@csrf_exempt
def upload_document(request):
    """Uploads PDF, splits text, creates embeddings."""
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=405)

    pdf_file = request.FILES.get("file")
    if not pdf_file:
        return JsonResponse({"error": "No PDF file uploaded"}, status=400)

    file_path = default_storage.save(pdf_file.name, pdf_file)
    full_path = os.path.join(settings.MEDIA_ROOT, file_path)

    # Load and split PDF
    loader = PyPDFLoader(full_path)
    documents = loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=150)
    chunks = splitter.split_documents(documents)

    embeddings = CohereEmbeddings(
        model="embed-english-v3.0",
        cohere_api_key=COHERE_API_KEY
    )

    # Create / overwrite collection
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
    """Handles both document-based and general queries (with Tavily search via Gemini)."""
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=405)

    data = json.loads(request.body)
    query = data.get("text", "").strip()
    if not query:
        return JsonResponse({"error": "Empty message"}, status=400)

    # 1️⃣ Try semantic search from documents
    vectorstore = load_vectorstore()
    doc_context = ""
    if vectorstore:
        results = vectorstore.similarity_search_with_score(query, k=2)

        if results:
            top_doc, top_score = results[0]

            if top_score > 0.66:  # Only if document is strongly relevant
                doc_context = "\n\n".join([doc.page_content for doc, score in results])

    # 2️⃣ Build final query for Gemini
    if doc_context:
        enriched_query = (
            f"You are a helpful assistant.\n\n"
            f"Here are some PDF excerpts that *might* help:\n{doc_context}\n\n"
            f"User's question: {query}\n\n"
            f"If the excerpts are relevant, use them. If not, ignore them and answer normally."
        )
        response = get_bot_response(enriched_query)
    else:
        # No strong doc match → fallback to Gemini agent (handles Tavily + normal Q&A)
        response = get_bot_response(query)

    return JsonResponse({"response": response})