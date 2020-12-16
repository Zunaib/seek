from flask import Flask, Blueprint, jsonify, request, json
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_DBNAME"] = "theseek"
app.config["MONGO_URI"] = 'mongodb://localhost:27017/theseek'
app.config["JWT_SECRET_KEY"] = 'secret'

mongo = PyMongo(app)

cctvroutes = Blueprint('cctvroutes', __name__)
CORS(cctvroutes)


@cctvroutes.route("/getuservideos", methods=['GET'])
def getUserVideos():
    videos = mongo.db.videos
    email = request.args['email']
    documents = videos.find({"email": email})
    response = []
    files = {}
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    results = json.dumps(response)

    if len(response) == 0:
        result = jsonify({"Error": "No Videos Found", "data": response})
    else:
        result = json.dumps(response)
    return result
