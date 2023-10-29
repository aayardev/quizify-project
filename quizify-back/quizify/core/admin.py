from django.contrib import admin
from core.models import (
    User,
    Quiz,
    Answer,
    Question,
    Option,
    Topic,
    LikedQuiz,
    Participation,
    Subscription,
)


admin.site.register([User, Question, Topic, LikedQuiz, Participation, Subscription])


@admin.register(Option)
class OptionAdmin(admin.ModelAdmin):
    list_display = ("body", "question", "is_correct")


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ("created_by", "topic", "type")


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ("user", "question", "option")
