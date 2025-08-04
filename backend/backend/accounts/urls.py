from django.contrib import admin
from django.urls import path, include
from .views import signup_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('accounts.api.urls')),
    path('signup/', signup_view, name='signup'),  # This is correct
    path('accounts/', include('accounts.urls')),  # This includes the main accounts URLs
]
