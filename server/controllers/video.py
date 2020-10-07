from flask import Flask,Blueprint, jsonify, request, json
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_DBNAME"] = "theseek"
app.config["MONGO_URI"] = 'mongodb://localhost:27017/theseek'
app.config["JWT_SECRET_KEY"] = 'secret'

mongo = PyMongo(app)
CORS(app)

videoroutes = Blueprint('videoroutes', __name__)

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
        result = jsonify({"Error": "No Videos Found", "data":response})        
    else:
        result = json.dumps(response)
    return result



## Deleting
@app.route("/deletevideo", methods=['POST'])
def deletevideo():
    videos = mongo.db.videos
    email = request.get_json()['email']
    vidName = request.get_json()['videoName']
    user_exist = videos.find_one({"email": email, "videoName":vidName})
    result = ""
    if user_exist:
        response = videos.update_one({'email':email, "videoName":vidName}, {"$set":
            {"deleted":True}
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
                
        
    
        

    