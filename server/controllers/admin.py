from flask import Flask, Blueprint, jsonify, request, json
from flask_pymongo import PyMongo, pymongo
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_DBNAME"] = "theseek"
app.config["MONGO_URI"] = 'mongodb://localhost:27017/theseek'
app.config["JWT_SECRET_KEY"] = 'secret'

mongo = PyMongo(app)


adminroutes = Blueprint('adminroutes', __name__)
CORS(adminroutes)


# Admin API's
@adminroutes.route("/deleterequest", methods=['POST'])
def deleterequest():
    admrequest = mongo.db.adminrequest
    requestid = request.get_json()['requestid']
    admrequest_exist = admrequest.find_one({"_id": ObjectId(requestid)})
    result = ""
    if admrequest_exist:
        response = admrequest.delete_one({"_id": ObjectId(requestid)})
        if response:
            result = jsonify({"success": "Admin Request Deleted"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "Admin Request Not Found"})
        return result


@adminroutes.route("/fetchrequests", methods=['GET'])
def fetchrequests():
    admrequest = mongo.db.adminrequest
    documents = admrequest.find(
        {}, {"_id": 1, "email": 1, "reason": 1, "message": 1})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    results = json.dumps(response)

    if len(response) == 0:
        result = jsonify({"Error": "No Requests Found", "response": response})
    else:
        result = json.dumps(response)
    return result


@adminroutes.route("/requestadmin", methods=['POST'])
def requestadmin():
    admrequest = mongo.db.adminrequest
    email = request.get_json()['email']
    reason = request.get_json()['reason']
    message = request.get_json()['message']

    response = admrequest.find_one({"email": email})

    if response:
        result = jsonify({"error": "Request against you already exists"})
        return result
    else:
        req_id = admrequest.insert_one({
            "email": email,
            "reason": reason,
            "message": message
        })
        return jsonify({"success": "Request Sent"})


@adminroutes.route("/grantadminaccess", methods=['POST'])
def grantadminaccess():
    users = mongo.db.users
    admrequest = mongo.db.adminrequest
    email = request.get_json()['email']
    user_exist = users.find_one({"email": email})
    result = ""
    if user_exist:
        response = users.update_one({'email': email}, {"$set":
                                                       {"admin": True}
                                                       }, upsert=False)
        admrequest.delete_one({'email': email})
        if response:
            result = jsonify({"success": "Access Granted"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"data": "User Does Not Exist"})
        return result


@adminroutes.route("/deletenotification", methods=['POST'])
def deletenotification():
    notifications = mongo.db.notifications
    notificationid = request.get_json()['notificationid']
    notf_exist = notifications.find_one({"_id": ObjectId(notificationid)})
    result = ""
    if notf_exist:
        response = notifications.delete_one({"_id": ObjectId(notificationid)})
        if response:
            result = jsonify({"success": "Notification Deleted"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "Notification Not Found"})
        return result


@adminroutes.route("/getnotifications", methods=['GET'])
def getnotifications():
    notifications = mongo.db.notifications
    documents = notifications.find(
        {}, {"_id": 1, "email": 1, "activity": 1, "notification": 1, "sentAt": 1})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    results = json.dumps(response)

    if len(response) == 0:
        result = jsonify(
            {"Error": "No Notifications Found", "response": response})
    else:
        result = json.dumps(response)
    return result


