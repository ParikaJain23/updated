
import React from 'react';
import { toast } from 'react-toastify';

const CodeBlock = ({ code }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy!");
    }
  };

  return (
    <pre
      onClick={handleCopy}
      className="p-4 bg-gray-100 rounded-md text-sm font-mono cursor-pointer select-all hover:bg-gray-200"
      title="Click to copy"
    >
      {code}
    </pre>
  );
};

export default CodeBlock;
