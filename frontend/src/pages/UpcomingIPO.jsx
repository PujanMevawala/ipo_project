import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import UpcomingSection from '../components/UpcomingSection';
import DematAccountSection from '../components/DematAccountSection';
import OngoingSection from '../components/OngoingSection';
import NewListedSection from '../components/NewListedSection';
import IpoNewsSection from '../components/IpoNewsSection';
import IpoAnalysisSection from '../components/IpoAnalysisSection';
import FAQSection from '../components/FAQSection';
import DotsIndicator from '../components/DotsIndicator';

const UpcomingIPO = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Header />
      <UpcomingSection />
      <FAQSection />
    </div>
  );
};

export default UpcomingIPO; 