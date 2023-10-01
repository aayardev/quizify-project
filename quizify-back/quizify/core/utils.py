from urllib.parse import urlsplit, urlunsplit


def change_url_hostname(url, new_hostname):
    url_parts = list(urlsplit(url))
    url_parts[1] = new_hostname
    return urlunsplit(url_parts)
