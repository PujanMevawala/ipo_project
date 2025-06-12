import React from 'react';

const IpoAnalysisSection = () => {
  const analysisItems = [
    {
      id: 1,
      title: 'Euphoria Infotech India coming with IPO to raise upto Rs 9.60 crore',
      date: '18 Jan, 3:26PM',
    },
    {
      id: 2,
      title: 'EPACK Durable coming with IPO to raise upto Rs 662 crore',
      date: '17 Jan, 4:52PM',
    },
    {
      id: 3,
      title: 'Qualitek Labs coming with IPO to raise Rs 19.64 crore',
      date: '17 Jan, 3:35PM',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">IPO Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {analysisItems.map(analysis => (
          <div key={analysis.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{analysis.title}</h3>
            <p className="text-sm text-gray-500">{analysis.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IpoAnalysisSection; 