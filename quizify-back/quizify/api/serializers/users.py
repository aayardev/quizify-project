from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_flex_fields import FlexFieldsModelSerializer


User = get_user_model()


class UserModelSerializer(FlexFieldsModelSerializer):
    full_name = serializers.CharField()

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "full_name",
            "email",
            "profile_image",
        ]
