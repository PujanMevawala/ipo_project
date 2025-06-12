import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        {/* You can add more footer content here, e.g., links, copyright info */}
        <p>&copy; {new Date().getFullYear()} Bluestock. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 