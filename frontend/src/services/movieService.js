import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/user'; // Change this to match your backend URL

// Fetch movies with pagination
export const getMovies = async (page = 1) => {
  const response = await axios.get(`${API_URL}/home`, {
    params: { page },
  });
  return response.data; // { movies, totalMovies }
};

// Admin - Add a new movie
export const addMovie = async (movieData) => {
    const response = await axios.post(`${API_URL}/add-movie`, movieData, {
      withCredentials: true, // Ensure cookies are sent for authentication
    });
    return response.data;
};
// Get movie details by ID (for editing)
export const getMovie = async (id) => {
    const response = await axios.get(`${API_URL}/movie/${id}`);
    return response.data;
  };
  
  // Update movie details by ID
  export const updateMovie = async (id, movieData) => {
    const response = await axios.put(`${API_URL}/update-movie/${id}`, movieData, {
      withCredentials: true, // Ensure cookies are sent for authentication
    });
    return response.data;
  };
  
  // Delete movie by ID
  export const deleteMovie = async (id) => {
    const response = await axios.delete(`${API_URL}/delete-movie/${id}`, {
      withCredentials: true,
    });
    return response.data;
  };

  //Fetch movie details
  export const getMovieDetails = async (id) => {
    const response = await axios.get(`${API_URL}/movie/${id}`);
    return response.data;
  };
  