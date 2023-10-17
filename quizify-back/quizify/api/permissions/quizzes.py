from rest_framework import permissions
from core.models import LikedQuiz


class CanLikeQuiz(permissions.BasePermission):
    message = "Not allowed to like this quiz."

    def has_permission(self, request, view):
        can_like = not LikedQuiz.objects.filter(
            user=request.user, quiz=view.kwargs["quiz_id"]
        ).exists()

        return can_like
