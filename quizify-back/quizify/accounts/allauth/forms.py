from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings

from allauth.account import app_settings as allauth_account_settings
from allauth.account.adapter import get_adapter
from allauth.account.forms import ResetPasswordForm
from allauth.account.forms import default_token_generator
from allauth.account.utils import (
    user_username,
)

from dj_rest_auth.forms import default_url_generator

from core.utils import change_url_hostname


class CustomResetPasswordForm(ResetPasswordForm):
    def save(self, request, **kwargs):
        current_site = get_current_site(request)
        email = self.cleaned_data["email"]
        token_generator = kwargs.get("token_generator", default_token_generator)

        for user in self.users:
            temp_key = token_generator.make_token(user)

            # send the password reset email
            url_generator = kwargs.get("url_generator", default_url_generator)
            url = url_generator(request, user, temp_key)
            new_url = change_url_hostname(url, settings.FRONTEND_HOSTNAME)

            context = {
                "current_site": current_site,
                "user": user,
                "password_reset_url": new_url,
                "request": request,
            }
            if (
                allauth_account_settings.AUTHENTICATION_METHOD
                != allauth_account_settings.AuthenticationMethod.EMAIL
            ):
                context["username"] = user_username(user)
            get_adapter(request).send_mail(
                "account/email/password_reset_key", email, context
            )
        return self.cleaned_data["email"]
