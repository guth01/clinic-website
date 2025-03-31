import React, { useState } from 'react';
import './GetDiagonosis.css';

const GetDiagnosis = () => {
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setDiagnosis(data.diagnosis);
    } catch (error) {
      console.error('Error fetching diagnosis:', error);
      setDiagnosis('Error: Unable to generate diagnosis. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleClear = () => {
    setSymptoms('');
    setDiagnosis('');
  };

  return (
    <div className="diagnosis-page">
      <div className="diagnosis-container">
        <h1>Get Diagnosis</h1>
        <p>Please describe your symptoms in detail for an AI-assisted preliminary diagnosis.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="symptoms">Symptoms:</label>
            <textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Describe your symptoms here (e.g., headache, fever, cough)..."
              rows="6"
              required
            />
          </div>
          
          <div className="button-group">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Analyzing...' : 'Get Diagnosis'}
            </button>
            <button type="button" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>
        
        {diagnosis && (
          <div className="diagnosis-result">
            <h2>Preliminary Diagnosis</h2>
            <div className="diagnosis-content">
              <p>{diagnosis}</p>
            </div>
            <div className="disclaimer">
              <p><strong>Important:</strong> This is an AI-generated preliminary assessment and should not replace professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetDiagnosis;