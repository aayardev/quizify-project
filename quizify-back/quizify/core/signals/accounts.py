from django.dispatch import receiver
from allauth.account.signals import user_signed_up


@receiver(user_signed_up)
def populate_profile(sociallogin, user, **kwargs):
    if sociallogin.account.provider == "google":
        data = user.socialaccount_set.filter(provider="google")[0]  # noqa
        # if data:
        #     picture = data.get_avatar_url()
        #     if picture:
        #         profile_image = get_remote_image(picture)
        #         user.profile_image.save(os.path.basename(picture), profile_image)
        #         user.save()
