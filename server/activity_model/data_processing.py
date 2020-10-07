import random
import os
import cv2  # computer vision
import numpy as np


img_size = 224  # 224x224 image size

training_data = []

data_dir = 'Dataset/'
# list of categories i.e. burglary, fighting, firing
catagories = [i for i in os.listdir(data_dir)]


def create_training_data():  # preprocessing function
    for catagory in catagories:  # iterates over each category
        class_num = catagories.index(catagory)  # 0,1,2 category index
        # path to each category e.g. Dataset/burglary
        path = os.path.join(data_dir, catagory)
        for img in os.listdir(path):  # pick each image one by one
            try:
                # read image as an array
                img_array = cv2.imread(os.path.join(path, img))
                # convert image to RGB
                img_array = cv2.cvtColor(img_array, cv2.COLOR_BGR2RGB)
                # change image size to 224x224
                new_array = cv2.resize(img_array, (img_size, img_size))
                # add image array to new array that contains image array & its category (one of 0,1,2)
                training_data.append([new_array, class_num])
            except:
                pass


create_training_data()
# training_data contains list of all the images as array with their class (0,1,2)
# random.shuffle(training_data) #shuffle the data randomly
# save all the dataset as .npy (numpy array) files that will be further used for training
np.save('Dataset_v1.npy', training_data)
