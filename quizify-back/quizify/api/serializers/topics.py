from rest_framework import serializers
from rest_flex_fields import FlexFieldsModelSerializer

from core.models import Topic, Subscription


class TopicModelSerializer(FlexFieldsModelSerializer):
    quizzes_count = serializers.IntegerField()
    is_subscribed = serializers.SerializerMethodField()

    def get_is_subscribed(self, topic):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            if user.is_authenticated:
                return topic.is_subscribed(user)
        return False

    class Meta:
        model = Topic
        fields = ["id", "name", "quizzes_count", "color", "is_subscribed"]


class SubscriptionModelSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Subscription
        fields = "__all__"
        read_only_fields = ["id"]
