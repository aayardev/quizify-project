from rest_framework import serializers
from rest_flex_fields import FlexFieldsModelSerializer

from core.models import Topic, Subscription


class TopicModelSerializer(FlexFieldsModelSerializer):
    quizzes_count = serializers.IntegerField()

    class Meta:
        model = Topic
        fields = ["id", "name", "quizzes_count", "color"]


class SubscriptionModelSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Subscription
        fields = "__all__"
        read_only_fields = ["id"]
