import { useState, useEffect } from 'react';
import { getReviews, deleteReview } from '../../services/reviewService';
import { Box, Button, Text } from '@chakra-ui/react';

function ReviewManagementPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, []);
  const handleApprove = async (id) => {
    try {
      await approveReview(id);
      setReviews(reviews.map((review) => review._id === id ? { ...review, isApproved: true } : review));
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <Box>
      <h1>Manage Reviews</h1>
      {reviews.map((review) => (
        <Box key={review._id} mb="4">
          <Text>{review.content}</Text>
          <Text>{review.rating}/10</Text>
          <Text>Movie: {review.movieId.title}</Text>
          <Text>User: {review.userId.firstName} {review.userId.lastName}</Text>
          {!review.isApproved && (
            <Button onClick={() => handleApprove(review._id)} colorScheme="green" mr="2">Approve</Button>
          )}
          <Button onClick={() => handleDelete(review._id)} colorScheme="red">Reject</Button>
        </Box>
      ))}
    </Box>
  );
}

export default ReviewManagementPage;
