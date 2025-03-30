// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setAuthToken(token);
      setCurrentUser(JSON.parse(user));
    }
    
    setLoading(false);
  }, []);

  // Store auth token and user data in localStorage
  const saveUserData = (token, user) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuthToken(token);
    setCurrentUser(user);
  };

  // Clear auth token and user data
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setAuthToken(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        authToken,
        loading,
        saveUserData,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};