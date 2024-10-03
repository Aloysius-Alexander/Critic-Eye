import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt="10">
      <Heading as="h1" size="xl" mb="6">Unauthorized</Heading>
      <Text>You do not have permission to view this page.</Text>
      <Button mt="4" colorScheme="teal" onClick={() => navigate('/')}>Go Back Home</Button>
    </Box>
  );
}

export default UnauthorizedPage;
