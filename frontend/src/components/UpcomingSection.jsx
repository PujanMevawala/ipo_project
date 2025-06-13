import React from 'react';

const UpcomingSection = () => {
  const upcomingIpos = [
    {
      id: 1,
      logo: '/nova-agritech-logo.png', // Placeholder for logo
      name: 'Nova Agritech Ltd.',
      priceBand: 'Rs 39 - 41',
      openDate: '2024-01-22',
      closeDate: '2024-01-24',
      issueSize: '143.81 Cr.',
      issueType: 'Book Built',
      listingDate: '2024-01-30',
    },
    {
      id: 2,
      logo: '/epack-durable-logo.png', // Placeholder for logo
      name: 'EPACK Durable Ltd.',
      priceBand: 'Rs 218 - 230',
      openDate: '2024-01-19',
      closeDate: '2024-01-23',
      issueSize: '640.05 Cr.',
      issueType: 'Book Built',
      listingDate: '2024-01-29',
    },
    {
      id: 3,
      logo: '/rk-swamy-logo.png', // Placeholder for logo
      name: 'RK Swamy Ltd.',
      priceBand: 'Not Issued',
      openDate: 'Not Issued',
      closeDate: 'Not Issued',
      issueSize: 'Not Issued',
      issueType: 'Book Built',
      listingDate: 'Not Issued',
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="sm:text-xl text-gray-800 ">Upcoming</p>
        <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">View All</button>
      </div>
      <p className="text-gray-600 mb-16 text-sm sm:text-base mt-1">Companies that have filed for an IPO with SEBI. Raw details might be disclosed by the companies later on.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingIpos.map(ipo => (
          <IpoCard key={ipo.id} ipo={ipo} />
        ))}
      </div>
    </div>
  );
};

export const IpoCard = ({ ipo }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div className="mb-4">
        <h3 className={`text-lg sm:text-xl font-semibold ${ipo.priceBand === 'Not Issued' ? 'text-gray-800' : 'text-blue-600'}`}>{ipo.name}</h3>
        {ipo.logo && <img src={ipo.logo} alt={`${ipo.name} Logo`} className="h-8 mt-2" />}
      </div>
      <div className="grid grid-cols-2 gap-y-2 text-xs sm:text-sm text-gray-600 mb-6">
        <div><span className="text-gray-500">PRICE BAND</span><br /><span className="font-semibold">{ipo.priceBand}</span></div>
        <div><span className="text-gray-500">OPEN</span><br /><span className="font-semibold">{ipo.openDate}</span></div>
        <div><span className="text-gray-500">ISSUE SIZE</span><br /><span className="font-semibold">{ipo.issueSize}</span></div>
        <div><span className="text-gray-500">CLOSE</span><br /><span className="font-semibold">{ipo.closeDate}</span></div>
        <div><span className="text-gray-500">ISSUE TYPE</span><br /><span className="font-semibold">{ipo.issueType}</span></div>
        <div><span className="text-gray-500">LISTING DATE</span><br /><span className="font-semibold">{ipo.listingDate}</span></div>
      </div>
      <div className="flex space-x-3">
        <button className={`flex-1 border border-gray-300 px-3 sm:px-4 py-2 rounded-md text-sm ${ipo.priceBand === 'Not Issued' ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-700'}`}>RHP</button>
        <button className={`flex-1 border border-gray-300 px-3 sm:px-4 py-2 rounded-md text-sm ${ipo.closeDate === 'Not Issued' ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-700'}`}>DRHP</button>
      </div>
    </div>
  );
};

export default UpcomingSection; 