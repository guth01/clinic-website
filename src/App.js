import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './main_pages/HomePge.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Future routes will be added here */}
          {/* 
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/symptoms" element={<SymptomsPage />} />
            <Route path="/book-test" element={<BookTestPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;