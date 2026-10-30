from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms import validators
# from wtforms.fields.html5 import EmailField
from wtforms.validators import DataRequired, Email

class ContactForm(FlaskForm):
    name = StringField("Website URL", validators=[DataRequired()])
    # email = StringField('Work Email address', validators=[DataRequired(), Email()])
    submit = SubmitField("Send")