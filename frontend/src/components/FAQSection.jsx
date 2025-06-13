import React, { useState } from 'react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'What is an IPO?',
      answer: 'IPO or the Initial Public Offering is the first time a company issues its shares to the public. As an investor, you will now be able to subscribe for such shares, which was earlier open to only a specific lot of internal and institutional investors via opening a Demat account.',
    },
    {
      id: 2,
      question: 'How to invest in an IPO?',
      answer: 'To invest in an IPO, you typically need a Demat account and a trading account. You can apply through your bank or a brokerage firm. The process usually involves bidding for shares within a specified price band during the IPO subscription period.',
    },
    {
      id: 3,
      question: 'What is the benefit of an IPO?',
      answer: 'Benefits of investing in IPOs include potential listing gains (if the stock opens above its IPO price), the opportunity to invest in a growing company early, and diversification of your investment portfolio.',
    },
    {
      id: 4,
      question: 'What are the disadvantages of an IPO?',
      answer: 'Disadvantages can include price volatility immediately after listing, lack of historical data for analysis, and the risk of oversubscription which might lead to fewer shares being allotted than applied for.',
    },
    {
      id: 5,
      question: 'What is the difference between book building issue and fixed price issue?',
      answer: 'In a book building issue, the price of the share is discovered through a bidding process by institutional investors. In a fixed price issue, the company and its merchant banker decide on a fixed price beforehand.',
    },
    {
      id: 6,
      question: 'Is it mandatory to have a PAN number to apply in an IPO?',
      answer: 'Yes, a Permanent Account Number (PAN) is mandatory for applying in an IPO, as it is a unique identification number required for all financial transactions in India.',
    },
    {
      id: 7,
      question: 'Where do I get an IPO application form?',
      answer: 'IPO application forms are typically available online through your brokerage firm\'s platform or your bank\'s net banking portal. You can also get physical forms from designated bank branches or brokers.',
    },
    {
      id: 8,
      question: 'How one can apply in IPO\'s online?',
      answer: 'Online application for IPOs can be done through ASBA (Application Supported by Blocked Amount) using your net banking facility, or through the online trading platform of your stockbroker. This process is generally more convenient and faster.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Frequently Asked Questions?</h2>
        <p className="text-base text-gray-600 mb-8">Find answers to common questions that come in your mind related to IPO.</p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-md p-6">
              <button
                className="flex justify-between items-center w-full text-left font-semibold text-gray-800 text-lg"
                onClick={() => toggleFAQ(index)}
              >
                <span className="pr-4">{faq.question}</span>
                <span className="text-blue-600 text-3xl flex-shrink-0">
                  {openIndex === index ? '-' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <p className="mt-4 text-base text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection; 