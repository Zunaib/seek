# camera.py
# import the necessary packages
import cv2
# defining face detector
face_cascade = cv2.CascadeClassifier("haarcascade_frontalface_alt2.xml")
ds_factor = 0.6


class VideoCamera(object):
    #     def __init__(self):
    #         # capturing video
    #         self.video = cv2.VideoCapture(0)

    #     def __del__(self):
    #         # releasing camera
    #         self.video.release()

    # def get_frame(self):
    #     # extracting frames
    #     ret, frame = self.video.read()
    #     frame = cv2.resize(frame, None, fx=ds_factor, fy=ds_factor,
    #                        interpolation=cv2.INTER_AREA)
    #     gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    #     face_rects = face_cascade.detectMultiScale(gray, 1.3, 5)
    #     for (x, y, w, h) in face_rects:
    #         cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
    #         break
    model = keras.models.load_model('susp_act.model')  # to load crime model
    # cats_ contains categories i.e. burglary, firing, fighting
    cats_ = [i for i in os.listdir('Dataset/')]

    cap = cv2.VideoCapture(0)  # video
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
        # encode OpenCV raw frame to jpg and displaying it
    ret, jpeg = cv2.imencode('.jpg', frame)
    return jpeg.tobytes()
