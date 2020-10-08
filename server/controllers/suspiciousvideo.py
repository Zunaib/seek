from flask import Flask,Blueprint, jsonify, request, json
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config["MONGO_DBNAME"] = "theseek"
app.config["MONGO_URI"] = 'mongodb://localhost:27017/theseek'
app.config["JWT_SECRET_KEY"] = 'secret'

mongo = PyMongo(app)

suspiciousvideoroutes = Blueprint('suspiciousvideoroutes', __name__)
CORS(suspiciousvideoroutes)



@suspiciousvideoroutes.route("/getusersuspvideos", methods=['POST'])
def getusersuspvideos():
    susp_videos = mongo.db.suspvideos
    email = request.args['email']
    suspvideoname = request.get_json()['suspvideoname']
    document = susp_videos.find_one({"email": email,"suspName":suspvideoname})
    
    if document:
        document['_id'] = str(document['_id'])
        result = json.dumps(document)
    else:
        result = jsonify({"Error": "No Static Video Found", "data":[]})  
    return result



@suspiciousvideoroutes.route("/deletesuspvideo", methods=['POST'])
def deletesuspvideo():
    susp_videos = mongo.db.suspvideos
    email = request.get_json()['email']
    suspvideoname = request.get_json()['suspvideoname']
    user_exist = susp_videos.find_one({"email": email, "suspName":suspvideoname})
    result = ""
    if user_exist != None:
        response = susp_videos.update_one({'email':email, "suspName":suspvideoname}, {"$set":
            {"suspdeleted":True}
        }, upsert=False)
        if response:
            result = jsonify({"success": "Video Deleted"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "No Suspicious Video Found"})
        return result
        