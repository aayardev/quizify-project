from rest_framework import permissions
from core.models import Subscription


class CanSubscribeToTopic(permissions.BasePermission):
    message = "Already subscribed."

    def has_permission(self, request, view):
        can_subscribe = not Subscription.objects.filter(
            topic__id=view.kwargs["topic_id"], user__id=request.user.id
        )

        return can_subscribe
