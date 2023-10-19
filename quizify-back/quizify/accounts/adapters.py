from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.conf import settings


# from allauth.utils import build_absolute_uri


class AccountAdapter(DefaultAccountAdapter):
    def is_open_for_signup(self, request):
        return getattr(settings, "ACCOUNT_ALLOW_REGISTRATION", True)

    def save_user(self, request, user, form, commit=True):
        return super().save_user(request, user, form, commit)

    def get_email_confirmation_url(self, request, emailconfirmation):
        # Replace 'https://localhost:3000' with your actual frontend URL
        return "{domain}/verify-email/{key}".format(
            domain=settings.FRONTEND_URL, key=emailconfirmation.key
        )


class SocialAccountAdapter(DefaultSocialAccountAdapter):
    def is_open_for_signup(self, request, sociallogin):
        return getattr(settings, "ACCOUNT_ALLOW_REGISTRATION", True)

    def get_email_confirmation_url(self, request, emailconfirmation):
        # Replace 'https://localhost:3000' with your actual frontend URL
        return "{domain}/verify-email/{key}".format(
            domain=settings.FRONTEND_URL, key=emailconfirmation.key
        )
