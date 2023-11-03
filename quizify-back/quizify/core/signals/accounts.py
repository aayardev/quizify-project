from django.dispatch import receiver
from allauth.account.signals import user_signed_up
from core.utils import get_remote_image


@receiver(user_signed_up)
def populate_profile(user, **kwargs):
    sociallogin = kwargs.get("sociallogin", None)
    if sociallogin:
        if sociallogin.account.provider == "google":
            socialaccount = user.socialaccount_set.filter(provider="google")[0]
            if socialaccount:
                avatar_url = socialaccount.get_avatar_url()
                if avatar_url:
                    profile_image = get_remote_image(avatar_url)
                    user.profile_image.save(
                        "{}.jpg".format(user.username), profile_image
                    )
                    user.save()

        if sociallogin.account.provider == "github":
            socialaccount = user.socialaccount_set.filter(provider="github")[0]
            if socialaccount:
                avatar_url = socialaccount.get_avatar_url()
                if avatar_url:
                    profile_image = get_remote_image(avatar_url)
                    user.profile_image.save(
                        "{}.jpg".format(user.username), profile_image
                    )
                    user.save()
