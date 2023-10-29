from rest_framework import serializers
from notifications.models import Notification
from django.contrib.auth import get_user_model

from api.serializers import (
    UserModelSerializer,
    QuizReadSerializer,
    TopicModelSerializer,
)
from core.models import Quiz, Topic

User = get_user_model()


class ActorField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, User):
            serializer = UserModelSerializer(value)
        else:
            raise Exception("Unexpected type of action object")
        return serializer.data


class TargetField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, Topic):
            serializer = TopicModelSerializer(value)
        else:
            raise Exception("Unexpected type of action object")
        return serializer.data


class ActionObjectField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, Quiz):
            serializer = QuizReadSerializer(value, fields=["id", "topic"])
        else:
            raise Exception("Unexpected type of action object")
        return serializer.data


class NotificationModelSerializer(serializers.ModelSerializer):
    # actor = ActorField(read_only=True)
    # action_object = ActionObjectField(read_only=True)
    # target = TargetField(read_only=True)

    notification_url = serializers.SerializerMethodField()
    notification_image = serializers.SerializerMethodField()
    notification_title = serializers.SerializerMethodField()
    since = serializers.CharField(source="naturaltime")

    def get_notification_url(self, notif):
        return notif.action_object.notification_url

    def get_notification_image(self, notif):
        return notif.action_object.notification_image

    def get_notification_title(self, notif):
        return notif.action_object.notification_title

    class Meta:
        model = Notification
        fields = [
            "id",
            "notification_url",
            "notification_image",
            "notification_title",
            "since",
        ]
