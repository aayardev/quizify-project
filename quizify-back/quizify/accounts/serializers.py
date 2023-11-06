import os
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import (
    UserDetailsSerializer,
    LoginSerializer,
    PasswordResetSerializer,
)
from rest_framework import serializers
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.forms import PasswordResetForm

from accounts.allauth.forms import CustomResetPasswordForm
from cloudinary import uploader


User = get_user_model()
CLOUD_NAME = os.environ.get("CLOUDINARY_CLOUD_NAME", "")


class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(max_length=255, required=True)
    last_name = serializers.CharField(max_length=255, required=True)
    # profile_image = serializers.ImageField()

    def custom_signup(self, request, user):
        user.first_name = self.validated_data.get("first_name")
        user.last_name = self.validated_data.get("last_name")
        # user.profile_image = self.validated_data.get("profile_image")
        user.save()

    def validate_email(self, email):
        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError(
                _("A user is already registered with this e-mail address."),
            )
        return super().validate_email(email)


class CustomUserDetailsSerializer(UserDetailsSerializer):
    full_name = serializers.CharField()
    profile_image_url = serializers.SerializerMethodField(read_only=True)

    def get_profile_image_url(self, user):
        return "https://res.cloudinary.com/{cloud}/image/upload/{image}".format(
            cloud=CLOUD_NAME, image=user.profile_image
        )

    class Meta(UserDetailsSerializer.Meta):
        fields = [
            "id",
            "first_name",
            "last_name",
            "full_name",
            "email",
            "profile_image",
            "profile_image_url",
        ]
        extra_kwargs = {"profile_image": {"write_only": True}}

    def update(self, instance, validated_data):
        profile_image = validated_data.get("profile_image", None)
        if profile_image:
            uploader.destroy(instance.profile_image.public_id, invalidate=True)
        return super().update(instance, validated_data)


class CustomLoginSerializer(LoginSerializer):
    @staticmethod
    def validate_email_verification_status(user, email=None):
        try:
            LoginSerializer.validate_email_verification_status(user, email)
        except serializers.ValidationError as e:
            raise serializers.ValidationError(
                {
                    "message": e.detail[0].__str__(),
                    "code": settings.EMAIL_NON_VERIFIED_ERROR_CODE,
                }
            )


class CustomPasswordResetSerializer(PasswordResetSerializer):
    def validate_email(self, value):
        if not User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                _("No user is registered with this e-mail address."),
            )
        return super().validate_email(value)

    @property
    def password_reset_form_class(self):
        if "allauth" in settings.INSTALLED_APPS:
            return CustomResetPasswordForm
        else:
            return PasswordResetForm
