from flask import Flask, Blueprint, jsonify, request, json
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_DBNAME"] = "theseek"
app.config["MONGO_URI"] = 'mongodb://localhost:27017/theseek'
app.config["JWT_SECRET_KEY"] = 'secret'

mongo = PyMongo(app)

videoroutes = Blueprint('videoroutes', __name__)
CORS(videoroutes)


@videoroutes.route("/getuservideos", methods=['GET'])
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


# Deleting
@videoroutes.route("/deletevideo", methods=['POST'])
def deletevideo():
    videos = mongo.db.videos
    email = request.get_json()['email']
    vidName = request.get_json()['videoName']
    user_exist = videos.find_one({"email": email, "videoName": vidName})
    result = ""
    if user_exist:
        response = videos.update_one({'email': email, "videoName": vidName}, {"$set":
                                                                              {"deleted": True}
                                                                              }, upsert=False)
        if response:
            result = jsonify({"success": "Video Deleted"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "No Video Found"})
        return result

# Add to Favorite


@videoroutes.route("/addtofavvideo", methods=['POST'])
def addfavvideo():
    favvideos = mongo.db.favvideos
    videos = mongo.db.videos
    email = request.get_json()['email']
    name = request.get_json()['name']
    path = request.get_json()['path']
    suspName = request.get_json()['suspName']
    norName = request.get_json()['norName']
    sttName = request.get_json()['sttName']
    blocked = request.get_json()['blocked']
    deleted = request.get_json()['deleted']
    favvideos_exist = favvideos.find_one({"email": email, "name": name})
    result = ""
    if favvideos_exist:
        result = jsonify({"error": "Video Already Favourited"})
        return result
    else:
        response = videos.update_one({'email': email, "videoName": name}, {"$set":
                                                                           {"fav": True}
                                                                           }, upsert=False)
        favvideoFiles = favvideos.insert_one({
            "email": email,
            "name": name,
            "path": path,
            "suspName": suspName,
            "norName": norName,
            "sttName": sttName,
            "blocked": False,
            "deleted": False
        })
        if response:
            result = jsonify({"success": "Video Favourited"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result

# Remove from Favorite


@videoroutes.route("/remfavvideo", methods=['POST'])
def remfavvideo():
    favvideos = mongo.db.favvideos
    videos = mongo.db.videos
    email = request.get_json()['email']
    name = request.get_json()['name']
    favvideo_exist = favvideos.find_one({"email": email, "name": name})
    result = ""
    if favvideo_exist:
        response = videos.update_one({'email': email, "videoName": name}, {"$set":
                                                                           {"fav": False}
                                                                           }, upsert=False)
        favvideos.delete_one({'email': email, "name": name})
        if response:
            result = jsonify({"success": "Video UnFavourited"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "Video Not Exists"})
        return result


@videoroutes.route("/getuserfavvideos", methods=['GET'])
def getuserfavvideos():
    favvideos = mongo.db.favvideos
    email = request.args['email']
    documents = favvideos.find({"email": email})
    response = []
    files = {}
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    results = json.dumps(response)

    if len(response) == 0:
        result = jsonify({"Error": "No Fav Videos Found", "data": response})
    else:
        result = json.dumps(response)
    return result
