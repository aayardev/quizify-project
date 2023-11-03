from django.urls import path, include
from .views import (
    CustomVerifyEmailView,
    FacebookLogin,
    FacebookConnect,
    GoogleLogin,
    GoogleConnect,
    GithubLogin,
)

urlpatterns = [
    path("", include("dj_rest_auth.urls")),
    path("", include("allauth.urls")),
    path(
        "registration/verify-email/",
        CustomVerifyEmailView.as_view(),
        name="rest_verify_email",
    ),
    path("registration/", include("dj_rest_auth.registration.urls")),
    path("facebook/", FacebookLogin.as_view(), name="fb_login"),
    path("google/", GoogleLogin.as_view(), name="google_login"),
    path("github/", GithubLogin.as_view(), name="github_login"),
    path("facebook/connect/", FacebookConnect.as_view(), name="fb_connect"),
    path("google/connect/", GoogleConnect.as_view(), name="google_connect"),
]
