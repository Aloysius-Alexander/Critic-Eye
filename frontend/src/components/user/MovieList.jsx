import { useEffect, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Optional: for loading state

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('/api/v1/user/home');
        console.log(response.data); // Log the API response to check structure
        setMovies(response.data);   // Assuming the response is an array of movies
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Optional: loading state
  }

  return (
    <Box className="max-w-4xl mx-auto mt-10">
      {Array.isArray(movies) && movies.length > 0 ? (
        movies.map((movie) => (
          <Box key={movie._id} className="mb-6 p-4 border border-gray-200 rounded">
            <h2>{movie.title}</h2>
            <p>{movie.summary}</p>
            <Button colorScheme="teal" className="mt-2">
              View Details
            </Button>
          </Box>
        ))
      ) : (
        <p>No movies available</p> // Graceful fallback if no movies are returned
      )}
    </Box>
  );
};

export default MovieList;
