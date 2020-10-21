import cv2
import os  # cv is openCV


data_dir = 'Dataset/'
categories = [i for i in os.listdir('Dataset/')]  # firing burglary fighting

for category in categories:
    path = os.path.join(data_dir, category)
    count = 0
    for img_ in os.listdir(path):  # img_ contains names of images
        img = cv2.imread(os.path.join(path, img_))  # read image as array
        # save that array as an image but with updated name
        cv2.imwrite(path+'/'+'{}.jpg'.format(count), img)
        os.remove(path+'/'+img_)  # remove the old image
        count += 1
