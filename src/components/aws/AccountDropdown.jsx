const AccountDropdown = ({ cloudAccounts, onSelect }) => (
    <select
      className="mb-6 px-4 py-2 border rounded-lg w-80 text-base"
      onChange={(e) => {
        const selected = cloudAccounts.find(
          (acc) => String(acc.accountId) === e.target.value
        );
        onSelect(selected || null);
      }}
    >
      <option value="">Select Cloud Account</option>
      {cloudAccounts.map((acc) => (
        <option key={acc.accountId} value={String(acc.accountId)}>
          {acc.accountName} ({acc.accountId})
        </option>
      ))}
    </select>
  );
  export default AccountDropdown;
  