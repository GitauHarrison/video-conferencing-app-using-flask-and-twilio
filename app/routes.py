from app import app
from flask import render_template
# from app.forms import JoinForm


@app.route('/', methods=['GET', 'POST'])
@app.route('/join', methods=['GET', 'POST'])
def index():
    # form = JoinForm()
    # return render_template('index.html', title='Join Video', form=form)
    return render_template('index.html', title='Join Video')


@app.route('/home', methods=['POST'])
def home():
    render_template('home.html', title='Home')
