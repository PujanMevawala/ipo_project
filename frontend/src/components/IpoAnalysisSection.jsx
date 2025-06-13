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
       <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">IPO Analysis</h2>
       
          {analysisItems.map((analysis, index) => (
            <div key={analysis.id} className={`${index > 0 ? 'mt-2 pt-3 ' : ''}`}>
              <h3 className="text-sm font-semibold text-gray-800 ">{analysis.title}</h3>
              <p className="text-xs text-gray-500">{analysis.date}</p>
            </div>
          ))}
        </div>
    </div>
  );
};

export default IpoAnalysisSection; 