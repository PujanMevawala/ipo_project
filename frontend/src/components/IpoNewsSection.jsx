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
    <div className="container px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">IPO News</h2> 
          {newsItems.map((news, index) => (
            <div key={news.id} className={`${index > 0 ? 'mt-2 pt-3' : ''}`}>
              <h3 className="text-sm font-semibold text-gray-800">{news.title}</h3>
              <p className="text-xs text-gray-500">{news.date}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default IpoNewsSection; 