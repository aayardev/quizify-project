from notifications.models import Notification

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404

from api.serializers import NotificationModelSerializer


class UnreadNotificationsListAPIView(generics.ListAPIView):
    serializer_class = NotificationModelSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.notifications.unread().filter(deleted=False)


unread_notifications_list_api_view = UnreadNotificationsListAPIView.as_view()


class AllNotificationsListAPIView(generics.ListAPIView):
    serializer_class = NotificationModelSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.notifications.all().filter(deleted=False)


all_notifications_list_api_view = AllNotificationsListAPIView.as_view()


class MarkNotificationAsReadAPIView(APIView):
    def post(self, request, notif_id):
        notification = get_object_or_404(Notification, id=notif_id)
        notification.mark_as_read()
        serializer = NotificationModelSerializer(
            notification, context={"request": request}
        )
        return Response(status=status.HTTP_200_OK, data=serializer.data)


mark_notification_as_read_api_view = MarkNotificationAsReadAPIView.as_view()
