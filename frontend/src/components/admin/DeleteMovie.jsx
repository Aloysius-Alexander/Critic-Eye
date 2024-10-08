import { Box, Button } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/v1/admin/delete-movie/${id}`);
      navigate('/admin/movies');  // Redirect to movie list after deletion
    } catch (error) {
      console.error('Failed to delete movie:', error);
    }
  };

  return (
    <Box className="max-w-md mx-auto mt-10">
      <Button colorScheme="red" onClick={handleDelete}>
        Delete Movie
      </Button>
    </Box>
  );
};

export default DeleteMovie;
