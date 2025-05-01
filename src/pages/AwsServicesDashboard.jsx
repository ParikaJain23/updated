import React, { useEffect, useState } from "react";
import AccountDropdown from "../components/aws/AccountDropdown";
import ServiceTabs from "../components/aws/ServiceTabs";
import Ec2Table from "../components/aws/Ec2Table";
import RdsTable from "../components/aws/RdsTable";
import AsgTable from "../components/aws/AsgTable";
import axiosInstance from "../api/axiosInstance"; 

const AwsServicesDashboard = () => {
  const [cloudAccounts, setCloudAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedService, setSelectedService] = useState("EC2");
  const [ec2Data, setEc2Data] = useState([]);
  const [rdsData, setRdsData] = useState([]);
  const [asgData, setAsgData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axiosInstance.get("/accounts");
        if (Array.isArray(res.data.data)) {
          setCloudAccounts(res.data.data);
        } else {
          console.error("Accounts response is not an array");
        }
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedAccount) return;

      setLoading(true);
      try {
        const roleArn = selectedAccount.arnNumber;
        const region = "us-east-1";

        const serviceEndpoint =
          selectedService === "EC2"
            ? `/ec2/metadata?roleArn=${roleArn}&region=${region}`
            : selectedService === "RDS"
            ? `/rds/metadata?roleArn=${roleArn}&region=${region}`
            : `/asg/metadata?roleArn=${roleArn}&region=${region}`;

        const res = await axiosInstance.get(serviceEndpoint);

        if (selectedService === "EC2") {
          setEc2Data(res.data);
        } else if (selectedService === "RDS") {
          setRdsData(res.data);
        } else if (selectedService === "ASG") {
          setAsgData(res.data);
        }
      } catch (err) {
        console.error(`${selectedService} fetch error:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedAccount, selectedService]);

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

      {selectedService === "ASG" && selectedAccount && (
        <AsgTable data={asgData} loading={loading} />
      )}
    </div>
  );
};

export default AwsServicesDashboard;
