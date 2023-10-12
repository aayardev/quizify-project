from rest_framework import generics, permissions
from api.serializers import (
    QuizReadSerializer,
    TopicModelSerializer,
)
from core.models import Topic, Quiz
from django.db.models import Count


class TopicListAPIView(generics.ListAPIView):
    serializer_class = TopicModelSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Topic.objects.annotate(num_quizzes=Count("quizzes")).order_by(
            "num_quizzes"
        )


topic_list_api_view = TopicListAPIView.as_view()


class TopicTopQuizzesListAPIView(generics.ListAPIView):
    serializer_class = QuizReadSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return (
            Quiz.objects.filter(topic__id=self.kwargs["topic_id"])
            .annotate(num_likes=Count("likes"), num_participants=Count("participants"))
            .order_by("-num_likes", "-num_participants")
        )


topic_top_quizzes_list_api_view = TopicTopQuizzesListAPIView.as_view()


class TopicLatestQuizzesListAPIView(generics.ListAPIView):
    serializer_class = QuizReadSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Quiz.objects.filter(topic__id=self.kwargs["topic_id"]).order_by(
            "-created_at"
        )


topic_latest_quizzes_list_api_view = TopicLatestQuizzesListAPIView.as_view()
