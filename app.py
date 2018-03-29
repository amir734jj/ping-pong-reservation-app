import os

from flask import Flask, render_template, request, redirect, url_for, jsonify, json, abort, make_response
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

DATABASE_URL = os.environ.get('DATABASE_URL')

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
db = SQLAlchemy(app)


class JsonModel(object):
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class User(db.Model, JsonModel):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    start_time = db.Column(db.String(100))
    end_time = db.Column(db.String(100))

    def __init__(self, name, start_time, end_time):
        self.name = name
        self.start_time = start_time
        self.end_time = end_time


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/user', methods=['GET'])
def get_all():
    return json.dumps([u.as_dict() for u in User.query.all()])


@app.route('/user', methods=['POST'])
def create_user():
    user = User(request.form['name'], request.form['start_time'], request.form['end_time'])
    db.session.add(user)
    db.session.commit()
    return json.dumps(user.as_dict())


@app.route('/user/<user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.filter_by(id=user_id).first()

    if user is None:
        return abort(404)
    else:
        user.name = request.form['name']
        user.start_time = request.form['start_time']
        user.end_time = request.form['end_time']
        db.session.commit()
        return json.dumps(user.as_dict())


@app.route('/user/<user_id>', methods=['DELETE'])
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
    port = int(os.environ.get('PORT', 80))
    app.run(host='0.0.0.0', port=port, debug=True)
