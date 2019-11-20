import keras

from keras.preprocessing.image import ImageDataGenerator

import numpy as np
from keras.preprocessing import image

load_path = '/tmp/DrawingClassifier.h5'
print('loading', load_path)
classifier = keras.models.load_model(load_path)


test_image = image.load_img('/tmp/target/sculpture/4861677-BKCPJFPJ-6.jpg', target_size = (64, 64))
test_image = image.img_to_array(test_image)
test_image = np.expand_dims(test_image, axis = 0)
result = classifier.predict(test_image)

if result[0][0] == 1:
  prediction = 'drawing'
else:
  prediction = 'sculpture'

print('result', result, prediction)