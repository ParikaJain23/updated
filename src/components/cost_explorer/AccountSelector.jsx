
import React from 'react';

const AccountSelector = ({ accounts = [], selectedAccount, onSelect = () => {} }) => {
  if (!Array.isArray(accounts)) {
    console.error('Expected accounts to be an array but got:', accounts);
    return <div>Error: Unable to load accounts</div>;
  }

  return (
    <div className="account-selector">
      <label htmlFor="account-dropdown" className="block text-sm font-medium text-gray-700 mb-1">
        Select Account
      </label>
      <select
        id="account-dropdown"
        value={selectedAccount}
        onChange={(e) => onSelect(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">-- Select an account --</option>
        {accounts.map((acc) => (
          <option key={acc.accountId} value={acc.accountId}>
            {acc.accountName || acc.accountId}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AccountSelector;