@adminroutes.route("/dashboardstats", methods=['GET'])
def dashboardstats():
    users = mongo.db.users
    videos = mongo.db.videos
    susp_videos = mongo.db.suspvideos
    nor_videos = mongo.db.norvideos
    stt_videos = mongo.db.sttvideos
    contacts = mongo.db.contact
    dashcounts = []

    # users
    simpleusers = users.count_documents({"blocked": False})
    blockedUsers = users.count_documents({"blocked": True})
    adminUsers = users.count_documents({"admin": True})

    # videos
    simplevideos = videos.count_documents({"blocked": False})
    blockedvideos = videos.count_documents({"blocked": True})
    deletedvideos = videos.count_documents({"deleted": True})

    # susp videos
    suspsimplevideos = susp_videos.count_documents({"blocked": False})
    suspblockedvideos = susp_videos.count_documents({"blocked": True})
    suspdeletedvideos = susp_videos.count_documents({"deleted": True})

    # nor videos
    norsimplevideos = nor_videos.count_documents({"blocked": False})
    norblockedvideos = nor_videos.count_documents({"blocked": True})
    nordeletedvideos = nor_videos.count_documents({"deleted": True})

    # stt videos
    sttsimplevideos = stt_videos.count_documents({"blocked": False})
    sttblockedvideos = stt_videos.count_documents({"blocked": True})
    sttdeletedvideos = stt_videos.count_documents({"deleted": True})

    # conatact
    allcontacts = contacts.count_documents({})

    dashcounts = [
        {"name": "Simple Users", "count": simpleusers},
        {"name": "Blocked Users", "count": blockedUsers},
        {"name": "Admin Users", "count": adminUsers},
        {"name": "Simple Videos", "count": simplevideos},
        {"name": "Blocked Videos", "count": blockedvideos},
        {"name": "Deleted Videos", "count": deletedvideos},
        {"name": "Suspicious Simple Videos", "count": suspsimplevideos},
        {"name": "Suspicious Blocked Videos", "count": suspblockedvideos},
        {"name": "Suspicious Deleted Videos", "count": suspdeletedvideos},
        {"name": "Normal Simple Videos", "count": norsimplevideos},
        {"name": "Normal Blocked Videos", "count": norblockedvideos},
        {"name": "Normal Deleted Videos", "count": nordeletedvideos},
        {"name": "Static Simple Videos", "count": sttsimplevideos},
        {"name": "Static Blocked Videos", "count": sttblockedvideos},
        {"name": "Static Deleted Videos", "count": sttdeletedvideos},
        {"name": "Contact Queries", "count": allcontacts},
    ]

    return jsonify({"Stats": "Stats Fetched Successfully", "stats": dashcounts})


@adminroutes.route("/getallusers", methods=['GET'])
def getallusers():
    users = mongo.db.users
    documents = users.find({}, {"_id": 1, "first_name": 1,
                                "last_name": 1, "email": 1, "blocked": 1, "admin": 1})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    results = json.dumps(response)

    if len(response) == 0:
        result = jsonify({"Error": "No Users Found", "response": response})
    else:
        result = json.dumps(response)
    return result


@adminroutes.route("/getallvideos", methods=['GET'])
def getallvideos():
    videos = mongo.db.videos
    documents = videos.find({}, {"_id": 1, "email": 1, "videoName": 1, "filePath": 1,
                                 "blocked": 1, "deleted": 1, "suspName": 1, "norName": 1, "sttName": 1, })
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)

    if len(response) == 0:
        result = jsonify({"Error": "No Videos Found", "response": []})
    else:
        result = json.dumps(response)
    return result


@adminroutes.route("/getallsuspvideos", methods=['GET'])
def getallsuspvideos():
    susp_videos = mongo.db.suspvideos
    documents = susp_videos.find({}, {"_id": 1, "email": 1, "videoName": 1,
                                      "suspName": 1, "suspPath": 1, "suspblocked": 1, "suspdeleted": 1})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    results = json.dumps(response)

    if len(response) == 0:
        result = jsonify(
            {"Error": "No Suspicious Videos Found", "response": []})
    else:
        result = json.dumps(response)
    return result


@adminroutes.route("/getallnorvideos", methods=['GET'])
def getallnorvideos():
    nor_videos = mongo.db.norvideos
    documents = nor_videos.find({}, {"_id": 1, "email": 1, "videoName": 1,
                                     "norName": 1, "norPath": 1, "norblocked": 1, "nordeleted": 1})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    results = json.dumps(response)

    if len(response) == 0:
        result = jsonify({"Error": "No Normal Videos Found", "response": []})
    else:
        result = json.dumps(response)
    return result


@adminroutes.route("/getallsttvideos", methods=['GET'])
def getallsttvideos():
    stt_videos = mongo.db.sttvideos
    documents = stt_videos.find({}, {"_id": 1, "email": 1, "videoName": 1,
                                     "sttName": 1, "sttPath": 1, "sttblocked": 1, "sttdeleted": 1})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    results = json.dumps(response)

    if len(response) == 0:
        result = jsonify({"Error": "No Static Videos Found", "response": []})
    else:
        result = json.dumps(response)
    return result


