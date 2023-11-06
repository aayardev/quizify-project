import os
from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_flex_fields import FlexFieldsModelSerializer


User = get_user_model()
CLOUD_NAME = (os.environ.get("CLOUDINARY_CLOUD_NAME", ""),)


class UserModelSerializer(FlexFieldsModelSerializer):
    full_name = serializers.CharField()
    profile_image_url = serializers.CharField(source="profile_image.url")

    class Meta:
        model = User
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
        return super().update(instance, validated_data)
