from flask import Flask, Blueprint, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
import keras
import numpy as np
import cv2
import os

app = Flask(__name__)
app.config["MONGO_DBNAME"] = "theseek"
app.config["MONGO_URI"] = 'mongodb://localhost:27017/theseek'
app.config["JWT_SECRET_KEY"] = 'secret'

mongo = PyMongo(app)
CORS(app)


# Create a directory in a known location to save files to.
uploads_dir = 'static'
# os.makedirs(uploads_dir)

activitydetectionroutes = Blueprint('activitydetectionroutes', __name__)


@activitydetectionroutes.route("/getSuspiciousActivity", methods=['POST'])
def getSuspiciousActivity():
    videos = mongo.db.videos
    susp_videos = mongo.db.suspvideos
    nor_videos = mongo.db.norvideos
    stt_videos = mongo.db.sttvideos
    model = keras.models.load_model('susp_act.model')  # to load crime model
    # cats_ contains categories i.e. burglary, firing, fighting
    cats_ = [i for i in os.listdir('Dataset/')]
    email = request.args['email']

    susFile = False
    sttFile = False
    norFile = False

    burgcount = 0
    fircount = 0
    figcount = 0
    expcount = 0
    vandcount = 0
    stabcount = 0

    video = request.files['video']
    filename = video.filename.replace(" ", "")
    processed_filename = filename.rsplit('.', 1)[0]
    video.save(os.path.join(uploads_dir, filename))
    vidstr = 'static/'+filename
    print(vidstr)
    cap = cv2.VideoCapture(vidstr)  # video

    # initialize Save Video
    frame_width = int(cap.get(3))
    frame_height = int(cap.get(4))
    fourcc = cv2.VideoWriter_fourcc(*'X264')
    out_susp = cv2.VideoWriter('static/Processed/'+processed_filename +
                               '-out_susp.mp4', fourcc, 24, (frame_width, frame_height))
    out_normal = cv2.VideoWriter('static/Processed/'+processed_filename +
                                 '-out_normal.mp4', fourcc, 24, (frame_width, frame_height))
    out_static = cv2.VideoWriter('static/Processed/'+processed_filename +
                                 '-out_static.mp4', fourcc, 24, (frame_width, frame_height))

    result = ""

    if videos.find_one({"email": email, "videoName": filename}):
        result = jsonify({"error": "Video Name Against Account Exists"})
    else:
        try:
            while True:  # iterate each frame one by one
                ret, frame = cap.read()  # extract frame
                img = frame.copy()  # copy frame
                # convert frame from BGR to RGB
                img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                img = cv2.resize(img, (224, 224))  # resize image by 224x224
                # find the class with highest probability 0 or 1 or 2
                actual = np.argmax(
                    list(model.predict([img.reshape(-1, 224, 224, 3)])))
                # print the probability for each of 3 classes and return the class
                print(list(model.predict(
                    [img.reshape(-1, 224, 224, 3)])), 'corresponding action : ', cats_[actual])

                # Write the frame into the file 'output.mp4'
                if(cats_[actual] == 'Stabbing' or cats_[actual] == "Burglary" or cats_[actual] == "Fighting" or cats_[actual] == "Firing" or cats_[actual] == "Vandalism" or cats_[actual] == "Explosion"):
                    susFile = True
                    out_susp.write(frame)
                elif(cats_[actual] == "Normal"):
                    norFile = True
                    out_normal.write(frame)
                elif(cats_[actual] == "Static"):
                    sttFile = True
                    out_static.write(frame)

                # resize by 600x400 to show on screen
                frame = cv2.resize(frame, (600, 400))

                # put text on video frames
                cv2.putText(frame, str(
                    cats_[actual]), (20, 20), cv2.FONT_HERSHEY_DUPLEX, 1, (255, 0, 255))

                if(cats_[actual] == "Firing"):
                    fircount += 1
                elif(cats_[actual] == "Burglary"):
                    burgcount += 1
                elif(cats_[actual] == "Fighting"):
                    figcount += 1
                elif(cats_[actual] == "Vandalism"):
                    vandcount += 1
                elif(cats_[actual] == "Explosion"):
                    expcount += 1
                elif(cats_[actual] == "Stabbing"):
                    stabcount += 1

                cv2.imshow('iSecure', frame)  # show frames
                key = cv2.waitKey(33)  # show frame for 33 milli seconds
                if key == 27:  # escape
                    cv2.destroyAllWindows()  # destroy window if user presses escape
                    break
            cap.release()  # release the capture

            # release saved frames
            if(susFile == True):
                out_susp.release()
                suspvideoFiles = susp_videos.insert_one({
                    "email": email,
                    "videoName": filename,
                    "suspName": processed_filename+'-out_susp.mp4',
                    "suspPath": 'static/Processed/'+processed_filename+'-out_susp.mp4',
                    "burglary": burgcount,
                    "fighting": figcount,
                    "firing": fircount,
                    "explosion": expcount,
                    "stabbing": stabcount,
                    "vandalism": vandcount,
                    "suspblocked": False,
                    "suspdeleted": False
                })
            elif(norFile == True):
                out_normal.release()
                norvideoFiles = nor_videos.insert_one({
                    "email": email,
                    "videoName": filename,
                    "norName": processed_filename+'-out_normal.mp4',
                    "norPath": 'static/Processed/'+processed_filename+'-out_normal.mp4',
                    "norblocked": False,
                    "nordeleted": False
                })
            elif(sttFile == True):
                out_static.release()
                sttvideoFiles = stt_videos.insert_one({
                    "email": email,
                    "videoName": filename,
                    "sttName": processed_filename+'-out_static.mp4',
                    "sttPath": 'static/Processed/'+processed_filename+'-out_static.mp4',
                    "sttblocked": False,
                    "sttdeleted": False
                })

            videoFiles = videos.insert_one({
                "email": email,
                "videoName": filename,
                "suspName": processed_filename+'-out_susp.mp4',
                "norName": processed_filename+'-out_normal.mp4',
                "sttName": processed_filename+'-out_static.mp4',
                "filePath": vidstr,
                "blocked": False,
                "deleted": False
            })

        except:
            pass
        result = jsonify({"video": "Video has been saved"})
    return result


