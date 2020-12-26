from flask import Flask, jsonify, request, json
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask import send_file
import keras  # keras for deep learning
import numpy as np
import cv2
import os  # to manipulate with paths
from controllers import user
from controllers import contactus
from controllers import video
from controllers import activitydetection
from controllers import admin
from controllers import normalvideo
from controllers import suspiciousvideo
from controllers import staticvideo


app = Flask(__name__)


app.register_blueprint(user.userroutes, url_prefix="/users")
app.register_blueprint(contactus.contactusroutes)
app.register_blueprint(video.videoroutes)
app.register_blueprint(activitydetection.activitydetectionroutes)
app.register_blueprint(admin.adminroutes)
app.register_blueprint(normalvideo.normalvideoroutes)
app.register_blueprint(suspiciousvideo.suspiciousvideoroutes)
app.register_blueprint(staticvideo.staticvideoroutes)

app.config["MONGO_DBNAME"] = "theseek"
app.config["MONGO_URI"] = 'mongodb://localhost:27017/theseek'
app.config["JWT_SECRET_KEY"] = 'secret'


mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)


if __name__ == "__main__":
    app.run(debug=True)
