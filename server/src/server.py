from flask import Flask, request, jsonify

app = Flask(__name__)
@app.route("/")
def hello():
	return "Server works!"

@app.route("/login")
def login():
	return jsonify(msg = "Login screen"), 200

@app.route("/get_users")
def get_users():
	return jsonify(msg = "Found list of users", array = ["Ana", "Andrei", "Alin"] ), 200

if __name__ == "__main__":
	app.run(host='0.0.0.0', port=7002)