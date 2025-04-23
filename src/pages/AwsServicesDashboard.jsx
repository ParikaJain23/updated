import React, { useEffect, useState } from "react";
import AccountDropdown from "../components/AccountDropdown";
import ServiceTabs from "../components/ServiceTabs";
import Ec2Table from "../components/Ec2Table";
import RdsTable from "../components/RdsTable";

const AwsServicesDashboard = () => {
  const [cloudAccounts, setCloudAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedService, setSelectedService] = useState("EC2");
  const [ec2Data, setEc2Data] = useState([]);
  const [rdsData, setRdsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/accounts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const result = await res.json();
          Array.isArray(result.data) && setCloudAccounts(result.data);
        } else {
          console.error("Failed to fetch accounts");
        }
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    };
    fetchAccounts();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedAccount) return;

      setLoading(true);
      try {
        const endpoint =
          selectedService === "EC2"
            ? `http://localhost:8080/api/ec2/instances?roleArn=${selectedAccount.arnNumber}&region=us-east-1`
            : `http://localhost:8080/api/aws/rds?roleArn=${selectedAccount.arnNumber}&region=us-east-1`;

        const res = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        selectedService === "EC2" ? setEc2Data(data) : setRdsData(data);
      } catch (err) {
        console.error(`${selectedService} fetch error:`, err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedAccount, selectedService, token]);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        AWS Services Dashboard
      </h2>

      <AccountDropdown
        cloudAccounts={cloudAccounts}
        onSelect={setSelectedAccount}
      />

      <ServiceTabs
        selectedService={selectedService}
        onSelect={setSelectedService}
      />

      {selectedService === "EC2" && selectedAccount && (
        <Ec2Table data={ec2Data} loading={loading} />
      )}

      {selectedService === "RDS" && selectedAccount && (
        <RdsTable data={rdsData} loading={loading} />
      )}
    </div>
  );
};

export default AwsServicesDashboard;