import React from 'react';

const CopyButton = ({ textToCopy }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 bg-blue-600 text-white px-4 py-2 rounded hover:not-focus:bg-indigo-700"
    >
      Copy
    </button>
  );
};

export default CopyButton;
