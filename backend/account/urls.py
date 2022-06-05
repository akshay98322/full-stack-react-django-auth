from django.urls import path
from .views import (UserRegistrationApiView, 
                    UserLoginApiView, 
                    UserProfileApiView, 
                    UserChangePassApiView, 
                    SendPassResetMailApiView,
                    UserPassResetApiView)

urlpatterns = [
    path('register/', UserRegistrationApiView.as_view(), name='register'),
    path('login/', UserLoginApiView.as_view(), name='login'),
    path('profile/', UserProfileApiView.as_view(), name='profile'),
    path('changepass/', UserChangePassApiView.as_view(), name='changepass'),
    path('send-pass-mail/', SendPassResetMailApiView.as_view(), name='send-pass-mail'),
    path('reset-pass/<uid>/<token>/', UserPassResetApiView.as_view(), name='reset-pass'),
]
