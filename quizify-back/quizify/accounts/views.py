from dj_rest_auth.registration.views import VerifyEmailView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter


from dj_rest_auth.registration.views import SocialConnectView


class FacebookConnect(SocialConnectView):
    adapter_class = FacebookOAuth2Adapter
    permission_classes = []


class GoogleConnect(SocialConnectView):
    adapter_class = GoogleOAuth2Adapter
    permission_classes = []


class CustomVerifyEmailView(VerifyEmailView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.kwargs["key"] = serializer.validated_data["key"]
        confirmation = self.get_object()
        confirmation.confirm(self.request)
        return Response({"detail": ("ok")}, status=HTTP_200_OK)


class FacebookLogin(SocialLoginView):
    permission_classes = []
    adapter_class = FacebookOAuth2Adapter
    client_class = OAuth2Client


class GoogleLogin(SocialLoginView):  # if you want to use Implicit Grant, use this
    permission_classes = []
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client


class GithubLogin(SocialLoginView):  # if you want to use Implicit Grant, use this
    permission_classes = []
    adapter_class = GitHubOAuth2Adapter
    client_class = OAuth2Client
