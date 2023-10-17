from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_flex_fields import FlexFieldsModelSerializer

from core.models import Quiz, Question, Option, Topic, LikedQuiz

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
        fields = ["id", "name", "quizzes_count", "color"]


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
    is_liked = serializers.SerializerMethodField()
    like_id = serializers.SerializerMethodField()

    def get_type(self, quiz):
        return quiz.get_type_display()

    def get_is_liked(self, quiz):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            if user.is_authenticated:
                return quiz.is_liked(user)
        return False

    def get_like_id(self, quiz):
        if self.get_is_liked(quiz):
            user = self.context.get("request").user
            return LikedQuiz.objects.get(user=user, quiz=quiz).id

        return None

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
            "is_liked",
            "like_id",
        ]


class LikedQuizModelSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = LikedQuiz
        fields = "__all__"
        read_only_fields = ["id", "user", "quiz", "created_at"]
