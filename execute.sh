#!/bin/bash

# Check if a command argument is provided
if [ $# -eq 0 ]; then
    echo "Please provide a Django command."
    exit 1
fi

# Path to your virtual environment
VENV_PATH="./quizify-back/env/bin/activate"

# Activate the virtual environment
source $VENV_PATH

# Run the Django command
python ./quizify-back/quizify/manage.py $@
