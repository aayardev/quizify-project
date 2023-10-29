from rest_framework import serializers
from rest_flex_fields import FlexFieldsModelSerializer

from django.contrib.humanize.templatetags.humanize import naturaltime
from core.models import Quiz, Question, Option, LikedQuiz, Participation, Answer
from .users import UserModelSerializer
from .topics import TopicModelSerializer


class OptionListSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.order_by("?")
        return super(OptionListSerializer, self).to_representation(data)


class OptionModelSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Option
        fields = ["id", "body"]
        list_serializer_class = OptionListSerializer


class QuestionModelSerializer(FlexFieldsModelSerializer):
    options = OptionModelSerializer(many=True)

    class Meta:
        model = Question
        fields = ["id", "body", "options"]


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
    is_played = serializers.SerializerMethodField()
    score = serializers.SerializerMethodField()

    def get_type(self, quiz):
        return quiz.get_type_display()

    def get_is_liked(self, quiz):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            if user.is_authenticated:
                return quiz.is_liked(user)
        return False

    def get_is_played(self, quiz):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            if user.is_authenticated:
                return quiz.is_played(user)
        return False

    def get_like_id(self, quiz):
        if self.get_is_liked(quiz):
            user = self.context.get("request").user
            return LikedQuiz.objects.get(user=user, quiz=quiz).id

        return None

    def get_score(self, quiz):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            if user.is_authenticated:
                return quiz.score(user)
        return 0

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
            "is_played",
            "score",
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
        return naturaltime(participation.started_at.replace(tzinfo=None))

    class Meta:
        model = Participation
        fields = ["id", "user", "timesince", "score"]


class AnswerModelSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Answer
        fields = ["id", "question", "option"]
        read_only_fields = ["id"]


class CheckAnswerSerializer(serializers.Serializer):
    question = serializers.IntegerField()
    option = serializers.IntegerField()
    is_first = serializers.BooleanField()
