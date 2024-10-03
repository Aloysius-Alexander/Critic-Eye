import React from 'react';
import Navbar from '../components/navbars/Navbar'; // Import the Navbar

function UserLayout({ children }) {
  return (
    <div>
      <Navbar /> {/* Add the Navbar here */}
      <main>{children}</main>
    </div>
  );
}

export default UserLayout;
