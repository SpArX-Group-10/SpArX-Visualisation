import flask
from flask import request, send_from_directory
import flask_cors
import pymongo
from bson.objectid import ObjectId
import sys
import certifi
import os

# Configuration
PORT, MONGO_URI, MONGO_DB, MONGO_COLLECTION = sys.argv[1:]

# Create a mongo client
client = pymongo.MongoClient(MONGO_URI, tlsCAFile=certifi.where())
db = client[MONGO_DB]
collection = db[MONGO_COLLECTION]

BUILD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../build")

app = flask.Flask(__name__, static_folder=BUILD_FOLDER)

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


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(os.path.join(BUILD_FOLDER, path)):
        return send_from_directory(BUILD_FOLDER, path)
    else:
        return send_from_directory(BUILD_FOLDER, "index.html")


if __name__ == "__main__":
    app.run(port=PORT)
