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
        return self.first_name.capitalize() + " " + self.last_name


class Topic(models.Model):
    topic = models.CharField(max_length=50, blank=False, null=False)

    def __str__(self) -> str:
        return self.topic


class Quiz(models.Model):
    TYPE_QCM = 1
    TYPE_QCU = 2

    TYPE_CHOICE = (
        (TYPE_QCM, "QCM"),
        (TYPE_QCU, "QCU"),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        blank=False,
        null=False,
        related_name="quizzes",
    )

    topic = models.ForeignKey(
        Topic,
        on_delete=models.PROTECT,
        blank=False,
        null=False,
        related_name="quizzes",
    )
    type = models.PositiveSmallIntegerField(choices=TYPE_CHOICE, default=TYPE_QCU)

    def __str__(self) -> str:
        return "Quiz created by {user} in {topic} topic.".format(
            user=self.user.full_name, topic=self.topic.topic
        )


class Question(models.Model):
    quiz = models.ForeignKey(
        Quiz,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
        related_name="questions",
    )
    question = models.CharField(max_length=500)

    def __str__(self) -> str:
        return self.question


class Option(models.Model):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
        related_name="options",
    )

    option = models.CharField(max_length=500)
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
        return self.option
