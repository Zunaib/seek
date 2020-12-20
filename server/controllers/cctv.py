# from flask import Flask, Blueprint, jsonify, request, json, Response
# from flask_pymongo import PyMongo
# from flask_cors import CORS

# app = Flask(__name__)
# app.config["MONGO_DBNAME"] = "theseek"
# app.config["MONGO_URI"] = 'mongodb://localhost:27017/theseek'
# app.config["JWT_SECRET_KEY"] = 'secret'

# mongo = PyMongo(app)

# cctvroutes = Blueprint('cctvroutes', __name__)
# CORS(cctvroutes)


# # @cctvroutes.route("/getusercctvdetection", methods=['GET'])
# # def getusercctvdetection():
# #     cctv = mongo.db.cctv
# #     email = request.args['email']
# #     documents = cctv.find({"email": email})
# #     response = []
# #     for document in documents:
# #         document['_id'] = str(document['_id'])
# #         response.append(document)

# #     model = keras.models.load_model('susp_act.model')  # to load crime model
# #     # cats_ contains categories i.e. burglary, firing, fighting
# #     cats_ = [i for i in os.listdir('Dataset/')]

# #     cap = cv2.VideoCapture(0)  # video
# #     # cap = cv2.VideoCapture(response[0]["ip_address"])  # video
# #     try:
# #         while True:  # iterate each frame one by one
# #             ret, frame = cap.read()  # extract frame
# #             img = frame.copy()  # copy frame
# #             # convert frame from BGR to RGB
# #             img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
# #             img = cv2.resize(img, (224, 224))  # resize image by 224x224
# #             # find the class with highest probability 0 or 1 or 2
# #             actual = np.argmax(
# #                 list(model.predict([img.reshape(-1, 224, 224, 3)])))
# #             # print the probability for each of 3 classes and return the class
# #             # resize by 600x400 to show on screen
# #             frame = cv2.resize(frame, (600, 400))
# #             # put text on video frames
# #             cv2.putText(frame, str(cats_[actual]), (20, 20),
# #                         cv2.FONT_HERSHEY_DUPLEX, 1, (255, 0, 255))
# #             # cv2.imshow('iSecure', frame)  # show frames
# #             key = cv2.waitKey(33)  # show frame for 33 milli seconds
# #             if key == 27:  # escape
# #                 cv2.destroyAllWindows()  # destroy window if user presses escape
# #                 break
# #             cv2.imwrite('t.jpg', frame)
# #             yield (b'--frame\r\n'
# #                    b'Content-Type: image/jpeg\r\n\r\n' + open('t.jpg', 'rb').read() + b'\r\n')
# #         cap.release()  # release the capture
# #     except:
# #         pass
# #     result = jsonify({"webcam": "Webcam Successfull"})
# #     return result


# # @cctvroutes.route('/cctv_feed', methods=['GET'])
# # def video_feed():
# #     return Response(getusercctvdetection(),
# #                     mimetype='multipart/x-mixed-replace; boundary=frame', )

# @cctvroutes.route("/getSuspiciousActivityCCTV", methods=['POST'])
# def getSuspiciousActivityCCTV():
#     model = keras.models.load_model('susp_act.model')  # to load crime model
#     # cats_ contains categories i.e. burglary, firing, fighting
#     cats_ = [i for i in os.listdir('Dataset/')]

#     cap = cv2.VideoCapture(0)  # video
#     try:
#         while True:  # iterate each frame one by one
#             ret, frame = cap.read()  # extract frame
#             img = frame.copy()  # copy frame
#             # convert frame from BGR to RGB
#             img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#             img = cv2.resize(img, (224, 224))  # resize image by 224x224
#             # find the class with highest probability 0 or 1 or 2
#             actual = np.argmax(
#                 list(model.predict([img.reshape(-1, 224, 224, 3)])))
#             # print the probability for each of 3 classes and return the class
#             # resize by 600x400 to show on screen
#             frame = cv2.resize(frame, (600, 400))
#             # put text on video frames
#             cv2.putText(frame, str(cats_[actual]), (20, 20),
#                         cv2.FONT_HERSHEY_DUPLEX, 1, (255, 0, 255))
#             # cv2.imshow('iSecure', frame)  # show frames
#             key = cv2.waitKey(33)  # show frame for 33 milli seconds
#             if key == 27:  # escape
#                 cv2.destroyAllWindows()  # destroy window if user presses escape
#                 break
#             cv2.imwrite('t.jpg', frame)
#             yield (b'--frame\r\n'
#                    b'Content-Type: image/jpeg\r\n\r\n' + open('t.jpg', 'rb').read() + b'\r\n')
#         cap.release()  # release the capture
#     except:
#         pass
#     result = jsonify({"webcam": "Webcam Successfull"})
#     return result


# @cctvroutes.route('/cctv_feed', methods=['GET'])
# def cctv_feed():
#     """Video streaming route. Put this in the src attribute of an img tag."""
#     return Response(getSuspiciousActivityCCTV(),
#                     mimetype='multipart/x-mixed-replace; boundary=frame', )
