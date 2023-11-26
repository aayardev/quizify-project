from urllib.parse import urlsplit, urlunsplit
from django.core.files import File
import requests
from django.core.files.temp import NamedTemporaryFile
from django.core.mail import EmailMessage
from django.conf import settings
from django.template.loader import render_to_string
from django.contrib.sites.models import Site


def change_url_hostname(url, new_hostname):
    url_parts = list(urlsplit(url))
    url_parts[1] = new_hostname
    return urlunsplit(url_parts)


def get_remote_image(url):
    r = requests.get(url)
    img_temp = NamedTemporaryFile(delete=True)
    img_temp.write(r.content)
    img_temp.flush()
    return File(img_temp)


def send_email(subject="", recipients=[], template_name="", template_context={}):
    from_email = settings.DEFAULT_FROM_EMAIL
    to_email = (settings.ADMIN_EMAIL,)
    current_site = Site.objects.get_current()
    template_context["current_site"] = current_site
    body = render_to_string(template_name, template_context)
    msg = EmailMessage(
        subject=subject, body=body, from_email=from_email, to=to_email, bcc=recipients
    )
    msg.content_subtype = "html"
    msg.send()
