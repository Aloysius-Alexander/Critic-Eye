import { Button } from '@chakra-ui/react';
import axios from 'axios';

const ApproveReview = ({ reviewId, onApprove }) => {
  const handleApprove = async () => {
    try {
      const response = await axios.put(`/api/v1/admin/review/${reviewId}/approve`);
      onApprove(reviewId);
      console.log('Review approved:', response.data);
    } catch (error) {
      console.error('Failed to approve review:', error);
    }
  };

  return (
    <Button colorScheme="green" onClick={handleApprove}>
      Approve Review
    </Button>
  );
};

export default ApproveReview;
