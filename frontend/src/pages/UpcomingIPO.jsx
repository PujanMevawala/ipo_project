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
      <DotsIndicator count={6} activeIndex={0} />
      <DematAccountSection />
      <OngoingSection />
      <NewListedSection />
      <DotsIndicator count={6} activeIndex={0} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 container mx-auto px-4 py-8">
        <IpoNewsSection />
        <IpoAnalysisSection />
      </div>
      <FAQSection />
    </div>
  );
};

export default UpcomingIPO; 