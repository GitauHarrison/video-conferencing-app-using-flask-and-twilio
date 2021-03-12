import os


class Config(object):
    START_NGROK = os.environ.get('START_NGROK') is not None
    SECRET_KEY = os.environ.get("SECRET_KEY") or 'you-will-never-guess'
