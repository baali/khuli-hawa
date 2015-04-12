from flask import Flask
from functools import wraps
from flask import request
app = Flask(__name__)

from settings import *
from os.path import join, abspath, dirname
import csv

BASE_DIR = abspath(dirname(__file__))

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if request.form['username'] == username.decode('utf-8') and request.form['password'] == password:
            return f(*args, **kwargs)
        else:
            app.logger.warning('Attempt to post data with request %s', request.data)
            return "You are not authorized to push data here!"
    return decorated_function

@app.route("/post_data", methods=['POST'])
@login_required
def post_data():
    with open(join( BASE_DIR, 'data-logs.csv'), 'a') as data_file:
        fieldnames = ['type', 'value', 'timestamp']
        logwriter = csv.DictWriter(data_file, fieldnames=fieldnames)
        row = {'type':request.form['type'], 
               'value':request.form['value'],
               'timestamp':request.form['timestamp'], 
           }
        logwriter.writerow(row)
        app.logger.debug('Added data %s', request.form)
        return "Logged data successfully!"
