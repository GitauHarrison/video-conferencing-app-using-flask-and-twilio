import os
from dotenv import load_dotenv

load_dotenv()


class Config(object):
    START_NGROK = os.environ.get('START_NGROK') is not None
    SECRET_KEY = os.environ.get("SECRET_KEY") or 'you-will-never-guess'
    TWILIO_ACCOUNT_SID = os.environ.get("TWILIO_ACCOUNT_SID")
    TWILIO_API_KEY_SID = os.environ.get("TWILIO_API_KEY_SID")
    TWILIO_API_KEY_SECRET = os.environ.get("TWILIO_API_KEY_SECRET")
