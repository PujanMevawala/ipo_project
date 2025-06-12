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
import Footer from '../components/Footer';
// ... other imports for components will go here

const UpcomingIPO = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Header />
      <UpcomingSection />
      <DematAccountSection />
      <OngoingSection />
      <NewListedSection />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 container mx-auto px-4 py-8">
        <IpoNewsSection />
        <IpoAnalysisSection />
      </div>
      <FAQSection />
      <Footer />
      {/* Other components will be placed here */}
    </div>
  );
};

export default UpcomingIPO; 