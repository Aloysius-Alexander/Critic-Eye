import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes';
import AuthProvider from './context/AuthContext'; // Import AuthProvider
import './styles/index.css'; // Tailwind CSS entry point

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);
