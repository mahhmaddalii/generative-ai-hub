from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .views import signup_view  # keep your existing signup view if needed

urlpatterns = [
    path('admin/', admin.site.urls),

    # ✅ JWT token endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # App-level API endpoints
    path('api/', include('accounts.api.urls')),

    # Existing project-level signup if still needed
    path('signup/', signup_view, name='signup'),
    path('accounts/', include('accounts.urls')),
]
