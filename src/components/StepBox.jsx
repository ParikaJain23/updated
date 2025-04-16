import React from 'react';

const StepBox = ({ stepNumber, children }) => {
  return (
    <div className="relative flex items-start mb-4">
      {/* Circle for step number */}
      <div className="absolute left-2 flex justify-center items-center w-6 h-6 bg-gray-500 text-white font-bold rounded-full">
        {stepNumber}
      </div>
      <div className="ml-12 pl-2">
        {children}
      </div>
    </div>
  );
};

export default StepBox;
