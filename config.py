import os


class Config(object):
    START_NGROK = os.environ.get('START_NGROK') is not None
