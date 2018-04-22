import os
from flask import Flask, render_template, request, redirect, url_for, jsonify, json, abort, make_response
from flask_sqlalchemy import SQLAlchemy
from random import randint
from dateutil import parser
from flask_cors import CORS, cross_origin
import datetime

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

DATABASE_URL = os.environ.get('DATABASE_URL', 'sqlite:///flask_app.db')
print(DATABASE_URL)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)

class JsonModel(object):
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class User(db.Model, JsonModel):
    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    name = db.Column(db.String(100))
    start_time = db.Column(db.DateTime())
    end_time = db.Column(db.DateTime())

    def __init__(self, name, start_time, end_time):
        self.name = name
        start_time = parser.parse(start_time)
        end_time = parser.parse(end_time)

        self.start_time = start_time
        self.end_time = end_time


def validate_start_end_time(start_time, end_time, user_id, users=None):
    if start_time >= end_time or start_time <= datetime.datetime.now():
        raise Exception("start_time should be less than end_time")

    if not users:
        users = User.query.all()

    for user in users:
        if user.id == user_id:
            continue
        elif end_time <= user.start_time or start_time >= user.end_time:
            continue
        elif start_time == user.start_time and end_time == user.end_time:
            return False
        elif start_time <= user.start_time and end_time >= user.end_time:
            return False
        elif start_time >= user.start_time and end_time <= user.end_time:
            return False
        elif user.start_time <= start_time <= user.end_time:
            return False
        elif start_time <= user.start_time and end_time < user.end_time:
            return False
        elif user.start_time <= end_time <= user.end_time:
            return False
        elif user.start_time >= end_time >= user.end_time:
            return False
        else:
            continue
    return True


def cleanup():
    for user in User.query.all():
        if datetime.datetime.now() > user.start_time:
            delete_user(user.id)


@app.template_filter('strftime')
@cross_origin()
def _jinja2_filter_datetime(date):
    format='%D - %H:%m'
    return date.strftime(format)


@app.route('/', methods=['GET'])
@cross_origin()
def index():
    cleanup()
    return render_template('index.html', users=User.query.all())


@app.route('/user', methods=['GET'])
@cross_origin()
def get_all():
    return json.dumps([u.as_dict() for u in User.query.all()])


@app.route('/user', methods=['POST'])
@cross_origin()
def create_user():
    user = User(request.form['name'], request.form['start_time'], request.form['end_time'])

    if validate_start_end_time(user.start_time, user.end_time, user.id):
        db.session.add(user)
        db.session.commit()
        return json.dumps(user.as_dict())
    else:
        return abort(400)


@app.route('/user/<user_id>', methods=['PUT'])
@cross_origin()
def update_user(user_id):
    user = User.query.filter_by(id=user_id).first()

    if user is None:
        return abort(404)
    else:
        user.name = request.form['name']
        user.start_time = request.form['start_time']
        user.end_time = request.form['end_time']

        if validate_start_end_time(user.start_time, user.end_time, user.id):
            db.session.commit()
            return json.dumps(user.as_dict())
        else:
            return abort(400)


@app.route('/user/<user_id>', methods=['DELETE'])
@cross_origin()
def delete_user(user_id):
    user = User.query.filter_by(id=user_id).first()

    if user is None:
        return abort(404)
    else:
        db.session.delete(user)
        db.session.commit()
        return json.dumps(user.as_dict())


if __name__ == '__main__':
    db.create_all()
    db.session.commit()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='127.0.0.1', port=port, debug=True)
