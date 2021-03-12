from app import app
from flask import render_template, request, abort
from app.forms import JoinForm
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant


@app.route('/', methods=['GET', 'POST'])
@app.route('/join', methods=['GET', 'POST'])
def index():
    form = JoinForm()
    return render_template('index.html', title='Join Video', form=form)


@app.route('/home')
def home():
    return render_template('home.html', title='Home')


@app.route('/login', methods=["POST"])
def login():
    username = request.get_json(force=True).get('username')
    if not username:
        abort(401)
    token = AccessToken(
        app.config["TWILIO_ACCOUNT_SID"],
        app.config["TWILIO_API_KEY_SID"],
        app.config["TWILIO_API_KEY_SECRET"],
        identity=username
    )
    token.add_grant(VideoGrant(room="My Room"))
    return {'token': token.to_jwt().decode()}
