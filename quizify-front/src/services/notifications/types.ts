declare namespace API {
  type TNotification = {
    id: number;
    notification_url: string;
    notification_image: string | null;
    notification_title: string;
    since: string;
    unread: boolean;
  };

  type TNotifications = API.TResponse<TNotification> & {
    unread_notifications: number;
  };
}
