from flask import Flask, jsonify,Blueprint, request, json
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_DBNAME"] = "theseek"
app.config["MONGO_URI"] = 'mongodb://localhost:27017/theseek'
app.config["JWT_SECRET_KEY"] = 'secret'

mongo = PyMongo(app)

contactusroutes = Blueprint('contactusroutes', __name__)
CORS(contactusroutes)

@contactusroutes.route("/contactus", methods=['POST'])
def contactus():
    contactQueries = mongo.db.contact
    email = request.get_json()['email']
    message = request.get_json()["message"]
    result = ""
    response = contactQueries.find_one({"email": email})

    if response:
        result = jsonify({"error": "Email already used"})
        return result
    else:
        contactForm = contactQueries.insert({
            "email": email,
            "message": message
        })
        result = {"email": "Query Submitted"}
        return jsonify({"email": result})

@contactusroutes.route("/getcontactus", methods=['GET'])
def getcontactus():
    contactQueries = mongo.db.contact
    documents = contactQueries.find({}, {"_id":1,"email":1,"message":1 })
    
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    results = json.dumps(response)

    if len(response) == 0:
        result = jsonify({"Error": "No Contact Queries Found", "data":response})        
    else:
        result = json.dumps(response)
    return result

