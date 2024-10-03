import { useState, useEffect } from 'react';
import { getMovie, updateMovie } from '../../services/movieService'; // Backend services
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Input, FormControl, FormLabel, Textarea } from '@chakra-ui/react';

function EditMoviePage() {
  const { id } = useParams(); // Get movie ID from the URL
  const [movieData, setMovieData] = useState({
    title: '',
    director: '',
    releaseYear: '',
    genre: '',
    summary: '',
    trailerUrl: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const movie = await getMovie(id); // Fetch movie details
      setMovieData(movie);
    };
    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMovie(id, movieData); // Call backend service to update movie
      navigate('/admin/dashboard'); // Redirect after success
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="10">
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel>Title</FormLabel>
          <Input name="title" value={movieData.title} onChange={handleChange} required />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Director</FormLabel>
          <Input name="director" value={movieData.director} onChange={handleChange} required />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Release Year</FormLabel>
          <Input name="releaseYear" type="number" value={movieData.releaseYear} onChange={handleChange} required />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Genre</FormLabel>
          <Input name="genre" value={movieData.genre} onChange={handleChange} required />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Summary</FormLabel>
          <Textarea name="summary" value={movieData.summary} onChange={handleChange} required />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Trailer URL</FormLabel>
          <Input name="trailerUrl" value={movieData.trailerUrl} onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="teal">Update Movie</Button>
      </form>
    </Box>
  );
}

export default EditMoviePage;
