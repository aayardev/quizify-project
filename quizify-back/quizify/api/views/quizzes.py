import sentry_sdk
from django.conf import settings
from rest_framework import status, views, generics, permissions
from rest_framework.response import Response
from api.serializers import (
    QuizCreateSerializer,
    QuizReadSerializer,
    LikedQuizModelSerializer,
    ParticipationModelSerializer,
    AnswerModelSerializer,
    CheckAnswerSerializer,
)
from api.utils.gpt import create_chat_completion
from core.models import Topic, Quiz, Question, Option, LikedQuiz, Participation, Answer
from django.db.models import Count
from django.shortcuts import get_object_or_404
from api.permissions import CanLikeQuiz


class CreateQuizAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = QuizCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        topic = serializer.validated_data["topic"]

        system_prompt = """
                You are a helpful AI that is able to generate mcq questions and answers,
                store all answers and questions and options in a JSON array.
            """

        # Create new topic if not exist

        created_topic, created = Topic.objects.get_or_create(name=topic.lower())

        if not created:
            db_questions = list(Question.objects.filter(quiz__topic=created_topic))
            if len(db_questions):
                system_prompt += """
                I already have some questions in my database so please ignore the following list of questions:
                """
                formatted_qsts = [
                    f"{index}- {qst.body}" for index, qst in enumerate(db_questions)
                ]
                for qst in formatted_qsts:
                    system_prompt += qst + " \n "

        try:
            questions = create_chat_completion(
                system_prompt=system_prompt,
                user_prompt=[
                    f"You are to generate 5 random hard mcq question about {topic}."
                ],
            )

            # Create new quiz
            quiz = Quiz.objects.create(created_by=request.user, topic=created_topic)

            # Create quiz questions and options
            # random.shuffle(questions)
            for question in questions:
                created_question = Question.objects.create(
                    body=question["question"], quiz=quiz
                )

                # Create question options.

                options_body = [
                    question["answer"],
                    question["option1"],
                    question["option2"],
                    question["option3"],
                ]

                unique_options_body = list(set(options_body))

                # remove the answer
                unique_options_body.remove(question["answer"])

                options = [
                    Option(
                        question=created_question,
                        body=question["answer"],
                        is_correct=True,
                    )
                ]
                options += [
                    Option(
                        question=created_question,
                        body=option,
                        is_correct=True,
                    )
                    for option in unique_options_body
                ]

                Option.objects.bulk_create(options)

            serializer = QuizReadSerializer(quiz)

        except Exception as e:
            sentry_sdk.capture_exception(e)
            return Response(
                {"detail": "Something went wrong"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(serializer.data, status=status.HTTP_200_OK)


create_quiz_api_view = CreateQuizAPIView.as_view()


class LatestQuizzesListAPIView(generics.ListAPIView):
    serializer_class = QuizReadSerializer
    queryset = Quiz.objects.all().order_by("-created_at")
    permission_classes = [permissions.AllowAny]

    filterset_fields = ["topic__name"]


latest_quizzes_list_api_view = LatestQuizzesListAPIView.as_view()


class TopQuizzesListAPIView(generics.ListAPIView):
    serializer_class = QuizReadSerializer
    permission_classes = [permissions.AllowAny]

    filterset_fields = ["topic__name"]

    def get_queryset(self):
        quizzes = Quiz.objects.annotate(
            num_likes=Count("likes"), num_participants=Count("participants")
        ).order_by("-num_likes", "-num_participants")
        return quizzes


top_quizzes_list_api_view = TopQuizzesListAPIView.as_view()


class LikeQuizCreateAPIView(generics.CreateAPIView):
    serializer_class = LikedQuizModelSerializer
    permission_classes = [permissions.IsAuthenticated, CanLikeQuiz]

    def perform_create(self, serializer):
        quiz = get_object_or_404(Quiz, id=self.kwargs["quiz_id"])
        serializer.save(user=self.request.user, quiz=quiz)


like_quiz_create_api_view = LikeQuizCreateAPIView.as_view()


class DislikeQuizDestroyAPIView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = "like_id"

    def get_queryset(self):
        return LikedQuiz.objects.filter(
            user=self.request.user, quiz=self.kwargs["quiz_id"]
        )


dislike_quiz_destroy_api_view = DislikeQuizDestroyAPIView.as_view()


class QuizRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = QuizReadSerializer
    permission_classes = [permissions.AllowAny]
    lookup_url_kwarg = "quiz_id"
    queryset = Quiz.objects.all()


quiz_retrieve_api_view = QuizRetrieveAPIView.as_view()


class LatestParticipationsListAPIView(generics.ListAPIView):
    serializer_class = ParticipationModelSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Participation.objects.filter(quiz=self.kwargs["quiz_id"]).order_by(
            "-started_at"
        )


quiz_latest_participations_list_api_view = LatestParticipationsListAPIView.as_view()


class TopParticipationsListAPIView(generics.ListAPIView):
    serializer_class = ParticipationModelSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Participation.objects.filter(quiz=self.kwargs["quiz_id"]).order_by(
            "-score"
        )


quiz_top_participations_list_api_view = TopParticipationsListAPIView.as_view()


class AnswerCreateAPIView(generics.CreateAPIView):
    serializer_class = AnswerModelSerializer


answer_create_api_view = AnswerCreateAPIView.as_view()


class CheckAnswerAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = CheckAnswerSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        question_id = serializer.validated_data["question"]
        option_id = serializer.validated_data["option"]
        is_first = serializer.validated_data["is_first"]

        question = get_object_or_404(Question, id=question_id)
        option = get_object_or_404(Option, id=option_id)

        try:
            answer = Answer.objects.get(user=request.user, question=question)
            answer.option = option
            answer.save()

        except Answer.DoesNotExist:
            Answer.objects.create(user=request.user, question=question, option=option)

        participation, created = Participation.objects.get_or_create(
            user=request.user, quiz=option.question.quiz
        )

        # if the question is the first one in the quiz reset participation score.
        if is_first:
            participation.score = 0
            participation.save()

        data = {
            "is_correct": option.is_correct,
        }

        if settings.DEBUG:
            data.update({"correct_option": question.correct_option.body})

        if option.is_correct:
            participation.score += 1
            participation.save()

        return Response(
            data,
            status=status.HTTP_200_OK,
        )


check_answer_api_view = CheckAnswerAPIView.as_view()
