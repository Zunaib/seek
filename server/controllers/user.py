from flask import Flask, jsonify, Blueprint, request, json, redirect, url_for, session
from flask_pymongo import PyMongo
from datetime import datetime
from flask_mail import Mail, Message
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from bson.objectid import ObjectId
from decouple import config
from twilio.rest import Client
import requests
import os


app = Flask(__name__)

app.config['DEBUG'] = False
app.config['TESTING'] = False
app.config['MAIL_SERVER'] = "smtp.gmail.com"
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
# app.config['MAIL_DEBUG'] = True
app.config['MAIL_USERNAME'] = "theseeknotify@gmail.com"
app.config['MAIL_PASSWORD'] = 'Neutron105;'
# app.config['MAIL_DEFAULT_SENDER'] = "theseeknotify@gmail.com"
app.config['MAIL_MAX_EMAILS'] = None
# app.config['MAIL_SUPPRESS_SEND ']
app.config['MAIL_ASCII_ATTACHMENTS'] = False

mail = Mail(app)

API_SID = config('account_sid')
API_TOKEN = config('auth_token')

client = Client(API_SID, API_TOKEN)


app.config["MONGO_DBNAME"] = "theseek"
app.config["MONGO_URI"] = 'mongodb://localhost:27017/theseek'
app.config["JWT_SECRET_KEY"] = 'secret'

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

userroutes = Blueprint('userroutes', __name__)
CORS(userroutes)


uploads_dir = 'static'


@userroutes.route("/login", methods=['POST'])
def login():
    users = mongo.db.users
    email = request.get_json()['email']
    password = request.get_json()["password"]
    response = users.find_one({"email": email})

    admin = False
    blocked = False
    welcomed = False

    if response:
        for key, val in response.items():
            if 'blocked' in key:
                blocked = val
            if 'admin' in key:
                admin = val
            if 'welcomed' in key:
                welcomed = val
        if bcrypt.check_password_hash(response["password"], password):
            access_token = create_access_token(identity={
                "first_name": response["first_name"],
                "last_name": response["last_name"],
                "email": response["email"]
            })
            result = jsonify(
                {"token": access_token, "email": email, "blocked": blocked, "admin": admin, "welcomed": welcomed})
        else:
            result = jsonify({"error": "Invalid username and password"})
    else:
        result = jsonify({"error": "No account found"})
    return result


@userroutes.route("/register", methods=['POST'])
def register():
    users = mongo.db.users
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(
        request.get_json()["password"].encode().decode('utf-8'))
    created = datetime.utcnow()

    response = users.find_one({"email": email})

    if response:
        result = jsonify({"error": "Email already exists"})
        return result
    else:
        user_id = users.insert({
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": password,
            "blocked": False,
            "admin": False,
            "phone_number": "",
            "address": "",
            "gender": "",
            "welcomed": False,
            "created": created
        })
        new_user = users.find_one({'_id': user_id})
        result = {"email": new_user['email'] + "\registered"}
        return jsonify({"result": result})


@userroutes.route("/getusernotifications", methods=['GET'])
def getusernotifications():
    notifications = mongo.db.notifications
    email = request.args['email']
    documents = notifications.find(
        {"email": email}, {"_id": 1, "email": 1, "activity": 1, "notification": 1, "sentAt": 1})
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


@userroutes.route("/remmsg", methods=['POST'])
def remmsg():
    message = mongo.db.message
    messageid = request.get_json()['messageid']
    msg_exist = message.find_one({"_id": ObjectId(messageid)})
    result = ""
    if msg_exist:
        response = message.delete_one({"_id": ObjectId(messageid)})
        if response:
            result = jsonify({"success": "Message Deleted"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "Message Not Found"})
        return result


@userroutes.route("/message", methods=["POST"])
def message():
    message = mongo.db.message
    number = request.get_json()["number"]
    email = request.get_json()["email"]
    recieveremail = request.get_json()["recieveremail"]
    message1 = request.get_json()["message1"]

    msg = Message("User Message", sender="theseeknotify@gmail.com",
                  recipients=recieveremail)
    msg.html = message1 + "<b> - Sent From The Seek - Suspicious Activity Detector</b>"
    res = mail.send(msg)
    for num in number:
        client.messages.create(
            from_='+14139980018',
            body='The Seek - ' + message1,
            to=num
        )
    user_id = message.insert({
        "number": number,
        "email": email,
        "message1": message1,
        "recieveremail": recieveremail,
        "createdat": datetime.now()})

    return jsonify({"success": "Message Sent To Emails and Numbers"})


