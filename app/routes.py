from app import app
from flask import render_template, request, abort
from app.forms import JoinForm
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant


@app.route('/', methods=['GET', 'POST'])
@app.route('/home', methods=['GET', 'POST'])
def home():
    form = JoinForm()
    return render_template('home.html', title='Join Video', form=form)


@app.route('/login', methods=['POST'])
def login():
    username = request.get_json(force=True).get('username')
    if not username:
        abort(401)
    token = AccessToken(app.config["TWILIO_ACCOUNT_SID"],
                        app.config["TWILIO_API_KEY_SID"],
                        app.config["TWILIO_API_KEY_SECRET"],
                        identity=username)
    token.add_grant(VideoGrant(room='My Room'))
    return {'token': token.to_jwt().decode()}
