import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './main_pages/HomePge.js';
import DoctorsPage from './main_pages/DoctorsPage.js';
import AppointmentBookingPage from './main_pages/AppointmentBookingPage.js';
import GetDiagnosisPage from './main_pages/GetDiagonosis.js'; 
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ProtectedRoute from './components/auth/ProtectedRoute.js';
import Yourprofile from './main_pages/Yourprofile.js';
import PharmacyPage from './main_pages/PharmacyPage.js';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pharmacy" element={<PharmacyPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/book-test" element={
          <ProtectedRoute>
            <AppointmentBookingPage />
          </ProtectedRoute>
          } />
          <Route path="/symptoms" element={<GetDiagnosisPage />} /> {/* Add the new route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Yourprofile/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;