from app import app
from flask import render_template


@app.route('/')
@app.route('/join')
def index():
    return render_template('index.html', title='Join Video')


