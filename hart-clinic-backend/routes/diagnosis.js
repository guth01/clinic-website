import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { symptoms } = req.body;
    
    if (!symptoms || symptoms.trim() === '') {
      return res.status(400).json({ error: 'Symptoms are required' });
    }

    // Call your Python ML service
    const mlResponse = await axios.post('http://localhost:5001/predict', {
      symptoms: symptoms
    });

    const { predictions, top_diagnosis, confidence } = mlResponse.data;

    // Format the response for your frontend
    const diagnosis = formatDiagnosis(predictions, symptoms);
    
    res.json({ diagnosis });
  } catch (error) {
    console.error('Error generating diagnosis:', error);
    
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({ 
        error: 'ML diagnosis service is currently unavailable. Please try again later.' 
      });
    }
    
    res.status(500).json({ error: 'Failed to generate diagnosis' });
  }
});

function formatDiagnosis(predictions, symptoms) {
  const topPrediction = predictions[0];
  const otherPredictions = predictions.slice(1);
  
  let diagnosis = `**Primary Diagnosis:** ${topPrediction.disease} (${topPrediction.confidence}% confidence)\n\n`;
  
  diagnosis += `**Alternative Possibilities:**\n`;
  otherPredictions.forEach((pred, index) => {
    diagnosis += `${index + 2}. ${pred.disease} (${pred.confidence}%)\n`;
  });
  
  diagnosis += `\n**Recommendations:**\n`;
  diagnosis += getRecommendations(topPrediction.disease);
  
  diagnosis += `\n\n**Note:** This AI diagnosis is based on your symptoms: "${symptoms}"`;
  
  return diagnosis;
}

function getRecommendations(disease) {
  const recommendations = {
    'Common Cold': '• Rest and stay hydrated\n• Use over-the-counter medications for symptom relief\n• See a doctor if symptoms worsen or persist beyond 10 days',
    'Asthma': '• Use prescribed inhaler if available\n• Avoid known triggers\n• Seek immediate medical attention if breathing becomes severely difficult',
    'Pneumonia': '• Seek medical attention promptly\n• Rest and stay hydrated\n• Follow prescribed antibiotic treatment if bacterial',
    'Migraine': '• Rest in a dark, quiet room\n• Apply cold compress to head\n• Take prescribed migraine medication if available\n• Consult doctor if severe or frequent',
    'Diabetes': '• Monitor blood sugar levels regularly\n• Follow prescribed diet and medication\n• Consult endocrinologist for management plan',
    'Hypertension': '• Monitor blood pressure regularly\n• Follow low-sodium diet\n• Take prescribed medications as directed\n• Regular follow-up with healthcare provider',
    'Arthritis': '• Apply heat/cold therapy\n• Gentle exercise and stretching\n• Anti-inflammatory medications as prescribed\n• Consult rheumatologist for management',
    'Gastroenteritis': '• Stay hydrated with clear fluids\n• Follow BRAT diet (bananas, rice, applesauce, toast)\n• Seek medical care if severe dehydration occurs'
  };
  
  return recommendations[disease] || '• Consult with a healthcare professional for proper evaluation and treatment';
}

export default router;