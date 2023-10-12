from django.urls import path
from . import views

urlpatterns = [
    path("create-quiz/", views.create_quiz_api_view, name="quiz_create"),
    path("latest-quizzes/", views.latest_quizzes_list_api_view, name="latest_quizzes"),
    path("top-quizzes/", views.top_quizzes_list_api_view, name="top_quizzes"),
    path("topics/", views.topic_list_api_view, name="topic_list"),
    path(
        "topics/<str:topic_id>/top-quizzes/",
        views.topic_top_quizzes_list_api_view,
        name="topic_top_quizzes",
    ),
    path(
        "topics/<str:topic_id>/latest-quizzes/",
        views.topic_latest_quizzes_list_api_view,
        name="topic_latest_quizzes",
    ),
]
