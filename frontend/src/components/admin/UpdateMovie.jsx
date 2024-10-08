import { Box, Input, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    releaseYear: '',
    genre: '',
    summary: '',
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`/api/v1/admin/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Failed to fetch movie:', error);
      }
    };
    fetchMovie();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/v1/admin/update-movie/${id}`, movie);
      console.log(response.data);
    } catch (error) {
      console.error('Failed to update movie:', error);
    }
  };

  return (
    <Box className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Title"
          value={movie.title}
          onChange={(e) => setMovie({ ...movie, title: e.target.value })}
          className="mb-4"
        />
        <Input
          placeholder="Director"
          value={movie.director}
          onChange={(e) => setMovie({ ...movie, director: e.target.value })}
          className="mb-4"
        />
        <Input
          placeholder="Release Year"
          value={movie.releaseYear}
          onChange={(e) => setMovie({ ...movie, releaseYear: e.target.value })}
          className="mb-4"
        />
        <Input
          placeholder="Genre"
          value={movie.genre}
          onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
          className="mb-4"
        />
        <Input
          placeholder="Summary"
          value={movie.summary}
          onChange={(e) => setMovie({ ...movie, summary: e.target.value })}
          className="mb-4"
        />
        <Button type="submit" colorScheme="teal" className="w-full">
          Update Movie
        </Button>
      </form>
    </Box>
  );
};

export default UpdateMovie;
