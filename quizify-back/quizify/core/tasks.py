# feedback/tasks.py

from celery import shared_task
from core.utils import send_email


@shared_task()
def send_new_quiz_in_topic_email_task(
    user,
    topic,
    reciepents=[],
):
    """Sends an email when a new quiz about topic is published"""

    subject = "{user} shared a new quiz about {topic}.".format(user=user, topic=topic)
    send_email(
        subject,
        reciepents,
        template_name="email/new_quiz_notif.txt",
        template_context={"user": user, "topic": topic},
    )
