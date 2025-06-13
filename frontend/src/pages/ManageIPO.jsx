import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

function ManageIPO() {
  const ipoData = [
    {
      company: 'Adani Power',
      priceBand: '₹ 329 - 136',
      open: '2023-06-03',
      close: '2024-06-05',
      issueSize: '45530.15 Cr.',
      issueType: 'Book Built',
      listingDate: '2023-06-10',
      status: 'Ongoing',
    },
    {
      company: 'VBL LTD',
      priceBand: '₹ 229 - 136',
      open: '2023-06-03',
      close: '2024-06-05',
      issueSize: '1330.15 Cr.',
      issueType: 'Book Built',
      listingDate: '2018-06-10',
      status: 'Commimg',
    },
    {
      company: 'Tata Motor',
      priceBand: '₹ 12549 - 136',
      open: '2024-06-03',
      close: '2024-06-05',
      issueSize: '1340.15 Cr.',
      issueType: 'Book Built',
      listingDate: '2016-06-10',
      status: 'New Listed',
    },
    {
      company: 'HDFC LTD',
      priceBand: '₹ 1244 - 136',
      open: '2024-06-03',
      close: '2024-06-05',
      issueSize: '830.15 Cr.',
      issueType: 'Book Built',
      listingDate: '2029-06-11',
      status: 'Commimg',
    },
    {
      company: 'Tata Motor',
      priceBand: '₹ 629 - 136',
      open: '2024-06-01',
      close: '2024-06-05',
      issueSize: '820.15 Cr.',
      issueType: 'Book Built',
      listingDate: '2023-06-10',
      status: 'Ongoing',
    },
    {
      company: 'VBL LTD',
      priceBand: '₹ 629 - 136',
      open: '2024-06-03',
      close: '2024-06-05',
      issueSize: '130.15 Cr.',
      issueType: 'Book Built',
      listingDate: '2024-06-10',
      status: 'Commimg',
    },
    {
      company: 'Tata Motor',
      priceBand: '₹ 6729 - 136',
      open: '2024-06-03',
      close: '2024-06-05',
      issueSize: '170.15 Cr.',
      issueType: 'Book Built',
      listingDate: '2027-06-10',
      status: 'New Listed',
    },
    {
      company: 'VBL LTD',
      priceBand: '₹ 1629 - 136',
      open: '2024-06-03',
      close: '2024-06-05',
      issueSize: '130.15 Cr.',
      issueType: 'Book Built',
      listingDate: '2022-06-10',
      status: 'Commimg',
    },
    {
      company: 'Tata Motor',
      priceBand: '₹ 2529 - 136',
      open: '2024-06-03',
      close: '2024-06-05',
      issueSize: '130.15 Cr.',
      issueType: 'Book Built',
      listingDate: '2023-06-10',
      status: 'New Listed',
    },
    {
      company: 'VBL LTD',
      priceBand: '₹ 329 - 136',
      open: '2024-06-03',
      close: '2024-06-05',
      issueSize: '130.15 Cr.',
      issueType: 'Book Built',
      listingDate: '2021-06-10',
      status: 'Commimg',
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Upcoming IPO | Dashboard</h2>
        <div className="flex justify-end mb-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Register IPO
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price Band
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Open
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Close
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ISSUE SIZE
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ISSUE Type
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Listing Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Delete/View
                </th>
              </tr>
            </thead>
            <tbody>
              {ipoData.map((ipo, index) => (
                <tr key={index}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {ipo.company}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {ipo.priceBand}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {ipo.open}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {ipo.close}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {ipo.issueSize}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {ipo.issueType}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {ipo.listingDate}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className={`relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight ${ipo.status === 'Ongoing' ? 'bg-green-200' : ipo.status === 'New Listed' ? 'bg-blue-200' : 'bg-yellow-200'} rounded-full`}
                    >
                      {ipo.status}
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-3 rounded text-xs">
                      Update
                    </button>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button className="text-red-600 hover:text-red-900 mr-2">🗑️</button>
                    <Link to="/ipo-information" className="text-blue-600 hover:text-blue-900">👁️</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
            <span className="text-xs xs:text-sm text-gray-900">
              Showing 1 to 10 of 50 Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                Prev
              </button>
              <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ManageIPO; 