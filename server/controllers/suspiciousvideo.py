from flask import Flask,Blueprint, jsonify, request, json
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_DBNAME"] = "theseek"
app.config["MONGO_URI"] = 'mongodb://localhost:27017/theseek'
app.config["JWT_SECRET_KEY"] = 'secret'

mongo = PyMongo(app)
CORS(app)

suspiciousvideoroutes = Blueprint('suspiciousvideoroutes', __name__)

@suspiciousvideoroutes.route("/getusersuspvideos", methods=['GET'])
def getusersuspvideos():
    susp_videos = mongo.db.suspvideos
    email = request.args['email']
    documents = susp_videos.find({"email": email})
    response = []
    files = {}
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    results = json.dumps(response)
    
    if len(response) == 0:
        result = jsonify({"Error": "No Suspicious Videos Found", "response":response})        
    else:
        result = json.dumps(response)
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
        