@activitydetectionroutes.route("/getSuspiciousActivityWebcam", methods=['POST'])
def getSuspiciousActivityWebcam():
    model = keras.models.load_model('susp_act.model')  # to load crime model
    # cats_ contains categories i.e. burglary, firing, fighting
    cats_ = [i for i in os.listdir('Dataset/')]

    cap = cv2.VideoCapture(0)  # video
    try:
        while True:  # iterate each frame one by one
            ret, frame = cap.read()  # extract frame
            img = frame.copy()  # copy frame
            # convert frame from BGR to RGB
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            img = cv2.resize(img, (224, 224))  # resize image by 224x224
            # find the class with highest probability 0 or 1 or 2
            actual = np.argmax(
                list(model.predict([img.reshape(-1, 224, 224, 3)])))
            # print the probability for each of 3 classes and return the class
            print(list(model.predict(
                [img.reshape(-1, 224, 224, 3)])), 'corresponding action : ', cats_[actual])

            # resize by 600x400 to show on screen
            frame = cv2.resize(frame, (600, 400))
            # put text on video frames
            cv2.putText(frame, str(cats_[actual]), (20, 20),
                        cv2.FONT_HERSHEY_DUPLEX, 1, (255, 0, 255))
            cv2.imshow('iSecure', frame)  # show frames
            key = cv2.waitKey(33)  # show frame for 33 milli seconds
            if key == 27:  # escape
                cv2.destroyAllWindows()  # destroy window if user presses escape
                break
        cap.release()  # release the capture
    except:
        pass
    result = jsonify({"webcam": "Webcam Successfull"})
    return result
