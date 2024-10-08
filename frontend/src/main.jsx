import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the new API
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';

// Find the root element in the DOM
const rootElement = document.getElementById('root');

// Create a React root using the new createRoot API
const root = ReactDOM.createRoot(rootElement);

// Render the App component
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
