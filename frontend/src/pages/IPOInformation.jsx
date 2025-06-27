import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function IPOInformation() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingIpo = location.state && location.state.ipo;
  const [form, setForm] = useState({
    company_name: '',
    price_band: '',
    open_date: '',
    close_date: '',
    issue_size: '',
    issue_type: '',
    listing_date: '',
    status: '',
    ipo_price: '',
    listing_price: '',
    listing_gain: '',
    cmp: '',
    current_return: '',
    rhp_pdf: '',
    drhp_pdf: '',
    exchange: 'NSE',
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Prefill form if editing
  useEffect(() => {
    if (editingIpo) {
      setForm({
        company_name: editingIpo.Company?.company_name || '',
        price_band: editingIpo.price_band || '',
        open_date: editingIpo.open_date ? editingIpo.open_date.substring(0, 10) : '',
        close_date: editingIpo.close_date ? editingIpo.close_date.substring(0, 10) : '',
        issue_size: editingIpo.issue_size || '',
        issue_type: editingIpo.issue_type || '',
        listing_date: editingIpo.listing_date ? editingIpo.listing_date.substring(0, 10) : '',
        status: editingIpo.status || '',
        ipo_price: editingIpo.ipo_price || '',
        listing_price: editingIpo.listing_price || '',
        listing_gain: editingIpo.listing_gain || '',
        cmp: editingIpo.current_market_price !== undefined && editingIpo.current_market_price !== null ? editingIpo.current_market_price : (editingIpo.cmp || ''),
        current_return: editingIpo.current_return || '',
        rhp_pdf: editingIpo.rhp_pdf || '',
        drhp_pdf: editingIpo.drhp_pdf || '',
        exchange: editingIpo.exchange || 'NSE',
      });
      if (editingIpo.Company?.company_logo) {
        const logoPath = editingIpo.Company.company_logo;
        setLogoPreview(logoPath.startsWith('http') ? logoPath : `http://localhost:5001${logoPath}`);
      }
    }
  }, [editingIpo]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    setLogoPreview(file ? URL.createObjectURL(file) : null);
  };

  const cleanNumber = (val) => {
    if (!val) return null;
    return parseFloat(val.replace(/[^0-9.]/g, '')) || null;
  };
  const cleanDate = (val) => {
    if (!val || val === 'Not Issued') return null;
    return val;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let logoPath = '';
      if (logoFile) {
        const data = new FormData();
        data.append('logo', logoFile);
        const uploadRes = await axios.post('http://localhost:5001/api/companies/upload-logo', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        logoPath = uploadRes.data.filePath;
      }
      let company_id;
      if (editingIpo) {
        company_id = editingIpo.Company.company_id;
        await axios.put(`http://localhost:5001/api/companies/${company_id}`, {
          company_name: form.company_name,
          company_logo: logoPath || editingIpo.Company.company_logo,
        });
        // Clean and send only expected fields
        await axios.put(`http://localhost:5001/api/ipos/${editingIpo.ipo_id}`, {
          price_band: form.price_band,
          open_date: cleanDate(form.open_date),
          close_date: cleanDate(form.close_date),
          issue_size: form.issue_size,
          issue_type: form.issue_type,
          listing_date: cleanDate(form.listing_date),
          status: form.status,
          ipo_price: cleanNumber(form.ipo_price),
          listing_price: cleanNumber(form.listing_price),
          listing_gain: cleanNumber(form.listing_gain),
          current_market_price: cleanNumber(form.cmp),
          current_return: cleanNumber(form.current_return),
        });
      } else {
        const companyRes = await axios.post('http://localhost:5001/api/companies', {
          company_name: form.company_name,
          company_logo: logoPath,
        });
        company_id = companyRes.data.company_id;
        await axios.post('http://localhost:5001/api/ipos', {
          company_id,
          price_band: form.price_band,
          open_date: cleanDate(form.open_date),
          close_date: cleanDate(form.close_date),
          issue_size: form.issue_size,
          issue_type: form.issue_type,
          listing_date: cleanDate(form.listing_date),
          status: form.status,
          ipo_price: cleanNumber(form.ipo_price),
          listing_price: cleanNumber(form.listing_price),
          listing_gain: cleanNumber(form.listing_gain),
          current_market_price: cleanNumber(form.cmp),
          current_return: cleanNumber(form.current_return),
        });
      }
      navigate('/manage-ipo');
    } catch (err) {
      setError('Failed to register IPO');
    } finally {
      setLoading(false);
    }
  };

  // NSE/BSE logo
  const exchangeLogo = form.exchange === 'NSE'
    ? '/nse-india.svg'
    : '/bse-india.svg';

  return (
    <Layout>
      <div className="flex justify-center bg-[#F6F7FB] font-sora min-h-screen">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl flex overflow-hidden">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-[#F6F7FB] border-r border-gray-200 py-8 px-6 flex flex-col gap-2">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-[#5B6FFF] font-bold text-lg mb-8">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#5B6FFF" strokeWidth="2" fill="white" /><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#5B6FFF" fontWeight="bold">IPO</text></svg>
                IPO Info
              </div>
              <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-[#E9EDFB] text-[#5B6FFF] font-semibold mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#5B6FFF" strokeWidth="2" fill="white" /><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#5B6FFF" fontWeight="bold">i</text></svg>
                IPO Information
              </button>
            </div>
          </div>
          {/* Main Form */}
          <div className="flex-1 p-12 overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="text-2xl font-bold text-[#232323] mb-1">IPO Information</h2>
                <span className="text-gray-500 text-sm">{editingIpo ? 'Update IPO Details' : 'Enter IPO Details'}</span>
              </div>
              <div className="flex gap-4">
                <button type="button" className="px-8 py-2 rounded-lg border border-[#5B6FFF] text-[#5B6FFF] font-semibold bg-white hover:bg-[#5B6FFF] hover:text-white transition" onClick={() => navigate('/manage-ipo')}>Cancel</button>
                <button type="submit" form="ipo-form" className="px-8 py-2 rounded-lg bg-[#5B6FFF] text-white font-semibold hover:bg-[#3a4fd9] transition">{editingIpo ? 'Update' : 'Register'}</button>
              </div>
            </div>
            <hr className="my-6" />
            <form id="ipo-form" className="grid grid-cols-2 gap-x-10 gap-y-6" onSubmit={handleSubmit}>
              {/* Company Logo and Info */}
              <div className="col-span-2 flex items-start gap-8 mb-2">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700 mb-1">Company Logo</span>
                  <div className="flex items-center gap-4">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo Preview" className="w-16 h-16 rounded-full object-cover border" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-2xl">?</div>
                    )}
                    <div className="flex flex-col gap-2">
                      <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" id="logo-upload" />
                      <label htmlFor="logo-upload" className="px-4 py-1 rounded bg-[#5B6FFF] text-white font-semibold cursor-pointer text-sm text-center">Upload Logo</label>
                      {logoPreview && (
                        <button type="button" className="px-4 py-1 rounded bg-red-100 text-red-600 font-semibold text-sm" onClick={() => { setLogoFile(null); setLogoPreview(null); }}>Delete</button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center ml-4">
                  <span className="text-lg font-bold text-[#232323]">{form.company_name || 'Company Name'}</span>
                  <span className="text-xs text-gray-500">{form.exchange === 'NSE' ? 'NSE India' : 'BSE India'}</span>
                  <span className="text-xs text-gray-400">{form.exchange === 'NSE' ? 'Tech Lead' : 'Main Board'}</span>
                  <span className="text-xs text-gray-400">Pune</span>
                </div>
              </div>
              {/* Company Name */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Company Name</label>
                <input name="company_name" value={form.company_name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[#5B6FFF]" placeholder="Company Name" required />
              </div>
              {/* Price Band */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Price Band</label>
                <input name="price_band" value={form.price_band} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[#5B6FFF]" placeholder="Not Issued" required />
              </div>
              {/* Open */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Open</label>
                <input name="open_date" value={form.open_date} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[#5B6FFF]" placeholder="Not Issued" required />
              </div>
              {/* Close */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Close</label>
                <input name="close_date" value={form.close_date} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[#5B6FFF]" placeholder="Not Issued" required />
              </div>
              {/* Issue Size */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Issue Size</label>
                <input name="issue_size" value={form.issue_size} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[#5B6FFF]" placeholder="2300 Cr." required />
              </div>
              {/* Issue Type */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Issue Type</label>
                <select name="issue_type" value={form.issue_type} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[#5B6FFF]">
                  <option value="">Select Issue Type</option>
                  <option value="Book Built">Book Built</option>
                  <option value="Fixed Price">Fixed Price</option>
                </select>
              </div>
              {/* Listing Date */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-semibold mb-1">LISTING DATE</label>
                <input name="listing_date" value={form.listing_date} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[#5B6FFF]" placeholder="Not Issued" />
              </div>
              {/* Status */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[#5B6FFF]">
                  <option value="">Select Status</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Listed">Listed</option>
                </select>
              </div>

              {/* Section Title for New Listed IPO Details */}
              <div className="col-span-2 mt-4 mb-2">
                <span className="block text-lg font-bold text-[#232323] uppercase tracking-wide">NEW LISTED IPO DETAILS (WHEN IPO GET LISTED)</span>
              </div>
              {/* IPO Price */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-semibold mb-1">IPO PRICE</label>
                <input name="ipo_price" value={form.ipo_price} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[#5B6FFF]" placeholder="₹ IPO Price" />
              </div>
              {/* Listing Price */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-semibold mb-1">LISTING PRICE</label>
                <input name="listing_price" value={form.listing_price} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[#5B6FFF]" placeholder="₹ Listing Price" />
              </div>
              {/* Listing Gain */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-semibold mb-1">LISTING GAIN</label>
                <input name="listing_gain" value={form.listing_gain} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[#5B6FFF]" placeholder="Listing Gain %" />
              </div>
              {/* Listing Date */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-semibold mb-1">LISTING DATE</label>
                <input name="listing_date" value={form.listing_date} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[#5B6FFF]" placeholder="Listing Date" />
              </div>
              {/* CMP */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-semibold mb-1">CMP</label>
                <input name="cmp" value={form.cmp} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[#5B6FFF]" placeholder="₹ CMP" />
              </div>
              {/* Current Return */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-semibold mb-1">CURRENT RETURN</label>
                <input name="current_return" value={form.current_return} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[#5B6FFF]" placeholder="Current Return %" />
              </div>
              {/* RHP */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-semibold mb-1">RHP</label>
                <input name="rhp_pdf" value={form.rhp_pdf} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[#5B6FFF]" placeholder="Enter RHP PDF Link" />
              </div>
              {/* DRHP */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-semibold mb-1">DRHP</label>
                <input name="drhp_pdf" value={form.drhp_pdf} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[#5B6FFF]" placeholder="Enter DRHP PDF Link" />
              </div>
            </form>
            {error && <div className="text-red-500 text-center mt-4">{error}</div>}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default IPOInformation; 