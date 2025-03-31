import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
  try {
    const { symptoms } = req.body;
    
    if (!symptoms || symptoms.trim() === '') {
      return res.status(400).json({ error: 'Symptoms are required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
      As a medical AI assistant, provide a preliminary analysis of the following symptoms. 
      Include possible conditions, recommendations for care, and whether the person should seek immediate medical attention.
      
      Symptoms: ${symptoms}
      
      Format your response in a structured way with sections for:
      1. Possible conditions
      2. Recommendations
      3. Urgency level (non-urgent, see doctor soon, seek immediate care)
      
       Put a line break after each thing and make it very short.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const diagnosis = response.text();
    
    res.json({ diagnosis });
  } catch (error) {
    console.error('Error generating diagnosis:', error);
    res.status(500).json({ error: 'Failed to generate diagnosis' });
  }
});

export default router;
