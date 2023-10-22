"""
Database models.
"""


from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.validators import UnicodeUsernameValidator

from stdimage import StdImageField
import random


class UserManager(BaseUserManager):
    """Manager for users."""

    def create_user(self, email, password=None, **extra_fields):
        """Create, save and return a new user."""
        if not email:
            raise ValueError("User must have an email address.")
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """Create and return a new superuser."""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """User in the system."""

    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[UnicodeUsernameValidator()],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )
    first_name = models.CharField(_("Prénom"), max_length=255)
    last_name = models.CharField(_("Nom"), max_length=255)
    profile_image = StdImageField(
        upload_to="users/",
        verbose_name=_("Photo de profile"),
        default="",
        variations={
            "50x50": {"width": 50, "height": 50, "crop": True},
        },
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"

    @property
    def full_name(self):
        if self.first_name and self.last_name:
            return self.first_name.capitalize() + " " + self.last_name

        return ""


class Topic(models.Model):
    # COLORS = [
    #     "#7fc97f",
    #     "#beaed4",
    #     "#fdc086",
    #     "#ffff99",
    #     "#386cb0",
    #     "#f0027f",
    #     "#bf5b17",
    #     "#666666",
    #     "#1f77b4",
    #     "#ff7f0e",
    #     "#2ca02c",
    #     "#d62728",
    #     "#9467bd",
    #     "#8c564b",
    #     "#e377c2",
    #     "#7f7f7f",
    #     "#bcbd22",
    #     "#17becf",
    # ]

    COLORS = [
        "#1f77b4",
        "#ff7f0e",
        "#2ca02c",
        "#ca02cd",
        "#627289",
        "#467bd8",
        "#c564be",
        "#377c27",
        "#f7f7fb",
        "#cbd221",
        "#7becf",
    ]

    name = models.CharField(max_length=50, blank=False, null=False)
    color = models.CharField(max_length=7, default=COLORS[0])

    @property
    def quizzes_count(self):
        return self.quizzes.all().count()

    def save(self, *args, **kwargs):
        if self.pk is None:
            self.color = random.choice(self.COLORS)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name


class Quiz(models.Model):
    TYPE_QCM = 1
    TYPE_QCU = 2

    TYPE_CHOICE = (
        (TYPE_QCM, "QCM"),
        (TYPE_QCU, "QCU"),
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        blank=False,
        null=False,
        related_name="created_quizzes",
    )

    topic = models.ForeignKey(
        Topic,
        on_delete=models.PROTECT,
        blank=False,
        null=False,
        related_name="quizzes",
    )
    type = models.PositiveSmallIntegerField(choices=TYPE_CHOICE, default=TYPE_QCU)

    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def participants_count(self):
        return self.participants.all().count()

    @property
    def likes_count(self):
        return self.likes.all().count()

    def is_liked(self, user):
        return self.likes.filter(user=user).exists()

    def __str__(self) -> str:
        return "Quiz created by {user} in {topic} topic.".format(
            user=self.created_by.full_name, topic=self.topic.name
        )


class Participation(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="participations"
    )
    quiz = models.ForeignKey(
        Quiz, on_delete=models.CASCADE, related_name="participants"
    )
    started_at = models.DateTimeField(auto_now_add=True)
    score = models.PositiveIntegerField(default=0)


class Question(models.Model):
    quiz = models.ForeignKey(
        Quiz,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
        related_name="questions",
    )
    body = models.CharField(max_length=500)

    def __str__(self) -> str:
        return self.question


class LikedQuiz(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes")
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="likes")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.quiz.topic.name + " liked by " + self.user.email


class Option(models.Model):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
        related_name="options",
    )

    body = models.CharField(max_length=500)
    is_correct = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.option


class Answer(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
        related_name="answers",
    )

    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
        related_name="answers",
    )

    option = models.ForeignKey(
        Option,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
        related_name="answers",
    )

    def __str__(self) -> str:
        return self.option.question.question
