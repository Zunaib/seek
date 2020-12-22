
@activitydetectionroutes.route("/getSuspiciousActivityCCTV", methods=['POST'])
def getSuspiciousActivityCCTV():
    videos = mongo.db.videos
    susp_videos = mongo.db.suspvideos
    nor_videos = mongo.db.norvideos
    stt_videos = mongo.db.sttvideos

    users = mongo.db.users
    foundUsers = users.find({"admin": True}, {"_id": 1, "first_name": 1,
                                              "last_name": 1, "email": 1, "phone_number": 1, })
    admUsers = []
    for fnduser in foundUsers:
        fnduser['_id'] = str(fnduser['_id'])
        admUsers.append(fnduser)

    cctv = mongo.db.cctv
    documents = cctv.find()
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)

    model = keras.models.load_model('susp_act.model')  # to load crime model

    # object detection model
    m, n = 50, 50
    objmodel = keras.models.load_model("models\\model_latest.h5")

    # cats_ contains categories i.e. burglary, firing, fighting
    cats_ = [i for i in os.listdir('Dataset/')]

    susFile = False
    sttFile = False
    norFile = False

    burgcount = 0
    fircount = 0
    figcount = 0
    expcount = 0
    vandcount = 0
    stabcount = 0

    # object count
    kncount = 0
    sgcount = 0
    lgcount = 0

    cap = cv2.VideoCapture(0)  # video
    # cap = cv2.VideoCapture(response[0]["ip_address"])  # video
    # initialize Save Video
    frame_width = int(cap.get(3))
    frame_height = int(cap.get(4))
    fourcc = cv2.VideoWriter_fourcc(*'X264')
    processed_filename = response[0]["name"] + str(datetime.now())
    cctv_out_susp = cv2.VideoWriter('static/Processed/'+processed_filename +
                                    '-cctv_out_susp.mp4', fourcc, 24, (frame_width, frame_height), False)
    cctv_out_normal = cv2.VideoWriter('static/Processed/'+processed_filename +
                                      '-cctv_out_normal.mp4', fourcc, 24, (frame_width, frame_height), False)
    cctv_out_static = cv2.VideoWriter('static/Processed/'+processed_filename +
                                      '-cctv_out_static.mp4', fourcc, 24, (frame_width, frame_height), False)

    result = ""
    object_name = ""

    try:
        while True:  # iterate each frame one by one
            # hide main window
            root = tkinter.Tk()
            root.withdraw()
            x = []
            ret, frame = cap.read()  # extract frame
            img = frame.copy()  # copy frame
            # convert frame from BGR to RGB
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            img = cv2.resize(img, (224, 224))  # resize image by 224x224
            # find the class with highest probability 0 or 1 or 2
            actual = np.argmax(
                list(model.predict([img.reshape(-1, 224, 224, 3)])))

          # Write the frame into the file 'output.mp4'
            if(cats_[actual] == 'Stabbing' or cats_[actual] == "Burglary" or cats_[actual] == "Fighting" or cats_[actual] == "Firing" or cats_[actual] == "Vandalism" or cats_[actual] == "Explosion"):
                # obj
                imrs = cv2.resize(img, (m, n))  # resize image for object
                imrs = img_to_array(imrs)/255
                imrs = imrs.transpose(2, 0, 1)
                imrs = imrs.reshape(3, m, n)
                x.append(imrs)
                x = np.array(x)

                # Detecting Object
                result = objmodel.predict(x)
                if (result[0][0] > result[0][1]) and (result[0][0] > result[0][2]):
                    if(result[0][2] > 0.8):
                        object_name = "Knife"
                    else:
                        object_name = "No Object"
                    if(result[0][0] > 0.6):
                        kncount = kncount+1

                elif (result[0][1] > result[0][0]) and (result[0][1] > result[0][2]):
                    if(result[0][2] > 0.8):
                        object_name = "Long Gun"
                    else:
                        object_name = "No Object"
                    if(result[0][1] > 0.6):
                        lgcount = lgcount+1
                else:
                    if(result[0][2] > 0.8):
                        object_name = "Small Gun"
                    else:
                        object_name = "No Object"
                    if(result[0][2] > 0.6):
                        sgcount = sgcount+1
                susFile = True
                cctv_out_susp.write(frame)
            elif(cats_[actual] == "Normal"):
                norFile = True
                cctv_out_normal.write(frame)
            elif(cats_[actual] == "Static"):
                sttFile = True
                cctv_out_static.write(frame)

                # resize by 600x400 to show on screen
            frame = cv2.resize(frame, (600, 400))

            # put text on video frames
            cv2.putText(frame, str(
                cats_[actual] + " -- " + object_name), (20, 20), cv2.FONT_HERSHEY_DUPLEX, 1, (255, 0, 255))

            if(cats_[actual] == "Firing"):
                fircount += 1
                if(fircount % 100 == 0):
                    for adm in admUsers:
                        msg = Message("Security Alert", sender="theseeknotify@gmail.com",
                                      recipients=[adm["email"]])
                        msg.html = "There is Firing Detected in the Cam." + \
                            "<b> - Sent From The Seek - Suspicious Activity Detector</b>"
                        res = mail.send(msg)
                        # client.messages.create(
                        #     from_='+14139980018',
                        #     body='The Seek - ' + "There is Firing Detected in the Cam.",
                        #     to=adm["phone_number"]
                        # )
                    messagebox.showwarning(
                        "Security Alert", "There is Firing Detected in the Cam.")
            elif(cats_[actual] == "Burglary"):
                burgcount += 1
                if(burgcount % 100 == 0):
                    for adm in admUsers:

                        msg = Message("Security Alert", sender="theseeknotify@gmail.com",
                                      recipients=[adm["email"]])
                        msg.html = "There is Burglary Detected in the Cam." + \
                            "<b> - Sent From The Seek - Suspicious Activity Detector</b>"
                        res = mail.send(msg)
                        # client.messages.create(
                        #     from_='+14139980018',
                        #     body='The Seek - ' + "There is Burglary Detected in the Cam.",
                        #     to=adm["phone_number"]
                        # )
                    messagebox.showwarning(
                        "Security Alert", "There is Burglary Detected in the Cam.")
            elif(cats_[actual] == "Fighting"):
                figcount += 1
                if(figcount % 100 == 0):
                    for adm in admUsers:

                        msg = Message("Security Alert", sender="theseeknotify@gmail.com",
                                      recipients=[adm["email"]])
                        msg.html = "There is Fighting Detected in the Cam." + \
                            "<b> - Sent From The Seek - Suspicious Activity Detector</b>"
                        res = mail.send(msg)
                        # client.messages.create(
                        #     from_='+14139980018',
                        #     body='The Seek - ' + "There is Fighting Detected in the Cam.",
                        #     to=adm["phone_number"]
                        # )
                    messagebox.showwarning(
                        "Security Alert", "There is Fighting Detected in the Cam.")
            elif(cats_[actual] == "Vandalism"):
                vandcount += 1
                if(vandcount % 100 == 0):
                    for adm in admUsers:
                        msg = Message("Security Alert", sender="theseeknotify@gmail.com",
                                      recipients=[adm["email"]])
                        msg.html = "There is Vandalism Detected in the Cam." + \
                            "<b> - Sent From The Seek - Suspicious Activity Detector</b>"
                        res = mail.send(msg)
                        # client.messages.create(
                        #     from_='+14139980018',
                        #     body='The Seek - ' + "There is Vandalism Detected in the Cam.",
                        #     to=adm["phone_number"]
                        # )
                    messagebox.showwarning(
                        "Security Alert", "There is Vandalism Detected in the Cam.")
            elif(cats_[actual] == "Explosion"):
                expcount += 1
                if(expcount % 100 == 0):
                    for adm in admUsers:
                        msg = Message("Security Alert", sender="theseeknotify@gmail.com",
                                      recipients=[adm["email"]])
                        msg.html = "There is Explosion Detected in the Cam." + \
                            "<b> - Sent From The Seek - Suspicious Activity Detector</b>"
                        res = mail.send(msg)
                        # client.messages.create(
                        #     from_='+14139980018',
                        #     body='The Seek - ' + "There is Explosion Detected in the Cam.",
                        #     to=adm["phone_number"]
                        # )
                    messagebox.showwarning(
                        "Security Alert", "There is Explosion Detected in the Cam.")
            elif(cats_[actual] == "Stabbing"):
                stabcount += 1
                if(stabcount % 100 == 0):
                    for adm in admUsers:
                        msg = Message("Security Alert", sender="theseeknotify@gmail.com",
                                      recipients=[adm["email"]])
                        msg.html = "There is Stabbing Detected in the Cam." + \
                            "<b> - Sent From The Seek - Suspicious Activity Detector</b>"
                        res = mail.send(msg)
                        # client.messages.create(
                        #     from_='+14139980018',
                        #     body='The Seek - ' + "There is Stabbing Detected in the Cam.",
                        #     to=adm["phone_number"]
                        # )
                    messagebox.showwarning(
                        "Security Alert", "There is Stabbing Detected in the Cam.")

            key = cv2.waitKey(1)  # show frame for 33 milli seconds
            if key == 27 or key == 127:  # escape
                cv2.destroyAllWindows()  # destroy window if user presses escape
                break
            cv2.imwrite('t.jpg', frame)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + open('t.jpg', 'rb').read() + b'\r\n')
            cap.release()  # release the capture

        videoFiles = videos.insert_one({
            "videoName": processed_filename,
            "suspName": processed_filename+'-cctv_out_susp.mp4',
            "norName": processed_filename+'-cctv_out_normal.mp4',
            "sttName": processed_filename+'-cctv_out_static.mp4',
            "filePath": vidstr,
            "fav": False,
            "blocked": False,
            "deleted": False
        })

        # release saved frames
        if(susFile == True):
            out_susp.release()
            suspvideoFiles = susp_videos.insert_one({
                "videoName": processed_filename,
                "suspName": processed_filename+'-cctv_out_susp.mp4',
                "suspPath": 'static/Processed/'+processed_filename+'-cctv_out_susp.mp4',
                "knife": kncount,
                "smallgun": sgcount,
                "longgun": lgcount,
                "burglary": burgcount,
                "fighting": figcount,
                "firing": fircount,
                "explosion": expcount,
                "stabbing": stabcount,
                "vandalism": vandcount,
                "fav": False,
                "suspblocked": False,
                "suspdeleted": False
            })
        if(norFile == True):
            out_normal.release()
            norvideoFiles = nor_videos.insert_one({
                "videoName": processed_filename,
                "norName": processed_filename+'-cctv_out_normal.mp4',
                "norPath": 'static/Processed/'+processed_filename+'-cctv_out_normal.mp4',
                "fav": False,
                "norblocked": False,
                "nordeleted": False
            })
        if(sttFile == True):
            out_static.release()
            sttvideoFiles = stt_videos.insert_one({
                "videoName": processed_filename,
                "sttName": processed_filename+'-cctv_out_static.mp4',
                "sttPath": 'static/Processed/'+processed_filename+'-cctv_out_static.mp4',
                "fav": False,
                "sttblocked": False,
                "sttdeleted": False
            })

    except:
        pass
    result = jsonify({"ipvideo": "Ip Cam Video has been saved"})
    return result
