import { Box, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminMovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('/api/v1/admin/show-movies');
        setMovies(response.data.movies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <Box className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl mb-6">Movie List</h2>
      {movies.map((movie) => (
        <Box key={movie._id} className="mb-4 p-4 border border-gray-200 rounded">
          <p>{movie.title}</p>
          <p>{movie.director}</p>
          <Button colorScheme="teal" className="mt-2">Edit Movie</Button>
          <Button colorScheme="red" className="mt-2 ml-2">Delete Movie</Button>
        </Box>
      ))}
    </Box>
  );
};

export default AdminMovieList;
