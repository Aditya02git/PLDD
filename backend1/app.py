import os
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"  # Disable GPU

from flask import Flask, request, jsonify
from flask_cors import CORS  
import tensorflow as tf
import numpy as np
import pickle
import json
from PIL import Image
import io

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow CORS for frontend

# Load livestock disease model and encoders
livestock_model = tf.keras.models.load_model("model/livestock_disease_ann_model.keras")
with open("model/label_encoders.pkl", "rb") as f:
    label_encoders = pickle.load(f)

# Load plant disease model
plant_model = tf.keras.models.load_model("model/plant_disease_model.h5")
with open("model/class_indices.json", "r") as f:
    class_indices = json.load(f)
class_labels = {v: k for k, v in class_indices.items()}

# Preprocess text input
def preprocess_input(sample_input):
    categorical_columns = ['Animal', 'Symptom 1', 'Symptom 2', 'Symptom 3']
    sample_input = [item.lower().strip() for item in sample_input]
    
    for i, col in enumerate(categorical_columns):
        if sample_input[i] in label_encoders[col].classes_:
            sample_input[i] = label_encoders[col].transform([sample_input[i]])[0]
        else:
            sample_input[i] = 0

    return np.array(sample_input, dtype=np.float32).reshape(1, -1)

# Preprocess image input
def preprocess_img(image):
    img = Image.open(io.BytesIO(image))
    img = img.resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    sample_input = data.get("symptoms")

    if not sample_input or len(sample_input) < 4:
        return jsonify({"error": "Invalid input"}), 400

    processed_input = preprocess_input(sample_input)
    predictions = livestock_model.predict(processed_input)
    predicted_class = np.argmax(predictions, axis=1)[0]
    confidence = float(np.max(predictions))
    disease = label_encoders['Disease'].inverse_transform([predicted_class])[0]

    return jsonify({"type": "livestock", "disease": disease, "confidence": confidence})

@app.route('/')
def home():
    return jsonify({"message": "Livestock and Plant Disease Detection API is running!"})

@app.route("/predict-plant", methods=["POST"])
def predict_plant():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    image_file = request.files["file"].read()
    processed_img = preprocess_img(image_file)
    prediction = plant_model.predict(processed_img)
    predicted_class_index = np.argmax(prediction, axis=1)[0]
    predicted_disease = class_labels[predicted_class_index]

    return jsonify({"type": "plant", "disease": predicted_disease, "confidence": float(np.max(prediction))})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=7860)  # Required for Hugging Face
