import React from 'react';

const NewListedSection = () => {
  const newListedIpos = [
    {
      id: 1,
      logo: '/jyoti-cnc-logo.png', // Placeholder for logo
      name: 'Jyoti CNC Automation Ltd.',
      ipoPrice: 'Rs 331',
      listingPrice: 'Rs 370',
      listingGain: '11.78%',
      listingDate: '2024-01-16',
      cmp: 'Rs 455.75',
      currentReturn: '37.69%',
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">New Listed</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">View All</button>
      </div>
      <p className="text-gray-600 mb-6">Companies that have been listed recently through an IPO. Find their listing gains and returns here.</p>

      <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
        {newListedIpos.map(ipo => (
          <NewListedCard key={ipo.id} ipo={ipo} />
        ))}
      </div>
    </div>
  );
};

const NewListedCard = ({ ipo }) => {
  return (
    <div className="flex-none w-80 bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <img src={ipo.logo} alt={`${ipo.name} Logo`} className="h-12 mr-4" />
        <h3 className="text-xl font-semibold text-gray-800">{ipo.name}</h3>
      </div>
      <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 mb-6">
        <div><span className="font-medium">IPO PRICE</span><br />{ipo.ipoPrice}</div>
        <div><span className="font-medium">LISTING PRICE</span><br />{ipo.listingPrice}</div>
        <div><span className="font-medium">LISTING GAIN</span><br />{ipo.listingGain}</div>
        <div><span className="font-medium">LISTING DATE</span><br />{ipo.listingDate}</div>
        <div><span className="font-medium">CMP</span><br />{ipo.cmp}</div>
        <div><span className="font-medium">CURRENT RETURN</span><br />{ipo.currentReturn}</div>
      </div>
      <div className="flex space-x-3">
        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100">RHP</button>
        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100">DRHP</button>
      </div>
    </div>
  );
};

export default NewListedSection; 