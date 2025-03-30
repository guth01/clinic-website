import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Change to your backend URL

export const authService = {
  register: async (name, email, password) => {
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      name,
      email,
      password
    });
    return response.data;
  },
};
