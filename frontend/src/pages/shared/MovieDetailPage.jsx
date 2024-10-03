import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../../services/movieService';
import { Box, Text, Image, Heading, Spinner } from '@chakra-ui/react';

function MovieDetailPage() {
  const { id } = useParams(); // Get movie ID from the URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id); // Fetch movie details from backend
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  // Show a spinner while the movie details are loading
  if (!movie) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p="6" maxW="800px" mx="auto">
      <Heading as="h1" mb="4">{movie.title}</Heading>
      <Text fontWeight="bold">Directed by {movie.director}</Text>
      <Text mb="4">Release Year: {movie.releaseYear}</Text>
      <Text mb="4">Genre: {movie.genre.join(', ')}</Text>
      <Text mb="6">Summary: {movie.summary}</Text>

      {movie.posterUrl && (
        <Image src={movie.posterUrl} alt={`${movie.title} Poster`} mb="6" />
      )}

      {movie.trailerUrl && (
        <Box position="relative" pb="56.25%" height="0" overflow="hidden" mb="6">
          <iframe
            width="100%"
            height="100%"
            src={movie.trailerUrl}
            title="Movie Trailer"
            style={{ position: 'absolute', top: 0, left: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>
      )}

      <Box mt="6">
        <Heading as="h2" size="lg">Reviews</Heading>
        {movie.reviews && movie.reviews.length > 0 ? (
          movie.reviews.map((review) => (
            <Box key={review._id} mt="4">
              <Text>{review.content}</Text>
              <Text>Rating: {review.rating}/10</Text>
              <Text>By {review.userName}</Text>
            </Box>
          ))
        ) : (
          <Text>No reviews yet for this movie.</Text>
        )}
      </Box>
    </Box>
  );
}

export default MovieDetailPage;
