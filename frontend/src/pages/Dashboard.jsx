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
          </div>

          {/* Quick Links */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h3>
          </div>

          {/* Main Board IPO */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Main Board IPO</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;