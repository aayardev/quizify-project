from django.contrib import admin
from core.models import User, Quiz, Answer, Question, Option, Topic


admin.site.register([User, Question, Topic])


@admin.register(Option)
class OptionAdmin(admin.ModelAdmin):
    list_display = ("option", "question", "is_correct")


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ("user", "topic", "type")


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ("user", "question", "option")
