import React from 'react';

const DotsIndicator = ({ count, activeIndex }) => {
  return (
    <div className="flex justify-center space-x-2 mt-10">
      {[...Array(count)].map((_, index) => (
        <span
          key={index}
          className={`block w-2 h-2 rounded-full ${
            index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        ></span>
      ))}
    </div>
  );
};

export default DotsIndicator; 