import React from 'react';

const DematAccountSection = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex max-w-4xl justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 lg:p-12 text-center max-w-6xl w-full">
        <div className="flex items-center justify-center mb-6">
          <img src="/logo.png" alt="Bluestock Logo" className="h-12 mr-4" />
          <span className="text-4xl font-extrabold text-gray-800">BLUESTOCK</span>
        </div>
        <h2 className="text-md lg:text-3xl font-bold text-gray-800 mb-6">Applying for this IPO?</h2>
        <p className="text-sm text-gray-600 mb-10 max-w-2xl mx-auto text-justify">The way you compare & invest in only the best IPO, let us help you get started by comparing and selecting the best Demat account. Open your Demat account now to apply for your favourite IPO.</p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-14 py-2 rounded-lg text-md transition-colors duration-200 mt-2">Open a Demat Account</button>
      </div>
    </div>
  );
};

export default DematAccountSection; 