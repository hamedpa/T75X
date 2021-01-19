import cv2
import tensorflow as tf
import numpy as np
from PIL import Image
import sys 

CATEGORIES = ["covid", "normal"]

def prepare(filepath):
    IMG_SIZE = 70
    img_array = cv2.imread(filepath, cv2.IMREAD_GRAYSCALE)
    ret,thresh1 = cv2.threshold(img_array,85,255,cv2.THRESH_BINARY)
    thresh1 = thresh1/255.0

    new_array = cv2.resize(thresh1, (IMG_SIZE, IMG_SIZE))
    return new_array.reshape(-1, IMG_SIZE, IMG_SIZE, 1)


model = tf.keras.models.load_model("Final_Model")
img_tensor =[prepare('iscovid/'+sys.argv[1])]

prediction = model.predict(img_tensor)[0][0]
classP = model.predict_classes(img_tensor)[0][0]
print(prediction*100 , classP) 
print(CATEGORIES[int(prediction)])
