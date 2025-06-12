import React from 'react';

const DematAccountSection = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl">
        <img src="/bluestock-logo.png" alt="Bluestock Logo" className="h-16 mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Applying for this IPO?</h2>
        <p className="text-lg text-gray-600 mb-6">The way you compare & invest in only the best IPO, let us help you get started by comparing and selecting the best Demat account. Open your Demat account now to apply for your favourite IPO.</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-semibold">Open a Demat Account</button>
      </div>
    </div>
  );
};

export default DematAccountSection; 