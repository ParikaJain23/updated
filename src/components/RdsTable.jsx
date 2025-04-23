const RdsTable = ({ data, loading }) => {
    if (loading) return <p className="text-gray-600">Loading RDS instances...</p>;
    if (data.length === 0) return <p className="text-gray-500">No RDS instances found.</p>;
  
    return (
      <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 border-b">DB Identifier</th>
              <th className="px-4 py-2 border-b">Class</th>
              <th className="px-4 py-2 border-b">Engine</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">AZ</th>
              <th className="px-4 py-2 border-b">Endpoint</th>
            </tr>
          </thead>
          <tbody>
            {data.map((db, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{db.dbInstanceIdentifier}</td>
                <td className="px-4 py-2 border-b">{db.dbInstanceClass}</td>
                <td className="px-4 py-2 border-b">{db.engine}</td>
                <td className="px-4 py-2 border-b">{db.dbInstanceStatus}</td>
                <td className="px-4 py-2 border-b">{db.availabilityZone}</td>
                <td className="px-4 py-2 border-b break-all">{db.endpoint}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default RdsTable;
  