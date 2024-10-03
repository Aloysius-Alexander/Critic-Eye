import { useState } from 'react';
import { addMovie } from '../../services/movieService'; // Backend service for adding a movie
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { Alert, AlertIcon } from '@chakra-ui/react';

const [error, setError] = useState(null);
const [success, setSuccess] = useState(null);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMovie(movieData);
      setSuccess('Movie added successfully');
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Failed to add movie');
    }
  };
  
  // JSX for success message
  {success && (
    <Alert status="success" mb="4">
      <AlertIcon />
      {success}
    </Alert>
  )}
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await addMovie(movieData);
    navigate('/admin/dashboard');
  } catch (err) {
    setError('Failed to add movie');
  }
};
// In the JSX
{error && (
    <Alert status="error" mb="4">
      <AlertIcon />
      {error}
    </Alert>
  )}
function AddMoviePage() {
    const [movieData, setMovieData] = useState({
        title: '',
        director: '',
        releaseYear: '',
        genre: '',
        summary: '',
        trailerUrl: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setMovieData({ ...movieData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addMovie(movieData); // Call the backend service
            navigate('/admin/dashboard'); // Redirect to dashboard after adding movie
        } catch (error) {
            console.error('Error adding movie:', error);
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
                <FormControl mb="4" isInvalid={!movieData.title}>
                    <FormLabel>Title</FormLabel>
                    <Input name="title" value={movieData.title} onChange={handleChange} required />
                </FormControl>

                <Button type="submit" colorScheme="teal">Add Movie</Button>
            </form>
        </Box>
    );
}

export default AddMoviePage;
