import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

MODEL = tf.keras.models.load_model("../model3")
labels = {0: 'Black Sea Sprat', 1: 'Gilt-Head Bream', 2: 'Hourse Mackerel', 3: 'Red Mullet', 4: 'Red Sea Bream', 5: 'Sea Bass', 6: 'Shrimp', 7: 'Striped Red Mullet', 8: 'Trout'}

test_generator = tf.keras.preprocessing.image.ImageDataGenerator(
    preprocessing_function=tf.keras.applications.mobilenet_v2.preprocess_input
)

def read_file_as_image(data) -> np.ndarray:

    image = np.array(Image.open(BytesIO(data)).resize((224,224)))
    image = np.expand_dims(image,0)
    img = test_generator.flow(image, batch_size=1)

    return img

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    image_batch = read_file_as_image(await file.read())
    # image_batch = np.expand_dims(image,0)
    pred = MODEL.predict(image_batch)
    print(pred)
    predicted_class = labels[np.argmax(pred[0])]
    confidence = np.max(pred[0])
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }


if __name__ == "__main__":
    uvicorn.run(app,host='localhost',port=8000)