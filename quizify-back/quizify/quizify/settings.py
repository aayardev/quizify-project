"""
Django settings for quizify project.

Generated by 'django-admin startproject' using Django 4.2.5.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/

"""
import os
from datetime import timedelta
from pathlib import Path

from dotenv import load_dotenv


# Take environment variables from .env.
load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-l&@9s7c)w*=$2x&c$29zmc0$44wz7dq$-x5*b8l6ftv)%6ywab"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
    # Third-party apps
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    "allauth.socialaccount.providers.facebook",
    "allauth.socialaccount.providers.github",
    "dj_rest_auth.registration",
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",
    "dj_rest_auth",
    "stdimage",
    "django_filters",
    "colorfield",
    "notifications",
    # Local apps
    "core",
    "accounts",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "quizify.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "quizify.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    # "default": {
    #     "ENGINE": "django.db.backends.sqlite3",
    #     "NAME": os.path.join(BASE_DIR, "sqlite3.db"),
    # }
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "HOST": os.environ.get("DB_HOST"),
        "NAME": os.environ.get("DB_NAME"),
        "USER": os.environ.get("DB_USER"),
        "PASSWORD": os.environ.get("DB_PASS"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",  # noqa
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"  # For Deployment

# Media files
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "mediafiles"
# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"


AUTH_USER_MODEL = "core.User"

# django-allauth

UNIQUE_EMAIL = True

ACCOUNT_EMAIL_REQUIRED = True

ACCOUNT_USERNAME_REQUIRED = False

ACCOUNT_AUTHENTICATION_METHOD = "email"

ACCOUNT_UNIQUE_EMAIL = True

ACCOUNT_ALLOW_REGISTRATION = True

ACCOUNT_EMAIL_VERIFICATION = "mandatory"

SITE_ID = 1


# https://django-allauth.readthedocs.io/en/latest/configuration.html
ACCOUNT_ADAPTER = "accounts.adapters.AccountAdapter"

# https://django-allauth.readthedocs.io/en/latest/configuration.html
SOCIALACCOUNT_ADAPTER = "accounts.adapters.SocialAccountAdapter"

# dj-rest-auth

REST_AUTH = {
    "REGISTER_SERIALIZER": "accounts.serializers.CustomRegisterSerializer",
    "USER_DETAILS_SERIALIZER": "accounts.serializers.CustomUserDetailsSerializer",
    "LOGIN_SERIALIZER": "accounts.serializers.CustomLoginSerializer",
    "PASSWORD_RESET_SERIALIZER": "accounts.serializers.CustomPasswordResetSerializer",
    "USE_JWT": True,
    "JWT_AUTH_RETURN_EXPIRATION": True,
    "JWT_AUTH_HTTPONLY": False,
    "OLD_PASSWORD_FIELD_ENABLED": True,
}

EMAIL_NON_VERIFIED_ERROR_CODE = 0

# allauth

SOCIALACCOUNT_PROVIDERS = {
    "github": {
        "SCOPE": [
            "user",
            "repo",
            "read:org",
        ],
    },
    "google": {
        "SCOPE": [
            "profile",
            "email",
        ],
        "AUTH_PARAMS": {
            "access_type": "online",
        },
        "OAUTH_PKCE_ENABLED": True,
    },
}


# rest_framework

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "dj_rest_auth.jwt_auth.JWTCookieAuthentication",
        # Need this for drf api web interface.
        "rest_framework.authentication.SessionAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_PAGINATION_CLASS": "api.utils.pagination.PageNumberPagination",
    "DEFAULT_FILTER_BACKENDS": ("django_filters.rest_framework.DjangoFilterBackend",),
}

# django-rest-framework-simplejwt

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=1),
}


# cors-headers

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]


FRONTEND_URL = "http://localhost:3000"

FRONTEND_HOSTNAME = "localhost:3000"
