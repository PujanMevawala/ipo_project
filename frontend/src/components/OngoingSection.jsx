import React from 'react';
import { IpoCard } from './UpcomingSection'; // Reusing IpoCard

const OngoingSection = () => {
  const ongoingIpos = [
    {
      id: 1,
      logo: '/medi-assist-logo.png', // Placeholder for logo
      name: 'Medi Assist Healthcare Services Ltd. IPO',
      priceBand: 'Rs 218 - 230',
      openDate: '2024-01-19',
      closeDate: '2024-01-23',
      issueSize: '640.05 Cr.',
      issueType: 'Book Built',
      listingDate: '2024-01-29',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Ongoing</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">View All</button>
      </div>
      <p className="text-gray-600 mb-6">Companies where the IPO investment process is started and will be listed soon in the stock market for regular trading.</p>

      <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
        {ongoingIpos.map(ipo => (
          <IpoCard key={ipo.id} ipo={ipo} />
        ))}
      </div>
    </div>
  );
};

export default OngoingSection; 