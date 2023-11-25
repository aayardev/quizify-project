from .base import *  # noqa
import dj_database_url


print("settings.test")

DATABASES["default"] = dj_database_url.parse(  # noqa
    "sqlite:///{path}".format(path=os.path.join(BASE_DIR, "sqlite3.db")),  # noqa
)