@userroutes.route("/remcctv", methods=['POST'])
def remcctv():
    cctv = mongo.db.cctv
    camid = request.get_json()['camid']
    cam_exist = cctv.find_one({"_id": ObjectId(camid)})
    result = ""
    if cam_exist:
        response = cctv.delete_one({"_id": ObjectId(camid)})
        if response:
            result = jsonify({"success": "Cam Deleted"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "Cam Not Found"})
        return result


@userroutes.route("/addcctv", methods=["POST"])
def addcctv():
    cctv = mongo.db.cctv
    name = request.get_json()["name"]
    email = request.get_json()["email"]
    ip_address = request.get_json()["ip_address"]
    cam_type = request.get_json()["cam_type"]
    response = cctv.find_one({"email": email, "ip_address": ip_address})
    if response:
        result = jsonify({"error": "Ip Against User already exists"})
        return result
    else:
        ccctv_id = cctv.insert({
            "name": name,
            "email": email,
            "ip_address": ip_address,
            "cam_type": cam_type
        })
        return jsonify({"success": "CCTV Cam Added"})


@userroutes.route("/getusercctv", methods=["GET"])
def getusercctv():
    cctv = mongo.db.cctv
    email = request.args['email']
    documents = cctv.find({"email": email})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)

    results = json.dumps(response)
    if len(response) == 0:
        result = jsonify({"Error": "No cameras Found", "response": response})
    else:
        result = json.dumps(response)
    return result


