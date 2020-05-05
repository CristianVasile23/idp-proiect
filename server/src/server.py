import datetime
import os
import psycopg2

import hashlib

from prometheus_flask_exporter import PrometheusMetrics

from flask import Flask, request, jsonify

from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

# Environment variables
db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_pass = os.getenv("DB_PASS")

# Hash secret
secret = "my_hash_secret"

app = Flask(__name__)

# Setup the Flask-JWT-Extended extension
app.config['JWT_SECRET_KEY'] = 'idp-secret-key'
jwt = JWTManager(app)

# Prometheus metrics
metrics = PrometheusMetrics(app)
metrics.info('app_info', 'Application info', version='1.0.3')


@app.route("/")
def hello():
	return "Server works!"

@app.route("/login", methods = ['POST'])
def login():
	if not request.is_json:
		return jsonify(msg = "Missing JSON in request"), 400

	userData = request.get_json()

	username = userData["username"]
	password = hashlib.md5((userData["password"] + secret).encode()).hexdigest()

	try:
		conn = psycopg2.connect(host="db", database=db_name, user=db_user, password=db_pass)
	except OperationalError as err:
		print(err)
		return jsonify(msg = "Failed to connect to DB"), 400

	try:
		cursor = conn.cursor()

		cursor.execute("SELECT passwd FROM users WHERE username = %s", (username,))
		user_password = cursor.fetchone()[0]

		conn.commit()
	except Exception as err:
		print(err)
		conn.rollback()
		return jsonify(msg = "Failed to get password"), 400
	finally:
		cursor.close()
		conn.close()

	if password == user_password:

		expires = datetime.timedelta(days=1)
		access_token = create_access_token(identity=username, expires_delta=expires)

		return jsonify(msg = "Login approved", access_token = access_token), 200

	else:
		return jsonify(msg = "Bad username or password"), 401


@app.route("/add_post", methods = ['POST'])
@jwt_required
def add_post():
	if not request.is_json:
		return jsonify(msg = "Missing JSON in request"), 400

	user = get_jwt_identity()
	user_data = request.get_json()
	
	try:
		conn = psycopg2.connect(host="db", database=db_name, user=db_user, password=db_pass)
	except OperationalError as err:
		print(err)
		return jsonify(msg = "Failed to connect to DB"), 400

	try:
		cursor = conn.cursor()

		cursor.execute("SELECT id FROM users WHERE username = %s", (user,))
		user_id = cursor.fetchone()

		cursor.callproc('add_post',[user_id, user_data["markdown"]])
		post_id = cursor.fetchone()

		conn.commit()
	except Exception as err:
		print(err)

		conn.rollback()
		return jsonify(msg = "Failed to add posts"), 400
	finally:
		cursor.close()
		conn.close()

	return jsonify(msg = "Added post", post_id = post_id[0]), 200


@app.route("/delete_post", methods = ['DELETE'])
@jwt_required
def delete_posts():
	if not request.is_json:
		return jsonify(msg = "Missing JSON in request"), 400

	user = get_jwt_identity()
	user_data = request.get_json()

	post_id = user_data["post_id"]
	
	try:
		conn = psycopg2.connect(host="db", database=db_name, user=db_user, password=db_pass)
	except OperationalError as err:
		print(err)
		return jsonify(msg = "Failed to connect to DB"), 400

	try:
		cursor = conn.cursor()

		cursor.callproc('delete_post',[post_id,])
		ret_val = cursor.fetchone()

		if not ret_val[0]:
			raise Exception('delete post returned false instead of true')

		conn.commit()
	except Exception as err:
		print(err)

		conn.rollback()
		return jsonify(msg = "Failed to delete posts"), 400
	finally:
		cursor.close()
		conn.close()

	return jsonify(msg = "Deleted post"), 200



@app.route("/update_post", methods = ['PUT'])
@jwt_required
def update_post():
	if not request.is_json:
		return jsonify(msg = "Missing JSON in request"), 400

	user = get_jwt_identity()
	user_data = request.get_json()

	post_id = user_data["post_id"]
	markdown = user_data["markdown"]
	
	try:
		conn = psycopg2.connect(host="db", database=db_name, user=db_user, password=db_pass)
	except OperationalError as err:
		print(err)
		return jsonify(msg = "Failed to connect to DB"), 400

	try:
		cursor = conn.cursor()

		cursor.callproc('update_post',[post_id, markdown])
		ret_val = cursor.fetchone()

		if not ret_val[0]:
			raise Exception('edit post returned false instead of true')

		conn.commit()
	except Exception as err:
		print(err)

		conn.rollback()
		return jsonify(msg = "Failed to delete posts"), 400
	finally:
		cursor.close()
		conn.close()

	return jsonify(msg = "Deleted post"), 200



@app.route("/get_posts/<user>")
def get_posts(user=None):

	post_array = []

	try:
		conn = psycopg2.connect(host="db", database=db_name, user=db_user, password=db_pass)
	except OperationalError as err:
		print(err)
		return jsonify(msg = "Failed to connect to DB"), 400
	
	try:
		cursor = conn.cursor()

		cursor.execute("SELECT id FROM users WHERE username = %s", (user,))
		user_id = cursor.fetchone()

		cursor.callproc('get_posts',[user_id,])
		posts = cursor.fetchall()

		for row in posts:
			post_id = row[0]
			content = row[1]
			post_array.append((post_id, content))

		conn.commit()
	except Exception as err:
		print(err)
		conn.rollback()
		return jsonify(msg = "Failed to get posts"), 400
	finally:
		cursor.close()
		conn.close()

	return jsonify(msg = "Found list of posts", array = post_array), 200



@app.route("/add_user", methods = ['POST'])
def add_user():
	if not request.is_json:
		return jsonify(msg = "Missing JSON in request"), 400

	user_data = request.get_json()
	username = user_data["username"]
	email = user_data["email"]
	password = hashlib.md5((user_data["password"] + secret).encode()).hexdigest()

	try:
		conn = psycopg2.connect(host="db", database=db_name, user=db_user, password=db_pass)
	except OperationalError as err:
		print(err)
		return jsonify(msg = "Failed to connect to DB"), 400

	try:
		cursor = conn.cursor()
		cursor.callproc('add_user',[username, email, password])
		user_id = cursor.fetchone()

		conn.commit()
	except Exception as err:
		print(err)
		conn.rollback()
		return jsonify(msg = "Failed to add user"), 400
	finally:
		cursor.close()
		conn.close()
	
	return jsonify(msg = "Added user"), 200


@app.route("/verify_login", methods = ['GET'])
@jwt_required
def verify_login():
	user = get_jwt_identity()
	return jsonify(logged_in_as = user), 200


if __name__ == "__main__":
	app.run(host='0.0.0.0', port=4000)