from urllib.parse import urlsplit, urlunsplit
import urllib.request

from django.core.files import File


def change_url_hostname(url, new_hostname):
    url_parts = list(urlsplit(url))
    url_parts[1] = new_hostname
    return urlunsplit(url_parts)


def get_remote_image(image_url):
    result = urllib.request.urlretrieve(image_url)
    return File(open(result[0]))
