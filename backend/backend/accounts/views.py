from django.shortcuts import render
from django.contrib.auth.forms import AuthenticationForm

# Create your views here.
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Account created successfully!')
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'users/register.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            error = "Invalid credentials"
            return render(request, 'users/login.html', {'error': error})
    return render(request, 'users/login.html')

def user_logout(request):
    logout(request)
    return redirect('home')  # Redirect to home page after logout

def user_home(request):
    if not request.user.is_authenticated:
        return redirect('login')
    return render(request, 'users/home.html')

def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')  # or your desired redirect
    else:
        form = UserCreationForm()
    return render(request, 'users/register.html', {'form': form})


def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')  # or some dashboard page
    else:
        form = AuthenticationForm()
    return render(request, 'users/login.html', {'form': form})
