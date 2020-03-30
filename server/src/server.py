from flask import Flask, request, jsonify

app = Flask(__name__)
@app.route("/")
def hello():
	return "Server works!"

@app.route("/get_users")
def get_users():
	return jsonify(msg = "Found list of users", array = ["Ana", "Andrei", "Alin"] ), 200

@app.route("/get_posts")
def get_posts():
	return jsonify(msg = "Found list of posts", array = ["Post1", "Post2", "Post3"] ), 200








@app.route("/login")
def login():
	return "Login approved"






if __name__ == "__main__":
	app.run(host='0.0.0.0', port=4000)