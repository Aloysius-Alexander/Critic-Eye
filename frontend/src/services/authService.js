import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/user'; // Change this to match your backend URL

// User sign-up
export const signUp = async (userData) => {
  const response = await axios.post(`${API_URL}/SignUp`, userData, {
    withCredentials: true, // If your API is using cookies for authentication
  });
  return response.data;
};

// User sign-in
export const signIn = async (credentials) => {
  const response = await axios.post(`${API_URL}/SignIn`, credentials, {
    withCredentials: true,
  });
  return response.data;
};
export const logout = () => {
    localStorage.removeItem('token');
  };
  