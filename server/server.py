import flask
from flask import request
import flask_cors
import pymongo
from bson.objectid import ObjectId
import os
import certifi

# Configuration
PORT, MONGO_URI, MONGO_DB, MONGO_COLLECTION = os.argv[1:]

# Create a mongo client
client = pymongo.MongoClient(MONGO_URI, tlsCAFile=certifi.where())
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
    result = collection.insert_one({"data": data})
    return str(result.inserted_id)


@app.route("/api/get_vis/<uid>", methods=["GET"])
def get_vis(uid):
    data = collection.find_one({"_id": ObjectId(uid)})
    return data["data"]


if __name__ == "__main__":
    app.run(port=PORT)
