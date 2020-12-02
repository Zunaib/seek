from flask import Flask, jsonify, Blueprint, request, json
from flask_pymongo import PyMongo
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
import requests

app = Flask(__name__)
app.config["MONGO_DBNAME"] = "theseek"
app.config["MONGO_URI"] = 'mongodb://localhost:27017/theseek'
app.config["JWT_SECRET_KEY"] = 'secret'


mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

userroutes = Blueprint('userroutes', __name__)
CORS(userroutes)


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
            "created": created
        })
        new_user = users.find_one({'_id': user_id})
        result = {"email": new_user['email'] + "\registered"}
        return jsonify({"result": result})


@userroutes.route("/login", methods=['POST'])
def login():
    users = mongo.db.users
    email = request.get_json()['email']
    password = request.get_json()["password"]
    result = ""
    response = users.find_one({"email": email})

    admin = False
    blocked = False

    if response:
        for key, val in response.items():
            if 'blocked' in key:
                blocked = val
            if 'admin' in key:
                admin = val
        if bcrypt.check_password_hash(response["password"], password):
            access_token = create_access_token(identity={
                "first_name": response["first_name"],
                "last_name": response["last_name"],
                "email": response["email"]
            })
            result = jsonify(
                {"token": access_token, "email": email, "blocked": blocked, "admin": admin})
        else:
            result = jsonify({"error": "Invalid username and password"})
    else:
        result = jsonify({"error": "No account found"})
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
    picture = request.files['picture']

    user_exists = users.find_one({"email": email})
    if user_exists:
        response = users.update({'email': email}, {"$set":
                                                   {"first_name": first_name, "last_name": last_name,
                                                    "phone_number": phone_number, "address": address, "about": about, "gender": gender}
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
        "created": 1
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
