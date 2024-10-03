import { useState, useEffect } from 'react';
import { getMovies } from '../../services/movieService';
import { Box, Button, SimpleGrid, Text } from '@chakra-ui/react';

function MovieListPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const { movies, totalMovies } = await getMovies(page);
        setMovies(movies);
        setTotalMovies(totalMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page]);

  const totalPages = Math.ceil(totalMovies / 10);

  return (
    <Box>
      <SimpleGrid columns={[1, 2, 3]} spacing="6">
        {movies.map((movie) => (
          <Box key={movie._id}>
            <Text>{movie.title}</Text>
          </Box>
        ))}
      </SimpleGrid>

      <Box mt="4" textAlign="center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <Button
            key={num}
            onClick={() => setPage(num)}
            variant={num === page ? 'solid' : 'outline'}
            mx="2"
          >
            {num}
          </Button>
        ))}
      </Box>

      {loading && <Text>Loading...</Text>}
    </Box>
  );
}

export default MovieListPage;
