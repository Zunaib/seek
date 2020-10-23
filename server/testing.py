import keras  # keras for deep learning
import numpy as np
import cv2
import os  # to manipulate with paths
model = keras.models.load_model('susp_act.model')  # to load crime model
# cats_ contains categories i.e. burglary, firing, fighting
cats_ = [i for i in os.listdir('Dataset/')]

cap = cv2.VideoCapture('Video2.mp4')  # video
try:
    while True:  # iterate each frame one by one
        ret, frame = cap.read()  # extract frame
        img = frame.copy()  # copy frame
        # convert frame from BGR to RGB
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = cv2.resize(img, (224, 224))  # resize image by 224x224
        # find the class with highest probability 0 or 1 or 2
        actual = np.argmax(list(model.predict([img.reshape(-1, 224, 224, 3)])))
        # print the probability for each of 3 classes and return the class
        print(list(model.predict([img.reshape(-1, 224, 224, 3)])),
              'corresponding action : ', cats_[actual])

        # resize by 600x400 to show on screen
        frame = cv2.resize(frame, (600, 400))
        # put text on video frames
        cv2.putText(frame, str(cats_[actual]), (20, 20),
                    cv2.FONT_HERSHEY_DUPLEX, 1, (255, 0, 255))
        cv2.imshow('iSecure', frame)  # show frames
        key = cv2.waitKey(10)  # show frame for 33 milli seconds
        if key == 27:  # escape
            cv2.destroyAllWindows()  # destroy window if user presses escape
            break
    cap.release()  # release the capture
except:
    pass