@userroutes.route("/editcctv", methods=['POST'])
def editcctv():
    cctv = mongo.db.cctv
    camid = request.get_json()["camid"]
    name = request.get_json()["name"]
    email = request.get_json()["email"]
    old_ip_address = request.get_json()["old_ip_address"]
    ip_address = request.get_json()["ip_address"]
    cam_type = request.get_json()["cam_type"]
    if(old_ip_address == ip_address):
        response = cctv.update_one({"_id": ObjectId(camid)}, {"$set":
                                                              {"name": name,
                                                               "cam_type": cam_type
                                                               }
                                                              }, upsert=False)
        if response:
            result = jsonify({"success": "CCTV Cam Updated"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        ip_used = cctv.find_one({"email": email, "ip_address": ip_address})
        if ip_used:
            result = jsonify({"error": "This IP is Already Used By You"})
            return result
        else:
            response = cctv.update_one({"_id": ObjectId(camid)}, {"$set":
                                                                  {"name": name,
                                                                   "ip_address": ip_address,
                                                                   "cam_type": cam_type
                                                                   }
                                                                  }, upsert=False)
            if response:
                result = jsonify({"success": "CCTV Cam Updated"})
                return result
            else:
                result = jsonify({"error": "Error Occured"})
                return result


@userroutes.route("/allcctvs", methods=["GET"])
def getallcctvs():

    cctv = mongo.db.cctv
    documents = cctv.find({}, {"_id": 1, "name": 1,
                               "email": 1, "ip_address": 1, "cam_type": 1})
    response = []

    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
        results = json.dumps(response)

    if len(response) == 0:

        result = jsonify({"Error": "No cctvs Found", "response": response})
    else:

        result = json.dumps(response)
    return result


@userroutes.route("/getusermessages", methods=["GET"])
def getusermessages():
    message = mongo.db.message
    email = request.args['email']
    documents = message.find({"email": email})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    results = json.dumps(response)
    if len(response) == 0:
        result = jsonify({"Error": "No Messages Found", "response": response})
    else:
        result = json.dumps(response)
    return result


@userroutes.route("/allmessages", methods=["GET"])
def getallmessages():

    message = mongo.db.message
    documents = message.find({}, {"_id": 1, "number": 1,
                                  "email": 1, "message1": 1, "recieveremail": 1, "createdat": 1})
    response = []

    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
        results = json.dumps(response)

    if len(response) == 0:

        result = jsonify({"Error": "No messages Found", "response": response})
    else:

        result = json.dumps(response)
    return result


@userroutes.route("/welcomesettings", methods=['POST'])
def welcomesettings():
    users = mongo.db.users
    email = request.args['email']
    first_name = request.args['first_name']
    last_name = request.args['last_name']
    phone_number = request.args['phone_number']
    about = request.args["about"]
    address = request.args["address"]
    gender = request.args["gender"]
    welcomed = request.args["welcomed"]
    extPicture = request.args["extPicture"]

    user_exists = users.find_one({"email": email})
    if user_exists:
        if(extPicture == ""):
            if(request.files['picture'] != None):
                picture = request.files['picture']
                target = os.path.join(uploads_dir, "pictures")
                if not os.path.isdir(target):
                    os.mkdir(target)

                destination = "/".join([target, email+picture.filename])
                picture.save(destination)
                response = users.update({'email': email}, {"$set":
                                                           {"first_name": first_name, "last_name": last_name,
                                                            "phone_number": phone_number, "address": address, "about": about, "gender": gender, "picture": "static/pictures/"+email+picture.filename, "welcomed": welcomed}
                                                           })
        else:
            response = users.update({'email': email}, {"$set":
                                                       {"first_name": first_name, "last_name": last_name,
                                                        "phone_number": phone_number, "address": address, "about": about, "gender": gender, "picture": extPicture, "welcomed": welcomed}
                                                       })
        if response:
            result = jsonify({"success": "User Updated"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "No User Found"})
        return result


@userroutes.route("/updateusersettings", methods=['POST'])
def updateusersettings():
    users = mongo.db.users
    email = request.args['email']
    first_name = request.args['first_name']
    last_name = request.args['last_name']
    phone_number = request.args['phone_number']
    about = request.args["about"]
    address = request.args["address"]
    gender = request.args["gender"]
    extPicture = request.args["extPicture"]

    user_exists = users.find_one({"email": email})
    if user_exists:
        if(extPicture == ""):
            if(request.files['picture'] != None):
                picture = request.files['picture']
                target = os.path.join(uploads_dir, "pictures")
                if not os.path.isdir(target):
                    os.mkdir(target)

                destination = "/".join([target, email+picture.filename])
                picture.save(destination)
                response = users.update({'email': email}, {"$set":
                                                           {"first_name": first_name, "last_name": last_name,
                                                            "phone_number": phone_number, "address": address, "about": about, "gender": gender, "picture": "static/pictures/"+email+picture.filename}
                                                           })
        else:
            response = users.update({'email': email}, {"$set":
                                                       {"first_name": first_name, "last_name": last_name,
                                                        "phone_number": phone_number, "address": address, "about": about, "gender": gender, "picture": extPicture}
                                                       })
        if response:
            result = jsonify({"success": "User Updated"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "No User Found"})
        return result


@userroutes.route("/fetchusersettngs", methods=['POST'])
def fetchusersettngs():
    users = mongo.db.users
    videos = mongo.db.videos
    susp_videos = mongo.db.suspvideos
    nor_videos = mongo.db.norvideos
    stt_videos = mongo.db.sttvideos
    email = request.get_json()['email']
    simplevideos = videos.count_documents({"email": email})
    suspsimplevideos = susp_videos.count_documents({"email": email})
    norsimplevideos = nor_videos.count_documents({"email": email})
    sttsimplevideos = stt_videos.count_documents({"email": email})
    counts = {
        "simplevideos": simplevideos,
        "suspvideos": suspsimplevideos,
        "norvideos": norsimplevideos,
        "sttvideos": sttsimplevideos
    }

    documents = users.find({"email": email}, {
        "first_name": 1,
        "last_name": 1,
        "email": 1,
        "blocked": 1,
        "about": 1,
        "admin": 1,
        "phone_number": 1,
        "address": 1,
        "gender": 1,
        "picture": 1,
        "created": 1,
        "welcomed": 1
    })
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)

    if len(response) == 0:
        result = jsonify({"Error": "No User Found", "response": []})
    else:
        response.append(counts)
        result = json.dumps(response)
    return result
