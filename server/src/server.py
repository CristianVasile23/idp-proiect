import datetime

from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)


app = Flask(__name__)

# Setup the Flask-JWT-Extended extension
app.config['JWT_SECRET_KEY'] = 'idp-secret-key'
jwt = JWTManager(app)


@app.route("/")
def hello():
	return "Server works!"

@app.route("/login", methods = ['POST'])
def login():
	if not request.is_json:
		return jsonify(msg = "Missing JSON in request"), 400

	userData = request.get_json()

	username = userData["username"]
	password = userData["password"]

	if username == "admin" and password == "admin":

		expires = datetime.timedelta(days=1)
		access_token = create_access_token(identity=username, expires_delta=expires)
		return jsonify(msg = "Login approved", access_token = access_token), 200

	else:
		return jsonify(msg = "Bad username or password"), 401


@app.route("/add_news", methods = ['POST'])
def add_news():
	if not request.is_json:
		return jsonify(msg = "Missing JSON in request"), 400

	userData = request.get_json()

	


@app.route("/get_users")
@jwt_required
def get_users():
	return jsonify(msg = "Found list of users", array = ["Ana", "Andrei", "Alin"] ), 200


@app.route("/get_posts")
@jwt_required
def get_posts():
	return jsonify(msg = "Found list of posts", array = ["Post1", "Post2", "Post3"] ), 200


@app.route("/verify_login", methods = ['GET'])
@jwt_required
def verify_login():
	user = get_jwt_identity()
	return jsonify(logged_in_as = user), 200



if __name__ == "__main__":
	app.run(host='0.0.0.0', port=4000)