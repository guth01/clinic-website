import React, { useState } from 'react';
import './DoctorsPages.css';

const DoctorsPage = () => {
  const doctors = [
    // General Medicine
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      department: "General Medicine",
      experience: "15 years",
      education: "MBBS, MD (Internal Medicine)",
      specialty: "Diabetes and Hypertension Management"
    },
    {
      id: 2,
      name: "Dr. Anita Sharma",
      department: "General Medicine",
      experience: "12 years",
      education: "MBBS, DNB (General Medicine)",
      specialty: "Preventive Healthcare"
    },
    {
      id: 3,
      name: "Dr. Vikram Singh",
      department: "General Medicine",
      experience: "18 years",
      education: "MBBS, MD (General Medicine)",
      specialty: "Geriatric Care"
    },
    {
      id: 4,
      name: "Dr. Priya Patel",
      department: "General Medicine",
      experience: "10 years",
      education: "MBBS, DNB (Family Medicine)",
      specialty: "Women's Health"
    },
    
    // ENT
    {
      id: 5,
      name: "Dr. Suresh Menon",
      department: "ENT",
      experience: "20 years",
      education: "MBBS, MS (ENT)",
      specialty: "Cochlear Implants"
    },
    {
      id: 6,
      name: "Dr. Deepika Malhotra",
      department: "ENT",
      experience: "14 years",
      education: "MBBS, DNB (Otorhinolaryngology)",
      specialty: "Pediatric ENT"
    },
    {
      id: 7,
      name: "Dr. Ramesh Joshi",
      department: "ENT",
      experience: "16 years",
      education: "MBBS, MS (ENT)",
      specialty: "Sinus Surgery"
    },
    {
      id: 8,
      name: "Dr. Kavita Reddy",
      department: "ENT",
      experience: "11 years",
      education: "MBBS, DNB (ENT)",
      specialty: "Voice Disorders"
    },
    
    // Dermatology
    {
      id: 9,
      name: "Dr. Sanjay Khanna",
      department: "Dermatology",
      experience: "22 years",
      education: "MBBS, MD (Dermatology)",
      specialty: "Cosmetic Dermatology"
    },
    {
      id: 10,
      name: "Dr. Meera Iyer",
      department: "Dermatology",
      experience: "15 years",
      education: "MBBS, DVD, DNB (Dermatology)",
      specialty: "Pediatric Dermatology"
    },
    {
      id: 11,
      name: "Dr. Arjun Nair",
      department: "Dermatology",
      experience: "13 years",
      education: "MBBS, MD (Dermatology)",
      specialty: "Laser Treatments"
    },
    {
      id: 12,
      name: "Dr. Sunita Agarwal",
      department: "Dermatology",
      experience: "17 years",
      education: "MBBS, MD (Dermatology)",
      specialty: "Hair and Nail Disorders"
    },
    
    // Pediatrics
    {
      id: 13,
      name: "Dr. Rahul Mehta",
      department: "Pediatrics",
      experience: "19 years",
      education: "MBBS, MD (Pediatrics)",
      specialty: "Neonatal Care"
    },
    {
      id: 14,
      name: "Dr. Lakshmi Rao",
      department: "Pediatrics",
      experience: "14 years",
      education: "MBBS, DCH, DNB (Pediatrics)",
      specialty: "Pediatric Neurology"
    },
    {
      id: 15,
      name: "Dr. Vivek Gupta",
      department: "Pediatrics",
      experience: "12 years",
      education: "MBBS, MD (Pediatrics)",
      specialty: "Pediatric Allergy and Asthma"
    },
    {
      id: 16,
      name: "Dr. Neha Verma",
      department: "Pediatrics",
      experience: "10 years",
      education: "MBBS, DCH",
      specialty: "Developmental Pediatrics"
    },
    
    // Dentistry
    {
      id: 17,
      name: "Dr. Rohan Desai",
      department: "Dentistry",
      experience: "16 years",
      education: "BDS, MDS (Orthodontics)",
      specialty: "Orthodontic Treatment"
    },
    {
      id: 18,
      name: "Dr. Anjali Jain",
      department: "Dentistry",
      experience: "13 years",
      education: "BDS, MDS (Periodontics)",
      specialty: "Gum Treatment"
    },
    {
      id: 19,
      name: "Dr. Tarun Kapoor",
      department: "Dentistry",
      experience: "15 years",
      education: "BDS, MDS (Endodontics)",
      specialty: "Root Canal Treatment"
    },
    {
      id: 20,
      name: "Dr. Mira Bose",
      department: "Dentistry",
      experience: "12 years",
      education: "BDS, MDS (Prosthodontics)",
      specialty: "Dental Implants"
    },
    
    // Cardiology
    {
      id: 21,
      name: "Dr. Amit Bansal",
      department: "Cardiology",
      experience: "23 years",
      education: "MBBS, MD, DM (Cardiology)",
      specialty: "Interventional Cardiology"
    },
    {
      id: 22,
      name: "Dr. Sarita Mishra",
      department: "Cardiology",
      experience: "19 years",
      education: "MBBS, MD, DNB (Cardiology)",
      specialty: "Preventive Cardiology"
    },
    
    // Orthopedics
    {
      id: 23,
      name: "Dr. Nitin Choudhary",
      department: "Orthopedics",
      experience: "21 years",
      education: "MBBS, MS (Orthopedics)",
      specialty: "Joint Replacement"
    },
    {
      id: 24,
      name: "Dr. Pooja Sharma",
      department: "Orthopedics",
      experience: "16 years",
      education: "MBBS, DNB (Orthopedics)",
      specialty: "Sports Medicine"
    },
    
    // Neurology
    {
      id: 25,
      name: "Dr. Alok Srivastava",
      department: "Neurology",
      experience: "24 years",
      education: "MBBS, MD, DM (Neurology)",
      specialty: "Movement Disorders"
    },
    {
      id: 26,
      name: "Dr. Rekha Menon",
      department: "Neurology",
      experience: "18 years",
      education: "MBBS, MD, DNB (Neurology)",
      specialty: "Epilepsy Management"
    },
    
    // Ophthalmology
    {
      id: 27,
      name: "Dr. Karan Malik",
      department: "Ophthalmology",
      experience: "17 years",
      education: "MBBS, MS (Ophthalmology)",
      specialty: "Cataract Surgery"
    },
    {
      id: 28,
      name: "Dr. Shweta Gandhi",
      department: "Ophthalmology",
      experience: "14 years",
      education: "MBBS, DNB (Ophthalmology)",
      specialty: "Pediatric Ophthalmology"
    }
  ];

  // State for filtering by department
  const [selectedDepartment, setSelectedDepartment] = useState('');
  
  // Get unique departments for filter options
  const departments = [...new Set(doctors.map(doctor => doctor.department))];
  
  // Filter doctors based on selected department
  const filteredDoctors = selectedDepartment 
    ? doctors.filter(doctor => doctor.department === selectedDepartment)
    : doctors;

  return (
    <div className="doctors-page">
      <div className="doctors-header">
        <h1>Find a Doctor</h1>
        <p>Connect with our team of experienced healthcare professionals dedicated to your wellbeing.</p>
        
        <div className="filter-section">
          <label htmlFor="department-filter">Filter by Department:</label>
          <select 
            id="department-filter" 
            value={selectedDepartment} 
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="doctors-container">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="doctor-card">
            <div className="doctor-info">
              <h3>{doctor.name}</h3>
              <p className="department">{doctor.department}</p>
              <p>Experience: {doctor.experience}</p>
              <p>{doctor.education}</p>
              <p>Specialty: {doctor.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;