# Blocking
@adminroutes.route("/blockuser", methods=['POST'])
def blockuser():
    users = mongo.db.users
    email = request.get_json()['email']
    user_exist = users.find_one({"email": email})
    result = ""
    if user_exist:
        response = users.update_one({'email': email}, {"$set":
                                                       {"blocked": True}
                                                       }, upsert=False)
        if response:
            result = jsonify({"success": "User Blocked"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"data": "User Does Not Exist"})
        return result


@adminroutes.route("/unblockuser", methods=['POST'])
def unblockuser():
    users = mongo.db.users
    email = request.get_json()['email']
    user_exist = users.find_one({"email": email})
    result = ""
    if user_exist:
        response = users.update_one({'email': email}, {"$set":
                                                       {"blocked": False}
                                                       }, upsert=False)
        if response:
            result = jsonify({"success": "User UnBlocked"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"data": "User Does Not Exist"})
        return result


@adminroutes.route("/blockvideo", methods=['POST'])
def blockvideo():
    videos = mongo.db.videos
    email = request.get_json()['email']
    vidName = request.get_json()['videoName']
    user_exist = videos.find_one({"email": email, "videoName": vidName})
    result = ""
    if user_exist:
        response = videos.update_one({'email': email, "videoName": vidName}, {"$set":
                                                                              {"blocked": True}
                                                                              }, upsert=False)
        if response:
            result = jsonify({"success": "Video Blocked"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"data": "No Video Found"})
        return result


@adminroutes.route("/unblockvideo", methods=['POST'])
def unblockvideo():
    videos = mongo.db.videos
    email = request.get_json()['email']
    vidName = request.get_json()['videoName']
    user_exist = videos.find_one({"email": email, "videoName": vidName})
    result = ""

    if user_exist != None:
        response = videos.update_one({'email': email, "videoName": vidName}, {"$set":
                                                                              {"blocked": False}
                                                                              }, upsert=False)
        if response:
            result = jsonify({"success": "Video UnBlocked"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"data": "No Video Found"})
        return result


@adminroutes.route("/blocksuspvideo", methods=['POST'])
def blocksuspvideo():
    susp_videos = mongo.db.suspvideos
    email = request.get_json()['email']
    suspvideoname = request.get_json()['suspvideoname']
    user_exist = susp_videos.find_one(
        {"email": email, "suspName": suspvideoname})
    result = ""

    if user_exist != None:
        response = susp_videos.update_one({'email': email, "suspName": suspvideoname}, {"$set":
                                                                                        {"suspblocked": True}
                                                                                        }, upsert=False)
        if response:
            result = jsonify({"success": "Video Blocked"})
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
    user_exist = susp_videos.find_one(
        {"email": email, "suspName": suspvideoname})
    result = ""

    if user_exist != None:
        response = susp_videos.update_one({'email': email, "suspName": suspvideoname}, {"$set":
                                                                                        {"suspblocked": False}
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
    user_exist = nor_videos.find_one({"email": email, "norName": norvideoname})
    if user_exist != None:
        response = nor_videos.update_one({'email': email, "norName": norvideoname}, {"$set":
                                                                                     {"norblocked": True}
                                                                                     }, upsert=False)
        if response:
            result = jsonify({"success": "Video Blocked"})
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
    user_exist = nor_videos.find_one({"email": email, "norName": norvideoname})
    result = ""
    if user_exist != None:
        response = nor_videos.update_one({'email': email, "norName": norvideoname}, {"$set":
                                                                                     {"norblocked": False}
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
    user_exist = stt_videos.find_one(
        {"email": email, "suspName": sttvideoname})
    result = ""
    if user_exist != None:
        response = stt_videos.update_one({'email': email, "suspName": sttvideoname}, {"$set":
                                                                                      {"sttblocked": True}
                                                                                      }, upsert=False)
        if response:
            result = jsonify({"success": "Video Blocked"})
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
    user_exist = stt_videos.find_one({"email": email, "sttName": sttvideoname})
    result = ""
    if user_exist != None:
        response = stt_videos.update_one({'email': email, "sttName": sttvideoname}, {"$set":
                                                                                     {"sttblocked": False}
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
