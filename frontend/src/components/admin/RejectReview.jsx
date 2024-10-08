import { Button } from '@chakra-ui/react';
import axios from 'axios';

const RejectReview = ({ reviewId, onReject }) => {
  const handleReject = async () => {
    try {
      const response = await axios.delete(`/api/v1/admin/review/${reviewId}/reject`);
      onReject(reviewId);
      console.log('Review rejected and deleted:', response.data);
    } catch (error) {
      console.error('Failed to reject review:', error);
    }
  };

  return (
    <Button colorScheme="red" onClick={handleReject}>
      Reject Review
    </Button>
  );
};

export default RejectReview;
