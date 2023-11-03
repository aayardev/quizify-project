from urllib.parse import urlsplit, urlunsplit
from django.core.files import File
import requests
from django.core.files.temp import NamedTemporaryFile


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
