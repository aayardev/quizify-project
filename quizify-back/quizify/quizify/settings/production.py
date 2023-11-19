from .base import *  # noqa
import sentry_sdk
import cloudinary


DEBUG = False


# Email
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER", "")  # noqa
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD", "")  # noqa


# Sentry

sentry_sdk.init(
    dsn="https://0f53d9269732fbf7cf8df92609b88174@o4506169372246016.ingest.sentry.io/4506169384435712",
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    traces_sample_rate=1.0,
    # Set profiles_sample_rate to 1.0 to profile 100%
    # of sampled transactions.
    # We recommend adjusting this value in production.
    profiles_sample_rate=1.0,
)


# Cloudinary

cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME", ""),  # noqa
    api_key=os.environ.get("CLOUDINARY_API_KEY", ""),  # noqa
    api_secret=os.environ.get("CLOUDINARY_API_SECRET", ""),  # noqa
)
