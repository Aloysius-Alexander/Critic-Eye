import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/user'; // Update with your backend URL

// Add a new review for a movie
export const addReview = async (reviewData) => {
  const response = await axios.post(`${API_URL}/add-review`, reviewData, {
    withCredentials: true, // If cookies are used for auth
  });
  return response.data;
};

// Fetch all reviews for a specific movie
export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`${API_URL}/movie/${movieId}/get-reviews`);
  return response.data;
};


// Admin - Approve a review
export const approveReview = async (id) => {
  const response = await axios.put(`${API_URL}/review/${id}/approve`, {}, {
    withCredentials: true,
  });
  return response.data;
};

// Admin - Delete (Reject) a review
export const deleteReview = async (id) => {
  const response = await axios.delete(`${API_URL}/review/${id}/reject`, {
    withCredentials: true,
  });
  return response.data;
};
