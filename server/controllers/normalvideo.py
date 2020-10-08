from flask import Flask,Blueprint, jsonify, request, json
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_DBNAME"] = "theseek"
app.config["MONGO_URI"] = 'mongodb://localhost:27017/theseek'
app.config["JWT_SECRET_KEY"] = 'secret'

mongo = PyMongo(app)


normalvideoroutes = Blueprint('normalvideoroutes', __name__)
CORS(staticvideoroutes)

@normalvideoroutes.route("/getusernorvideos", methods=['POST'])
def getusernorvideos():
    nor_videos = mongo.db.norvideos
    email = request.args['email']
    norvideoname = request.get_json()['norvideoname']
    document = nor_videos.find_one({"email": email,"norName":norvideoname})
    
    if document:
        document['_id'] = str(document['_id'])
        result = json.dumps(document)
    else:
        result = jsonify({"Error": "No Normal Video Found", "data":[]})        
    return result


@normalvideoroutes.route("/deletenorvideo", methods=['POST'])
def deletenorvideo():
    nor_videos = mongo.db.norvideos
    email = request.get_json()['email']
    norvideoname = request.get_json()['norvideoname']
    user_exist = nor_videos.find_one({"email": email, "norName":norvideoname})
    result = ""
    if user_exist != None:
        response = nor_videos.update_one({'email':email, "norName":norvideoname}, {"$set":
            {"nordeleted":True}
        }, upsert=False)
        if response:
            result = jsonify({"success": "Video Deleted"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "No Normal Video Found"})
        return result
        
        