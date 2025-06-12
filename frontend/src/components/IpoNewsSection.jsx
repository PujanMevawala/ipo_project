import React from 'react';

const IpoNewsSection = () => {
  const newsItems = [
    {
      id: 1,
      title: 'Brainbees Solutions files DRHP with SEBI',
      date: '29 Dec, 2:48PM',
    },
    {
      id: 2,
      title: 'Gretex Share Broking files DRHP with SEBI',
      date: '22 Dec, 2:47PM',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">IPO News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {newsItems.map(news => (
          <div key={news.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{news.title}</h3>
            <p className="text-sm text-gray-500">{news.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IpoNewsSection; 