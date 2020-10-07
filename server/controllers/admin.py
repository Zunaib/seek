from flask import Flask,Blueprint, jsonify, request, json
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_DBNAME"] = "theseek"
app.config["MONGO_URI"] = 'mongodb://localhost:27017/theseek'
app.config["JWT_SECRET_KEY"] = 'secret'

mongo = PyMongo(app)
CORS(app)

adminroutes = Blueprint('adminroutes', __name__)

## Admin API's
@adminroutes.route("/getallusers", methods=['GET'])
def getallusers():
    users = mongo.db.users
    documents = users.find({}, {"_id":1, "first_name": 1, "last_name": 1,"email":1,"blocked":1 })
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        print(document)
        response.append(document)
    results = json.dumps(response)

    if len(response) == 0:
        result = jsonify({"Error": "No Users Found", "response":response})        
    else:
        result = json.dumps(response)
    return result


@adminroutes.route("/getallvideos", methods=['GET'])
def getallvideos():
    videos = mongo.db.videos
    documents = videos.find({}, {"_id":1, "email": 1, "videoName": 1, "burglary": 1, "fighting": 1, "firing": 1, "filePath": 1 })
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
        
    if len(response) == 0:
        result = jsonify({"Error": "No Videos Found","response":response})        
    else:
        result = json.dumps(response)
    return result


@adminroutes.route("/getallsuspvideos", methods=['GET'])
def getallsuspvideos():
    susp_videos = mongo.db.suspvideos
    documents = susp_videos.find({},{"_id":1, "email": 1, "videoName": 1, "suspName": 1, "suspPath": 1})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    results = json.dumps(response)
    
    if len(response) == 0:
        result = jsonify({"Error": "No Suspicious Videos Found", "response":response})        
    else:
        result = json.dumps(response)
    return result


@adminroutes.route("/getallnorvideos", methods=['GET'])
def getallnorvideos():
    nor_videos = mongo.db.norvideos
    documents = nor_videos.find({},{"_id":1, "email": 1, "videoName": 1, "norName": 1, "norPath": 1})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    results = json.dumps(response)
    
    if len(response) == 0:
        result = jsonify({"Error": "No Normal Videos Found", "response":response})        
    else:
        result = json.dumps(response)
    return result


@adminroutes.route("/getallsttvideos", methods=['GET'])
def getallsttvideos():
    stt_videos = mongo.db.sttvideos
    documents = stt_videos.find({},{"_id":1, "email": 1, "videoName": 1, "sttName": 1, "sttPath": 1})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    results = json.dumps(response)
    
    if len(response) == 0:
        result = jsonify({"Error": "No Static Videos Found", "response":response})        
    else:
        result = json.dumps(response)
    return result


## Blocking
@adminroutes.route("/blockuser", methods=['POST'])
def blockuser():
    users = mongo.db.users
    email = request.get_json()['email']
    user_exist = users.find_one({"email": email})
    result = ""
    if user_exist:
        response = users.update_one({'email':email}, {"$set":
            {"blocked":True}
        }, upsert=False)
        if response:
            result = jsonify({"success": "User Blocked"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "User Does Not Exist"})
        return result
        
@adminroutes.route("/unblockuser", methods=['POST'])
def unblockuser():
    users = mongo.db.users
    email = request.get_json()['email']
    user_exist = users.find_one({"email": email})
    result = ""
    if user_exist:
        response = users.update_one({'email':email}, {"$set":
            {"blocked":False}
        }, upsert=False)
        if response:
            result = jsonify({"success": "User UnBlocked"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "User Does Not Exist"})
        return result
    
    
@adminroutes.route("/blockvideo", methods=['POST'])
def blockvideo():
    videos = mongo.db.videos
    email = request.get_json()['email']
    vidName = request.get_json()['videoName']
    user_exist = videos.find_one({"email": email, "videoName":vidName})
    result = ""
    if user_exist:
        response = videos.update_one({'email':email, "videoName":vidName}, {"$set":
            {"blocked":True}
        }, upsert=False)
        if response:
            result = jsonify({"success": "Video Blocked"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "No Video Found"})
        return result
        
    
