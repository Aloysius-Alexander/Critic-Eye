import { useState } from 'react';
import { addMovie } from '../../services/movieService'; // Backend service for adding a movie
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { Alert, AlertIcon } from '@chakra-ui/react';

function AddMoviePage() {
    const [movieData, setMovieData] = useState({
        title: '',
        director: '',
        releaseYear: '',
        genre: '',
        summary: '',
        trailerUrl: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setMovieData({ ...movieData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addMovie(movieData); // Call the backend service
            setSuccess('Movie added successfully');
            setError(null); // Clear any previous errors
            navigate('/admin/dashboard'); // Redirect to dashboard after adding movie
        } catch (err) {
            setError('Failed to add movie');
            setSuccess(null); // Clear success message
        }
    };

    return (
        <Box maxW="md" mx="auto" mt="10">
            {success && (
                <Alert status="success" mb="4">
                    <AlertIcon />
                    {success}
                </Alert>
            )}
            {error && (
                <Alert status="error" mb="4">
                    <AlertIcon />
                    {error}
                </Alert>
            )}

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

                <Button type="submit" colorScheme="teal">Add Movie</Button>
            </form>
        </Box>
    );
}

export default AddMoviePage;
