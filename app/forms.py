from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class JoinForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()],
                           render_kw={"placeholder": "Username"})
    submit = SubmitField('Join Call', render_kw={"placeholder": "Username"})
