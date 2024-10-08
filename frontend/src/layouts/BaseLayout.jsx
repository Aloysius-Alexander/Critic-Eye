import { Box } from '@chakra-ui/react';

const BaseLayout = ({ children }) => {
  return (
    <Box className="min-h-screen bg-gray-100">
      {/* Header */}
      <Box className="bg-teal-500 p-4">
        <h1 className="text-white text-xl">Critic Eye</h1>
      </Box>
      
      {/* Main Content */}
      <Box className="p-4">{children}</Box>
    </Box>
  );
};

export default BaseLayout;
