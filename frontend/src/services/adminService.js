import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/admin'; // Update the backend URL

// Fetch dashboard statistics
export const getAdminOverview = async () => {
  const response = await axios.get(`${API_URL}/overview`, {
    withCredentials: true, // Send cookies for authentication
  });
  return response.data;
};
