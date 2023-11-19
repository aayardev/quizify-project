from .base import *  # noqa
import dj_database_url


DATABASES["default"] = dj_database_url.config(  # noqa
    default="sqlite:///{path}".format(
        path=os.path.join(BASE_DIR, "sqlite3.db")  # noqa
    ),
)