@adminroutes.route("/unblockvideo", methods=['POST'])
def unblockvideo():
    videos = mongo.db.videos
    email = request.get_json()['email']
    vidName = request.get_json()['videoName']
    user_exist = videos.find_one({"email": email, "videoName":vidName})
    result = ""
    
    print(user_exist)
    if user_exist != None:
        response = videos.update_one({'email':email, "videoName":vidName}, {"$set":
            {"blocked":True}
        }, upsert=False)
        if response:
            result = jsonify({"success": "Video UnBlocked"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "No Video Found"})
        return result
        
        
    
@adminroutes.route("/blocksuspvideo", methods=['POST'])
def blocksuspvideo():
    susp_videos = mongo.db.suspvideos
    email = request.get_json()['email']
    suspvideoname = request.get_json()['suspvideoname']
    user_exist = susp_videos.find_one({"email": email, "suspName":suspvideoname})
    result = ""
    
    print(user_exist)
    if user_exist != None:
        response = susp_videos.update_one({'email':email, "suspName":suspvideoname}, {"$set":
            {"suspblocked":True}
        }, upsert=False)
        if response:
            result = jsonify({"success": "Video UnBlocked"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "No Suspicious Video Found"})
        return result
        
        
    
@adminroutes.route("/unblocksuspvideo", methods=['POST'])
def unblocksuspvideo():
    susp_videos = mongo.db.suspvideos
    email = request.get_json()['email']
    suspvideoname = request.get_json()['suspvideoname']
    user_exist = susp_videos.find_one({"email": email, "suspName" :suspvideoname})
    result = ""
    
    print(user_exist)
    if user_exist != None:
        response = susp_videos.update_one({'email':email, "suspName" :suspvideoname}, {"$set":
            {"suspblocked":False}
        }, upsert=False)
        if response:
            result = jsonify({"success": "Video UnBlocked"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "No Suspicious Video Found"})
        return result
    

@adminroutes.route("/blocknorvideo", methods=['POST'])
def blocknorvideo():
    nor_videos = mongo.db.norvideos
    email = request.get_json()['email']
    norvideoname = request.get_json()['norvideoname']
    user_exist = nor_videos.find_one({"email": email, "norName":norvideoname})
    if user_exist != None:
        response = nor_videos.update_one({'email':email, "norName":norvideoname}, {"$set":
            {"norblocked":True}
        }, upsert=False)
        if response:
            result = jsonify({"success": "Video UnBlocked"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "No Normal Video Found"})
        return result
        
        
    
@adminroutes.route("/unblocknorvideo", methods=['POST'])
def unblocknorvideo():
    nor_videos = mongo.db.norvideos
    email = request.get_json()['email']
    norvideoname = request.get_json()['norvideoname']
    user_exist = nor_videos.find_one({"email": email, "norName":norvideoname})
    result = ""
    if user_exist != None:
        response = nor_videos.update_one({'email':email, "norName":norvideoname}, {"$set":
            {"norblocked":False}
        }, upsert=False)
        if response:
            result = jsonify({"success": "Video UnBlocked"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "No Normal Video Found"})
        return result
        

# Static 
@adminroutes.route("/blocksttvideo", methods=['POST'])
def blocksttvideo():
    stt_videos = mongo.db.sttvideos
    email = request.get_json()['email']
    sttvideoname = request.get_json()['sttvideoname']
    user_exist = stt_videos.find_one({"email": email, "suspName":sttvideoname})
    result = ""
    if user_exist != None:
        response = stt_videos.update_one({'email':email, "suspName":sttvideoname}, {"$set":
            {"sttblocked":True}
        }, upsert=False)
        if response:
            result = jsonify({"success": "Video UnBlocked"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "No Static Video Found"})
        return result
        
        
    
@adminroutes.route("/unblocksttvideo", methods=['POST'])
def unblocksttvideo():
    stt_videos = mongo.db.sttvideos
    email = request.get_json()['email']
    sttvideoname = request.get_json()['sttvideoname']
    user_exist = stt_videos.find_one({"email": email, "sttName":sttvideoname})
    result = ""
    if user_exist != None:
        response = stt_videos.update_one({'email':email, "sttName":sttvideoname}, {"$set":
            {"sttblocked":False}
        }, upsert=False)
        if response:
            result = jsonify({"success": "Video UnBlocked"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "No Static Video Found"})
        return result