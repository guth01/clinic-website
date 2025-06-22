from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import os

app = Flask(__name__)
CORS(app)

#LOAD MODEL
print("Loading healthcare model...")
model_path = "./final_healthcare_model"  # Path to your downloaded model
model = AutoModelForSequenceClassification.from_pretrained(model_path)
tokenizer = AutoTokenizer.from_pretrained(model_path)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)
model.eval()

# Your label mappings
id2label = {
    0: 'Asthma', 
    1: 'Diabetes', 
    2: 'Arthritis', 
    3: 'Common Cold', 
    4: 'Pneumonia', 
    5: 'Gastroenteritis', 
    6: 'Migraine', 
    7: 'Hypertension'
}

print(f"Model loaded successfully on {device}!")


def predict_disease(symptoms_text):
    # Tokenize input
    encoding = tokenizer(
        symptoms_text,
        truncation=True,
        padding='max_length',
        max_length=512,
        return_tensors='pt'
    ).to(device)
    
    # Get prediction
    with torch.no_grad():
        outputs = model(**encoding)
        probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)
        
        # Get top 3 predictions
        top_probs, top_indices = torch.topk(probabilities, k=3)
        
        results = []
        for i in range(3):
            class_idx = top_indices[0][i].item()
            confidence = top_probs[0][i].item()
            disease = id2label[class_idx]
            results.append({
                'disease': disease,
                'confidence': round(confidence * 100, 1)
            })
        
        return results

#API CALL

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        symptoms = data.get('symptoms', '').strip()
        
        if not symptoms:
            return jsonify({'error': 'Please enter symptoms'}), 400
        
        predictions = predict_disease(symptoms)
        
        return jsonify({
            'success': True,
            'predictions': predictions,
            'top_diagnosis': predictions[0]['disease'],
            'confidence': predictions[0]['confidence']
        })
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ML service is running'})

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5001)  # Different port from your Node.js