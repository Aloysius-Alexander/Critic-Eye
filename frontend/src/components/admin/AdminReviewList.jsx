import { Box, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/v1/admin/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <Box className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl mb-6">Review List</h2>
      {reviews.map((review) => (
        <Box key={review._id} className="mb-4 p-4 border border-gray-200 rounded">
          <p>{review.content}</p>
          <p>Rating: {review.rating}</p>
          <Button colorScheme="green" className="mt-2">Approve</Button>
          <Button colorScheme="red" className="mt-2 ml-2">Reject</Button>
        </Box>
      ))}
    </Box>
  );
};

export default AdminReviewList;
