# to perform average pooling, to reduce variance to receive strong signal from middle of image instead of edges only.
from keras.layers.pooling import AveragePooling2D
# dropping (ignoring) out neurons during training
from keras.layers.core import Dropout
# A utility layer that flattens an input to a simple 1-D vector
from keras.layers.core import Flatten
# To Make Dense Layer (FC layer), A dense layer is a layer of neurons where Each neuron recieves input from all the neurons in the previous layer
from keras.layers.core import Dense
from keras.layers import Input  # to instantiate a Keras tensor. A Keras tensor is a TensorFlow symbolic tensor object, which we augment with certain attributes that allow us to build a Keras model just by knowing the inputs and outputs of the model
from keras.models import Model  # to define Deep Learning Model
from keras.optimizers import Adam  # Adam As Optimizer
# to split dataset into train test
from sklearn.model_selection import train_test_split
import numpy as np  # numeric python, to manipulate with arrays
# assigns a unique number to each label
from sklearn.preprocessing import LabelBinarizer
import cv2  # Open-CV for computer Vision problems
import os  # Operating System dependent functionalities
import tensorflow as tf  # to create deep learning models
# Visual Geometry Group 16 Model for image classification
from keras.applications.vgg16 import VGG16
# Visualization tool to visualize graphs, losses during training
from tensorflow.keras.callbacks import TensorBoard


MODEL_NAME = 'susp_act.model'  # specify model name here
tensorboard = TensorBoard(log_dir='logs')  # specify logdir here

# specify image size (it should be same as which we specified during preprocessing)
img_size = 224

# Load arrays or pickled objects from .npy pickled files.
# allow_pickle: True:Allow loading pickled object arrays, False:Do not load pickled object arrays
train_data = np.load('Dataset_v1.npy', allow_pickle=True)

# x will contain all the input data and y will contain lables
# train_data has all input features at 0 column and all labels at 1 column
# images data ( we do reshape like (-1 , img_width,img_height,no of channels) this -1 is because we dont want to lose orignal shape of our training data)
x = np.array([i[0] for i in train_data]).reshape(-1, img_size, img_size, 3)
y = [i[1] for i in train_data]  # labels 0,1,2

lb = LabelBinarizer()
# creating nx3 array for 3 categories. burglary: [1,0,0], fighting: [0,1,0]
labels = lb.fit_transform(y)

data = np.array(x)  # converting all into numpy array
labels = np.array(y)


(trainX, testX, trainY, testY) = train_test_split(data, labels,
                                                  test_size=0.20)  # splitting data into train test by 80-20%


# model
baseModel = VGG16(weights="imagenet", include_top=False, input_tensor=Input(
    shape=(224, 224, 3)))  # vgg16 model as our base

headModel = baseModel.output  # assigning base model outputs to our head model input
headModel = AveragePooling2D(pool_size=(7, 7))(
    headModel)  # below are some layers of our head model
headModel = Flatten(name="flatten")(headModel)
headModel = Dense(512, activation="relu")(headModel)  # 512 neurons
headModel = Dropout(0.5)(headModel)  # drop upto 50% unnecessery units
headModel = Dense(len(lb.classes_), activation="softmax")(
    headModel)  # final layer

model = Model(inputs=baseModel.input, outputs=headModel)

for layer in baseModel.layers:  # this is because those layers are already trained on imagenet dataset
    layer.trainable = False

# 1e-4=0.0001
opt = Adam(learning_rate=1e-4)  # specifying optimizer
# compiling model, to define the loss function, the optimizer and the metrics
model.compile(loss="sparse_categorical_crossentropy",optimizer=opt, metrics=["accuracy"])
# A metric is a function that is used to judge the performance of your model e.g. accuracy, binary accuracy


model.fit(trainX, trainY, batch_size=20, epochs=120,validation_data=(testX, testY), callbacks=[tensorboard])
model.save(MODEL_NAME)
