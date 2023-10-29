from rest_framework import generics, permissions, views
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED


from api.serializers import (
    QuizReadSerializer,
    TopicModelSerializer,
    SubscriptionModelSerializer,
)
from core.models import Topic, Quiz
from api.permissions import CanSubscribeToTopic
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


class SubscribeToTopicAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated, CanSubscribeToTopic]

    def post(self, request, topic_id):
        serializer = SubscriptionModelSerializer(
            data={"topic": topic_id, "user": request.user.id}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"detail": "Success!"}, status=HTTP_201_CREATED)


subscribe_to_topic_api_view = SubscribeToTopicAPIView.as_view()
