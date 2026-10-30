from flask import Flask, render_template, Response, request, flash, redirect, url_for, stream_with_context, jsonify
# from utils import subscribe_user, stream_template
# from flask_sqlalchemy import SQLAlchemy
from api.utils import url_maker
from flask_cors import cross_origin
from waitress import serve
import subprocess
import os.path
import shlex
import json

###############################################
#          Define flask app                   #
###############################################
app = Flask(__name__)
app.secret_key = 'secretKey'

# This is setting up the database for the app.
# set the database uniform resource identifier for the database
# app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql://postgres:postgres@localhost/ciber'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)

# class User(db.Model):
#   id = db.Column(db.Integer, primary_key=True)
#   website = db.Column(db.String(120))
#   email = db.Column(db.String(120))


###############################################
#       Main page                             #
###############################################
@app.route('/')
def index():
  return 'ciber'


###############################################
#       Download report page                  #
###############################################
@app.route('/download_report')
@cross_origin()
def download_report():
  url = request.args.get('url')
  website = url_maker(url)
  try:
    with open('/var/www/ciber/api/output/'+website+"_vulnerability_report.txt") as f:
      data = f.read()
      return data
  except:
    return json.dumps({'success':False}), 422, {'ContentType':'application/json'}



################################################
# #       Render Contact page                # #
################################################
@app.route('/add', methods=["GET", "POST"], strict_slashes=False)
@cross_origin()
def add_form():
  # here, if the request type is a POST we get the data on contact
  # forms and save them else we return the contact forms html page
  if request.method == 'POST':
    url = request.json["url"]
    # email = request.json["email"]

    # This is a helper function that converts into filtered url
    website = url_maker(url)

    try:
      # user = User(
      #   website=website,
      #   email=email
      # )

      # db.session.add(user)
      # db.session.commit()

      # current_user = User.query.filter_by(website=website).first()
      # rows = exc.execute(website=website, pVal='-pl')

      # response_object = {
      #     'status': 'success',
      #     'message': 'success',
      #     'data': [{"website": website, 
      #               # "template": rows,
      #               "email": email}]
      # }        
      # return jsonify(response_object), 200

      # return jsonify({"success": True})
      # subscribe_user(email=email, name=email.split('@')[0])

      # Execute Scan
      try:
        file_path = '/var/www/ciber/api/output/result-'+website+'.json'
        command = shlex.split('python3 /var/www/ciber/api/rapidscan.py %s' % (website))
        
        # execute the scan
        try:
          subprocess.check_output(command)
          # Checking if the file is empty or not. If it is not empty, it will open the file and return the json.
          if not os.stat(file_path).st_size == 0:
            with open(file_path, 'r') as output:
              return json.load(output)
              output.close()
        except subprocess.CalledProcessError as e:
          print(e.output)
          return json.dumps({'success':False}), 422, {'ContentType':'application/json'}

      except Exception as e:
        return str(e)

    except:
      return jsonify({"register": False})

###############################################
#                Run app                      #
###############################################
if __name__ == '__main__':
  # app.run(debug=True, host='174.140.165.231', port=5000)
  serve(app, host='0.0.0.0', port=8080, threaded=True)
