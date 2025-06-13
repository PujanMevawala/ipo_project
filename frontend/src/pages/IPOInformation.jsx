import React from 'react';
import Layout from '../components/Layout';

function IPOInformation() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Upcoming IPO Information</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">IPO Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="company-logo" className="block text-gray-700 text-sm font-bold mb-2">Company Logo</label>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <img src="/vodafone-idea-logo.svg" alt="Company Logo" className="w-12 h-12" />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Upload Logo</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="company-name" className="block text-gray-700 text-sm font-bold mb-2">Company Name</label>
              <input type="text" id="company-name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="Vodafone Idea" readOnly />
            </div>
            <div className="mb-4">
              <label htmlFor="price-band" className="block text-gray-700 text-sm font-bold mb-2">Price Band</label>
              <input type="text" id="price-band" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="Not Issued" readOnly />
            </div>
            <div className="mb-4">
              <label htmlFor="open-date" className="block text-gray-700 text-sm font-bold mb-2">Open</label>
              <input type="text" id="open-date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="Not Issued" readOnly />
            </div>
            <div className="mb-4">
              <label htmlFor="close-date" className="block text-gray-700 text-sm font-bold mb-2">Close</label>
              <input type="text" id="close-date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="Not Issued" readOnly />
            </div>
            <div className="mb-4">
              <label htmlFor="issue-size" className="block text-gray-700 text-sm font-bold mb-2">Issue Size</label>
              <input type="text" id="issue-size" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="2300 Cr." readOnly />
            </div>
            <div className="mb-4">
              <label htmlFor="issue-type" className="block text-gray-700 text-sm font-bold mb-2">Issue Type</label>
              <input type="text" id="issue-type" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="Book Built" readOnly />
            </div>
            <div className="mb-4">
              <label htmlFor="listing-date" className="block text-gray-700 text-sm font-bold mb-2">Listing Date</label>
              <input type="text" id="listing-date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="Not Issued" readOnly />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Status</label>
              <input type="text" id="status" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="Not Listed" readOnly />
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4 mt-6">NEW LISTED IPO DETAILS (WHEN IPO GET LISTED)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="ipo-price" className="block text-gray-700 text-sm font-bold mb-2">IPO PRICE</label>
              <input type="text" id="ipo-price" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="₹ 383" readOnly />
            </div>
            <div className="mb-4">
              <label htmlFor="listing-price" className="block text-gray-700 text-sm font-bold mb-2">LISTING PRICE</label>
              <input type="text" id="listing-price" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="₹ 435" readOnly />
            </div>
            <div className="mb-4">
              <label htmlFor="listing-gain" className="block text-gray-700 text-sm font-bold mb-2">LISTING GAIN</label>
              <input type="text" id="listing-gain" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="13.58 %" readOnly />
            </div>
            <div className="mb-4">
              <label htmlFor="listing-date-new" className="block text-gray-700 text-sm font-bold mb-2">LISTING DATE</label>
              <input type="text" id="listing-date-new" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="2024-05-30" readOnly />
            </div>
            <div className="mb-4">
              <label htmlFor="cmp" className="block text-gray-700 text-sm font-bold mb-2">CMP</label>
              <input type="text" id="cmp" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="₹ 410" readOnly />
            </div>
            <div className="mb-4">
              <label htmlFor="current-return" className="block text-gray-700 text-sm font-bold mb-2">CURRENT RETURN</label>
              <input type="text" id="current-return" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="7.05 %" readOnly />
            </div>
            <div className="mb-4">
              <label htmlFor="rhp" className="block text-gray-700 text-sm font-bold mb-2">RHP</label>
              <input type="text" id="rhp" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter RHP PDF Link" />
            </div>
            <div className="mb-4">
              <label htmlFor="drhp" className="block text-gray-700 text-sm font-bold mb-2">DRHP</label>
              <input type="text" id="drhp" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter DRHP PDF Link" />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Register</button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default IPOInformation; 