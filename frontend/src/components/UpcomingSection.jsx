import React, { useState } from 'react';
import { IPO_DATA } from '../constants/ipoData';

const sectors = [...new Set(IPO_DATA.map(ipo => ipo.sector))].filter(Boolean);

const UpcomingSection = () => {
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [selectedIpo, setSelectedIpo] = useState(null);

  // Filter IPOs by search and sector
  const filteredIpos = IPO_DATA.filter(ipo => {
    const matchesSearch = ipo.name.toLowerCase().includes(search.toLowerCase());
    const matchesSector = sector ? ipo.sector === sector : true;
    return matchesSearch && matchesSector;
  });

  // Show only 3 IPOs by default
  const visibleIpos = showAll ? filteredIpos : filteredIpos.slice(0, 3);

  return (
    <div className="container mx-auto px-2 sm:px-4 pt-2 pb-6">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
        <h2 className="text-lg sm:text-xl text-gray-800 font-bold mb-1 sm:mb-0">Upcoming IPOs</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
            aria-label="Search IPOs"
          />
          <select
            value={sector}
            onChange={e => setSector(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-40"
            aria-label="Filter by sector"
          >
            <option value="">All Sectors</option>
            {sectors.map(sec => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-gray-600 mb-4 sm:mb-8 text-xs sm:text-base mt-0">Companies that have filed for an IPO with SEBI. Raw details might be disclosed by the companies later on.</p>

      {/* IPO Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {visibleIpos.map(ipo => (
          <IpoCard key={ipo.id} ipo={ipo} onApply={() => setSelectedIpo(ipo)} />
        ))}
      </div>

      {/* View More Button */}
      {filteredIpos.length > 3 && (
        <div className="flex justify-center mt-6 sm:mt-8">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold"
            onClick={() => setShowAll(!showAll)}
            aria-expanded={showAll}
          >
            {showAll ? 'View Less' : 'View More'}
          </button>
        </div>
      )}

      {/* IPO Detail Modal */}
      {selectedIpo && (
        <IpoDetailModal ipo={selectedIpo} onClose={() => setSelectedIpo(null)} />
      )}
    </div>
  );
};

// IPO Card Component
export const IpoCard = ({ ipo, onApply }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex flex-col h-full">
      <div className="mb-4 flex items-center gap-2">
        {ipo.logo && <img src={ipo.logo} alt={`${ipo.name} Logo`} className="h-8 w-8 object-contain" />}
        <h3 className={`text-lg sm:text-xl font-semibold ${ipo.priceBand === 'Not Issued' ? 'text-gray-800' : 'text-blue-600'}`}>{ipo.name}</h3>
      </div>
      <div className="grid grid-cols-3 gap-y-2 text-xs sm:text-sm text-gray-600 mb-4">
        <div><span className="text-gray-500">OPEN</span><br /><span className="font-semibold">{ipo.openDate}</span></div>
        <div><span className="text-gray-500">CLOSE</span><br /><span className="font-semibold">{ipo.closeDate}</span></div>
        <div><span className="text-gray-500">PRICE BAND</span><br /><span className="font-semibold">{ipo.priceBand}</span></div>
        <div><span className="text-gray-500">LOT SIZE</span><br /><span className="font-semibold">{ipo.lotSize}</span></div>
        <div><span className="text-gray-500">ISSUE SIZE</span><br /><span className="font-semibold">{ipo.issueSize}</span></div>
        <div><span className="text-gray-500">SECTOR</span><br /><span className="font-semibold">{ipo.sector}</span></div>
      </div>
      <div className="flex space-x-3 mb-2">
        <a
          href={ipo.rhpLink}
          className={`flex-1 border border-gray-300 px-3 sm:px-4 py-2 rounded-md text-sm text-center ${ipo.priceBand === 'Not Issued' ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-700'}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View RHP for ${ipo.name}`}
        >
          RHP
        </a>
        <a
          href={ipo.drhpLink}
          className={`flex-1 border border-gray-300 px-3 sm:px-4 py-2 rounded-md text-sm text-center ${ipo.closeDate === 'Not Issued' ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-700'}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View DRHP for ${ipo.name}`}
        >
          DRHP
        </a>
      </div>
      <button
        className="mt-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-green-400"
        aria-label={`Apply for ${ipo.name}`}
        onClick={onApply}
      >
        Apply Now
      </button>
    </div>
  );
};

// IPO Detail Modal
const IpoDetailModal = ({ ipo, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl p-2 leading-none"
        aria-label="Close details"
      >&times;</button>
      <div className="flex items-center gap-4 mb-4">
        {ipo.logo && <img src={ipo.logo} alt={`${ipo.name} Logo`} className="h-12 w-12 object-contain" />}
        <h2 className="text-2xl font-bold text-blue-700">{ipo.name}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div><span className="text-gray-500">Open Date:</span> <span className="font-semibold">{ipo.openDate}</span></div>
        <div><span className="text-gray-500">Close Date:</span> <span className="font-semibold">{ipo.closeDate}</span></div>
        <div><span className="text-gray-500">Price Band:</span> <span className="font-semibold">{ipo.priceBand}</span></div>
        <div><span className="text-gray-500">Lot Size:</span> <span className="font-semibold">{ipo.lotSize}</span></div>
        <div><span className="text-gray-500">Issue Size:</span> <span className="font-semibold">{ipo.issueSize}</span></div>
        <div><span className="text-gray-500">Sector:</span> <span className="font-semibold">{ipo.sector}</span></div>
        <div><span className="text-gray-500">Listing Date:</span> <span className="font-semibold">{ipo.listingDate}</span></div>
        <div><span className="text-gray-500">Issue Type:</span> <span className="font-semibold">{ipo.issueType}</span></div>
      </div>
      <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-green-400" aria-label={`Apply for ${ipo.name}`}>Apply Now</button>
    </div>
  </div>
);

export default UpcomingSection; 