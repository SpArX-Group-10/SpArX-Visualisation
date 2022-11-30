import flask
from flask import request
import flask_cors
import pymongo

# Configuration
PORT = 5001
MONGO_URL = "mongodb://localhost:27017/"
MONGO_DB = "test"
MONGO_COLLECTION = "test"

# Create a mongo client
client = pymongo.MongoClient(MONGO_URL)
db = client[MONGO_DB]
collection = db[MONGO_COLLECTION]

app = flask.Flask(__name__)

# Enable CORS
flask_cors.CORS(app)


@app.route("/api/save_vis", methods=["POST"])
def save_vis():
    """Sparx Visualisation API."""
    # Get the data from the request

    data = request.get_json()
    result = collection.insert_one(data)

    return result.inserted_id


@app.route("/api/get_vis", methods=["GET"])
def get_vis():
    return "hello world"


if __name__ == "__main__":
    app.run(port=PORT)
