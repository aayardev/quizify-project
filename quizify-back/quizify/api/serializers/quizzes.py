from rest_framework import serializers
from rest_flex_fields import FlexFieldsModelSerializer

import timeago

from core.models import Quiz, Question, Option, LikedQuiz, Participation
from .users import UserModelSerializer
from .topics import TopicModelSerializer


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


class ParticipationModelSerializer(FlexFieldsModelSerializer):
    user = UserModelSerializer()
    timesince = serializers.SerializerMethodField()

    def get_timesince(self, participation):
        return timeago.format(participation.started_at.replace(tzinfo=None))

    class Meta:
        model = Participation
        fields = ["id", "user", "timesince"]
