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
        user_id = users.insert_one({
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

    for key, val in response.items():
        if 'blocked' in key:
            blocked = val
        if 'admin' in key:
            admin = val

    if response:
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
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()["email"]
    phone_number = request.get_json()['phone_number']
    address = request.get_json()["address"]
    gender = request.get_json()["gender"]
    password = bcrypt.generate_password_hash(
        request.get_json()["password"].encode().decode('utf-8'))
    created = datetime.utcnow()
    user_exists = users.find_one({"email": email})
    if user_exists:
        response = users.update({'email': email}, {"$set":
                                                   {"first_name": first_name, "last_name": last_name,
                                                    "phone_number": phone_number, "address": address, "gender": gender,
                                                    "password": password}
                                                   })
        if response:
            result = jsonify({"success": "user updated"})
            return result
        else:
            result = jsonify({"error": "Error Occured"})
            return result
    else:
        result = jsonify({"error": "No user Found"})
        return result


@userroutes.route("/fetchusersettngs", methods=['POST'])
def fetchusersettngs():
    users = mongo.db.users
    email = request.get_json()['email']

    documents = users.find({"email": email}, {
        "first_name": 1,
        "last_name": 1,
        "email": 1,
        "blocked": 1,
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
        result = json.dumps(response)
    return result
