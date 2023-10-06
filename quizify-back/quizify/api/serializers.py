from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_flex_fields import FlexFieldsModelSerializer

from core.models import Quiz, Question, Option, Topic

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


class TopicModelSerializer(FlexFieldsModelSerializer):
    quizzes_count = serializers.IntegerField()

    class Meta:
        model = Topic
        fields = ["id", "name", "quizzes_count"]


class OptionModelSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Option
        fields = ["body", "is_correct"]


class QuestionModelSerializer(FlexFieldsModelSerializer):
    options = OptionModelSerializer(many=True)

    class Meta:
        model = Question
        fields = ["body", "options"]


class QuizCreateSerializer(serializers.Serializer):
    topic = serializers.CharField(max_length=50)


class QuizReadSerializer(FlexFieldsModelSerializer):
    questions = QuestionModelSerializer(many=True)
    created_by = UserModelSerializer()
    topic = TopicModelSerializer()
    type = serializers.SerializerMethodField()
    participants_count = serializers.IntegerField()
    likes_count = serializers.IntegerField()

    def get_type(self, quiz):
        return quiz.get_type_display()

    class Meta:
        model = Quiz
        fields = [
            "id",
            "created_by",
            "topic",
            "type",
            "questions",
            "participants_count",
            "likes_count",
        ]
