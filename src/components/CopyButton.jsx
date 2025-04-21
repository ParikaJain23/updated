import React from 'react';
import { FiCopy } from 'react-icons/fi';
import { toast } from 'react-toastify';

const CopyButton = ({ textToCopy }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.success('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast.error('Failed to copy!');
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="sticky top-2 right-2 bg-blue-800 text-white px-3 py-2 rounded hover:bg-gray-900 flex items-center gap-2 float-right z-10"
    >
      <FiCopy className="text-lg" />
    </button>
  );
};

export default CopyButton;