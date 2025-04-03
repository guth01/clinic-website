// src/components/ClinicAnalytics.js

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
         PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
import './ClinicAnalytics.css';

const ClinicAnalytics = () => {
  // State for storing fetched data
  const [departmentData, setDepartmentData] = useState([]);
  const [trafficData, setTrafficData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#FF6B6B'];
  
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deptResponse, trafficResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/analytics/appointments-by-department'),
          axios.get('http://localhost:5000/api/analytics/hourly-traffic')
        ]);
        
        setDepartmentData(deptResponse.data);
        setTrafficData(trafficResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setError("Failed to load analytics data. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Display loading state
  if (loading) {
    return (
      <section className="analytics-section">
        <h2>Clinic Analytics</h2>
        <div className="loading-container">
          <p>Loading analytics data...</p>
        </div>
      </section>
    );
  }
  
  // Display error state
  if (error) {
    return (
      <section className="analytics-section">
        <h2>Clinic Analytics</h2>
        <div className="error-container">
          <p>{error}</p>
        </div>
      </section>
    );
  }
  
  return (
    <section className="analytics-section">
      <h2>Clinic Analytics</h2>
      <div className="analytics-container">
        <div className="chart-container">
          <h3>Average Appointment Distribution per month by Department</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={150}
                fill="#8884d8"
                dataKey="appointments"
                nameKey="department"
                label={({ department, percent }) => `${department}: ${(percent * 100).toFixed(0)}%`}
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name, props) => [`${value} appointments`, props.payload.department]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="chart-container">
          <h3>Average Patient Traffic Throughout the Day</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={trafficData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" angle={-45} textAnchor="end" interval={0} height={70} />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} patients`]} />
              <Legend />
              <Bar dataKey="patients" name="Number of Patients" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default ClinicAnalytics;