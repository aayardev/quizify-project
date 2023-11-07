"""
WSGI config for quizify project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "quizify.settings")


if os.environ.get("DJANGO_ENV") == "production":
    app = get_wsgi_application()
else:
    application = get_wsgi_application()
