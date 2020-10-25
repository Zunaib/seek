from flask import Flask, Blueprint, jsonify, request, json
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_DBNAME"] = "theseek"
app.config["MONGO_URI"] = 'mongodb://localhost:27017/theseek'
app.config["JWT_SECRET_KEY"] = 'secret'

mongo = PyMongo(app)
CORS(app)

staticvideoroutes = Blueprint('staticvideoroutes', __name__)
CORS(staticvideoroutes)


@staticvideoroutes.route("/getusersttvideos", methods=['GET'])
def getusersttvideos():
    sttvideos = mongo.db.sttvideos
    email = request.args['email']
    documents = sttvideos.find({"email": email})
    response = []
    files = {}
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    results = json.dumps(response)

    if len(response) == 0:
        result = jsonify(
            {"Error": "No Normal Videos Found", "data": response})
    else:
        result = json.dumps(response)
    return result


@staticvideoroutes.route("/getusersttvideo", methods=['POST'])
def getusersttvideo():
    stt_videos = mongo.db.sttvideos
    email = request.args['email']
    sttvideoname = request.get_json()['sttvideoname']
    document = stt_videos.find_one({"email": email, "sttName": sttvideoname})

    if document:
        document['_id'] = str(document['_id'])
        result = json.dumps(document)
    else:
        result = jsonify({"Error": "No Static Video Found", "data": []})
    return result


@staticvideoroutes.route("/deletesttvideo", methods=['POST'])
def deletesttvideo():
    stt_videos = mongo.db.sttvideos
    email = request.get_json()['email']
    sttvideoname = request.get_json()['sttvideoname']
    user_exist = stt_videos.find_one({"email": email, "sttName": sttvideoname})
    result = ""
    if user_exist != None:
        response = stt_videos.update_one({'email': email, "sttName": sttvideoname}, {"$set":
                                                                                     {"sttdeleted": True}
                                                                                     }, upsert=False)
        if response:
            result = jsonify({"success": "Video Deleted"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "No Static Video Found"})
        return result
