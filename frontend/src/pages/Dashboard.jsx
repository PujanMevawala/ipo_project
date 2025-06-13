import React from 'react';
import Layout from '../components/Layout';

function Dashboard() {
  return (
    <Layout>
      <div className="container mx-auto p-8 pt-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* IPO Dashboard India */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">IPO Dashboard India</h3>
            <p className="text-green-500 mb-6 text-sm font-medium">↑ 20 IPO in Gain</p>
            <div className="flex justify-around items-center w-full max-w-sm">
              <div className="relative flex flex-col items-center justify-center p-2" style={{ width: '120px', height: '120px' }}>
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-center text-purple-800 font-bold" style={{ backgroundColor: '#E0E7FF', border: '2px solid #A78BFA' }}>
                  <span className="text-2xl">9</span><br/>
                  <span className="text-xs">IPO in Loss</span>
                </div>
              </div>
              <div className="relative flex flex-col items-center justify-center p-2" style={{ width: '150px', height: '150px' }}>
                <div className="w-32 h-32 rounded-full flex items-center justify-center text-center text-orange-800 font-bold" style={{ backgroundColor: '#FFEDD5', border: '2px solid #FB923C' }}>
                  <span className="text-4xl">30</span><br/>
                  <span className="text-sm">Total IPO</span>
                </div>
              </div>
              <div className="relative flex flex-col items-center justify-center p-2" style={{ width: '130px', height: '130px' }}>
                <div className="w-28 h-28 rounded-full flex items-center justify-center text-center text-blue-800 font-bold" style={{ backgroundColor: '#DBEAFE', border: '2px solid #3B82F6' }}>
                  <span className="text-3xl">20</span><br/>
                  <span className="text-xs">IPO in Gain</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h3>
            <p className="text-gray-600 mb-4 text-sm">Adipisicing elit, sed do eiusmod tempor</p>
            <ul>
              <li className="flex items-center py-3 border-b border-gray-200 last:border-b-0">
                <img src="/nse-india.svg" alt="NSE India" className="w-8 h-8 mr-4" />
                <span className="text-gray-800 font-medium">NSE India</span>
                <a href="#" className="ml-auto text-blue-500 hover:underline text-sm">Visit Now</a>
              </li>
              <li className="flex items-center py-3 border-b border-gray-200 last:border-b-0">
                <img src="/bse-india.svg" alt="BSE India" className="w-8 h-8 mr-4" />
                <span className="text-gray-800 font-medium">BSE India</span>
                <a href="#" className="ml-auto text-blue-500 hover:underline text-sm">Visit Now</a>
              </li>
              <li className="flex items-center py-3 border-b border-gray-200 last:border-b-0">
                <img src="/sebi.svg" alt="SEBI" className="w-8 h-8 mr-4" />
                <span className="text-gray-800 font-medium">SEBI</span>
                <a href="#" className="ml-auto text-blue-500 hover:underline text-sm">Visit Now</a>
              </li>
              <li className="flex items-center py-3">
                <img src="/money-control.svg" alt="Money Control" className="w-8 h-8 mr-4" />
                <span className="text-gray-800 font-medium">Money Control</span>
                <a href="#" className="ml-auto text-blue-500 hover:underline text-sm">Visit Now</a>
              </li>
            </ul>
          </div>

          {/* Main Board IPO */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Main Board IPO</h3>
            <div className="flex justify-between items-center w-full mb-4">
              <p className="text-gray-600 text-sm">From 01 Jan 2024</p>
              <button className="bg-gray-100 text-gray-700 text-sm py-1 px-3 rounded-md hover:bg-gray-200 border border-gray-200">View Report</button>
            </div>
            <div className="relative w-48 h-48 flex items-center justify-center mb-4">
              {/* Donut Chart - approximated with conic-gradient for styling */}
              <div className="absolute w-full h-full rounded-full" style={{ background: 'conic-gradient(#5C6BC0 0% 40%, #9FA8DA 40% 70%, #C5CAE9 70% 100%)' }}></div>
              <div className="absolute w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-inner">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Afternoon</p>
                  <p className="font-bold text-gray-800 text-sm">IPO NSE & BSE</p>
                  <p className="text-3xl font-bold text-indigo-700">15</p>
                </div>
              </div>
            </div>
            <div className="flex justify-around w-full text-xs font-medium">
              <span className="flex items-center text-gray-700"><span className="w-2 h-2 bg-indigo-600 rounded-full mr-1"></span>Upcoming<br/>15</span>
              <span className="flex items-center text-gray-700"><span className="w-2 h-2 bg-indigo-400 rounded-full mr-1"></span>New Listed<br/>25</span>
              <span className="flex items-center text-gray-700"><span className="w-2 h-2 bg-indigo-200 rounded-full mr-1"></span>Ongoing<br/>2</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard; 