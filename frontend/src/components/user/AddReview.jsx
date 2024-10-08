import { Box, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

const AddReview = ({ movieId }) => {
  const [rating, setRating] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/user/add-review', { movieId, rating, content });
      console.log('Review added:', response.data);
    } catch (error) {
      console.error('Failed to add review:', error);
    }
  };

  return (
    <Box className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit}>
        <Input placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} className="mb-4" />
        <Input placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} className="mb-4" />
        <Button type="submit" colorScheme="teal" className="w-full">
          Add Review
        </Button>
      </form>
    </Box>
  );
};

export default AddReview;
