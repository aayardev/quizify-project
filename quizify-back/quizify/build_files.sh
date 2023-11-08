python3.9 -m venv env
source ./env/bin/activate
./env/bin/pip install -r ../requirements.txt
./env/bin/python manage.py migrate
./env/bin/python manage.py collectstatic
