import { Box, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddReview from './AddReview';

const MovieDetail = ({ movieId }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`/api/v1/user/movie/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (!movie) return <Text>Loading...</Text>;

  return (
    <Box className="max-w-4xl mx-auto mt-10">
      <Heading>{movie.title}</Heading>
      <Text>{movie.summary}</Text>
      <Text>Directed by: {movie.director}</Text>
      <Text>Release Year: {movie.releaseYear}</Text>

      <AddReview movieId={movie._id} />
    </Box>
  );
};

export default MovieDetail;
