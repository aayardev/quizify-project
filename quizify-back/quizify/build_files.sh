python3.9 -m venv env
source ./env/bin/activate
pip install -r ../requirements.txt
python manage.py migrate
python manage.py collectstatic
