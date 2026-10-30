# from flask import Flask
# import requests
import re
from urllib.parse import urlsplit

# app = Flask(__name__)

def url_maker(url):
    '''
    Given a URL, return the hostname

    :param url: The URL to be parsed
    :return: A string of the hostname.
    '''
    if not re.match(r'http(s?)\:', url):
        url = 'http://' + url
    parsed = urlsplit(url)
    host = parsed.netloc
    if host.startswith('www.'):
        host = host[4:]
    return host

# def subscribe_user(email, name):
#   '''
#   Send an email to a user with a link that redirects to start the test.

#   :param email: The email address of the user who is subscribing
#   :param name: The name of the person who is subscribing
#   :return: The status code of the request.
#   '''
#   apikey = ''
#   url = 'https://api.mailgun.net/v3/sandboxead8c9d952aa42348db0d8d36c566e3c.mailgun.org/messages'
#   collected_email = 'CIBER <postmaster@sandboxead8c9d952aa42348db0d8d36c566e3c.mailgun.org>'

#   r = requests.post(url,
#     auth=('api', apikey),
#     data={'from': collected_email,
#       'to': f'{name} <{email}>',
#       'subject': f'Hello {name}',
#       'template': 'confirm-email',
#       # 'h:X-Mailgun-Variables': '{"target_url": "http://127.0.0.1:5000/command"}'
#       })

#   print(r.status_code)
#   return r


# def stream_template(template_name, **context):
#   '''
#   It takes a template name and a bunch of keyword arguments and returns a stream.
#   The stream is a special type of iterator that yields blocks of the template, one by one.

#   :param template_name: The name of the template to render
#   :return: A generator object.
#   '''
#   app.update_template_context(context)
#   t = app.jinja_env.get_template(template_name)
#   rv = t.stream(context)
#   rv.disable_buffering()
#   return rv