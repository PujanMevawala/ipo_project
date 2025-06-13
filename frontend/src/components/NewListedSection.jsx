import React from 'react';

const NewListedSection = () => {
  const newListedIpos = [
    {
      id: 1,
      logo: '/zomato-logo.png', // Placeholder for logo
      name: 'Zomato Ltd.',
      ipoPrice: 'Rs 76',
      listingPrice: 'Rs 115',
      listingGain: '51.32%',
      listingDate: '2021-07-23',
      cmp: 'Rs 142.75',
      currentReturn: '87.83%',
    },
    {
      id: 2,
      logo: '/innova-captab-logo.png', // Placeholder for logo
      name: 'Innova Captab Ltd.',
      ipoPrice: 'Rs 448',
      listingPrice: 'Rs 452.1',
      listingGain: '0.92%',
      listingDate: '2023-12-29',
      cmp: 'Rs 515',
      currentReturn: '14.96%',
    },
    {
      id: 3,
      logo: '/azad-engineering-logo.png', // Placeholder for logo
      name: 'Azad Engineering Ltd.',
      ipoPrice: 'Rs 524',
      listingPrice: 'Rs 720',
      listingGain: '37.4%',
      listingDate: '2023-12-28',
      cmp: 'Rs 663.25',
      currentReturn: '26.57%',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">New Listed</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">View All</button>
      </div>
      <p className="text-gray-600 mb-6 text-sm sm:text-base">Companies that have been listed recently through an IPO. Find their listing gains and returns here.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newListedIpos.map(ipo => (
          <NewListedCard key={ipo.id} ipo={ipo} />
        ))}
      </div>
    </div>
  );
};

const NewListedCard = ({ ipo }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <img src={ipo.logo} alt={`${ipo.name} Logo`} className="h-12 mr-4" />
        <h3 className="text-xl font-semibold text-blue-600">{ipo.name}</h3>
      </div>
      <div className="grid grid-cols-3 gap-y-2 text-sm text-gray-600 mb-6">
        <div><span className="text-gray-500">IPO PRICE</span><br /><span className="font-semibold text-gray-800">{ipo.ipoPrice}</span></div>
        <div><span className="text-gray-500">LISTING PRICE</span><br /><span className="font-semibold text-gray-800">{ipo.listingPrice}</span></div>
        <div><span className="text-gray-500">LISTING GAIN</span><br /><span className="font-semibold text-gray-800">{ipo.listingGain}</span></div>
        <div><span className="text-gray-500">LISTING DATE</span><br /><span className="font-semibold text-gray-800">{ipo.listingDate}</span></div>
        <div><span className="text-gray-500">CMP</span><br /><span className="font-semibold text-gray-800">{ipo.cmp}</span></div>
        <div><span className="text-gray-500">CURRENT RETURN</span><br /><span className="font-semibold text-gray-800">{ipo.currentReturn}</span></div>
      </div>
      <div className="flex space-x-3">
        <button className="flex-1 bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors">RHP</button>
        <button className="flex-1 bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors">DRHP</button>
      </div>
    </div>
  );
};

export default NewListedSection; 