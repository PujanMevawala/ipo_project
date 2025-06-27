import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PAGE_SIZE = 10;

const statusBadge = (status) => {
  if (status === 'Ongoing' || status === 'Open') return <span className="bg-green-50 text-green-600 border border-green-200 px-4 py-1 rounded-full text-xs font-medium min-w-[90px] flex justify-center">Ongoing</span>;
  if (status === 'Upcoming' || status === 'Comming') return <span className="bg-yellow-50 text-yellow-600 border border-yellow-200 px-4 py-1 rounded-full text-xs font-medium min-w-[90px] flex justify-center">Comming</span>;
  if (status === 'Listed' || status === 'New Listed') return <span className="bg-red-50 text-red-500 border border-red-200 px-4 py-1 rounded-full text-xs font-medium min-w-[90px] flex justify-center">New Listed</span>;
  return <span className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-xs font-medium min-w-[90px] flex justify-center">{status}</span>;
};

function ManageIPO() {
  const navigate = useNavigate();
  const [ipos, setIpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewIpo, setViewIpo] = useState(null);
  const [editIpo, setEditIpo] = useState(null);
  const [deleteIpo, setDeleteIpo] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5001/api/ipos')
      .then(res => setIpos(res.data))
      .catch(() => setError('Failed to fetch IPOs'))
      .finally(() => setLoading(false));
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(ipos.length / PAGE_SIZE);
  const paginatedIpos = ipos.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Handlers
  const handleEdit = (ipo) => {
    navigate('/ipo-information', { state: { ipo } });
  };
  const handleDelete = (ipo) => setDeleteIpo(ipo);
  const handleView = (ipo) => setViewIpo(ipo);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Update IPO
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`http://localhost:5001/api/ipos/${editIpo.ipo_id}`, editForm);
      setIpos(ipos.map(i => i.ipo_id === editIpo.ipo_id ? { ...i, ...editForm } : i));
      setEditIpo(null);
    } catch (err) {
      alert('Failed to update IPO');
    } finally {
      setSaving(false);
    }
  };

  // Delete IPO
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/ipos/${deleteIpo.ipo_id}`);
      setIpos(ipos.filter(i => i.ipo_id !== deleteIpo.ipo_id));
      setDeleteIpo(null);
    } catch (err) {
      alert('Failed to delete IPO');
    }
  };

  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto px-6 py-8 font-sora">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold text-[#232323] tracking-tight text-left w-full sm:w-auto">Upcomming IPO | Dashboard</h2>
          <button className="bg-white border border-[#5B6FFF] text-[#5B6FFF] px-5 py-2 rounded-lg font-semibold shadow-sm hover:bg-[#5B6FFF] hover:text-white transition-all duration-200 text-sm" onClick={() => navigate('/ipo-information')}>Register IPO</button>
        </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto border border-gray-100">
          <table className="min-w-full text-sm font-medium">
            <thead className="bg-[#F8F9FB]">
              <tr>
                <th className="px-6 py-4 text-left text-[#232323] font-semibold">Company</th>
                <th className="px-6 py-4 text-left text-[#232323] font-semibold">Price Band</th>
                <th className="px-6 py-4 text-left text-[#232323] font-semibold">Open</th>
                <th className="px-6 py-4 text-left text-[#232323] font-semibold">Close</th>
                <th className="px-6 py-4 text-left text-[#232323] font-semibold">ISSUE SIZE</th>
                <th className="px-6 py-4 text-left text-[#232323] font-semibold">ISSUE Type</th>
                <th className="px-6 py-4 text-left text-[#232323] font-semibold">Listing Date</th>
                <th className="px-6 py-4 text-left text-[#232323] font-semibold">Status</th>
                <th className="px-6 py-4 text-center text-[#232323] font-semibold">Action</th>
                <th className="px-6 py-4 text-center text-[#232323] font-semibold">Delete/View</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="10" className="text-center py-8 text-gray-400">Loading...</td></tr>
              ) : error ? (
                <tr><td colSpan="10" className="text-center py-8 text-red-400">{error}</td></tr>
              ) : paginatedIpos.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-8 text-gray-400">No IPO data available. Please add IPOs.</td>
                </tr>
              ) : (
                paginatedIpos.map((row, idx) => (
                  <tr key={row.ipo_id} className={idx % 2 === 0 ? 'bg-[#f0f0f5]' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-[#232323]">{row.Company ? row.Company.company_name : '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.price_band}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.open_date ? row.open_date.substring(0, 10) : ''}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.close_date ? row.close_date.substring(0, 10) : ''}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.issue_size}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.issue_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.listing_date ? row.listing_date.substring(0, 10) : ''}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{statusBadge(row.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button title="Update" onClick={() => handleEdit(row)} className="bg-[#5B6FFF] text-white px-6 py-2 rounded-lg font-semibold text-sm shadow hover:bg-[#3a4fd9] transition-all duration-200">Update</button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center gap-4">
                      <button title="Delete" onClick={() => handleDelete(row)} className="text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 011 1v2H9V4a1 1 0 011-1z" />
                        </svg>
                      </button>
                      <button title="View" onClick={() => handleView(row)} className="text-gray-500 hover:text-[#5B6FFF]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-end mt-6">
            <nav className="inline-flex items-center space-x-1">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1 rounded-l border border-gray-300 bg-white text-gray-500 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}>&lt;</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 border-t border-b border-gray-300 ${currentPage === i + 1 ? 'bg-[#5B6FFF] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1 rounded-r border border-gray-300 bg-white text-gray-500 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}>&gt;</button>
            </nav>
          </div>
        )}

        {/* View Modal */}
        {viewIpo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-0 relative">
              <button onClick={() => setViewIpo(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl p-2 leading-none">&times;</button>
              <div className="flex flex-col items-center pt-8 pb-2 px-8">
                {viewIpo.Company?.company_logo && (
                  <img src={viewIpo.Company.company_logo.startsWith('http') ? viewIpo.Company.company_logo : `http://localhost:5001${viewIpo.Company.company_logo}`} alt={viewIpo.Company.company_name} className="h-16 w-16 rounded-full object-cover border mb-3" />
                )}
                <h2 className="text-2xl font-bold text-blue-700 mb-1 text-center">{viewIpo.Company?.company_name || '-'}</h2>
                <span className="text-gray-500 text-sm mb-4">IPO Details</span>
              </div>
              <div className="px-8 pb-8">
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div><span className="text-gray-500">Price Band:</span> <span className="font-semibold">{viewIpo.price_band}</span></div>
                  <div><span className="text-gray-500">Open Date:</span> <span className="font-semibold">{viewIpo.open_date?.substring(0,10)}</span></div>
                  <div><span className="text-gray-500">Close Date:</span> <span className="font-semibold">{viewIpo.close_date?.substring(0,10)}</span></div>
                  <div><span className="text-gray-500">Issue Size:</span> <span className="font-semibold">{viewIpo.issue_size}</span></div>
                  <div><span className="text-gray-500">Issue Type:</span> <span className="font-semibold">{viewIpo.issue_type}</span></div>
                  <div><span className="text-gray-500">Listing Date:</span> <span className="font-semibold">{viewIpo.listing_date?.substring(0,10)}</span></div>
                  <div><span className="text-gray-500">Status:</span> <span className="font-semibold">{viewIpo.status}</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {deleteIpo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative">
              <button onClick={() => setDeleteIpo(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl p-2 leading-none">&times;</button>
              <h2 className="text-xl font-bold text-red-600 mb-4">Delete IPO</h2>
              <p className="mb-6">Are you sure you want to delete <span className="font-semibold">{deleteIpo.Company?.company_name}</span> IPO?</p>
              <div className="flex justify-end gap-2">
                <button onClick={() => setDeleteIpo(null)} className="px-4 py-2 rounded bg-gray-200 text-gray-700">Cancel</button>
                <button onClick={confirmDelete} className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ManageIPO; 