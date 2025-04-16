import React from 'react';
import { useLocation } from 'react-router-dom';
import StepBox from '../components/StepBox';
import InputField from '../components/InputField';
import five from '../assets/5.png';
import RoleDetailsCard from '../components/RoleDetailsCard';

const Cost = () => {
  const location = useLocation();
  const { iamArn, accountName, accountId } = location.state || {};

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const payload = {
      iamArn,
      accountName,
      accountId
    };

    try {
      const response = await fetch("http://localhost:8080/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Account created successfully:", data);
        alert("Account created successfully!");
      } else {
        console.error("Failed to create account");
        alert("Failed to create account");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-8xl mx-2">
      <h1 className="text-2xl font-bold mb-4">Create Cost and Usage Report</h1>
      <h1>Create a Cost & Usage Report by following these steps</h1>

      <div className="border border-gray-300 bg-white rounded-lg shadow-md p-6 px-4">
        <StepBox stepNumber={1}>
          Go to the
          <a href="#" className="text-blue-900 underline"> Cost And Usage Reports </a>
          in the Billing Dashboard and click on Create report.
        </StepBox>

        <StepBox stepNumber={2}>
          Name the report as shown below and select the Include resource IDs checkbox -
          <InputField
            label=""
            placeholder="ck-tuner-275595855473-hourly-cur"
            value="ck-tuner-275595855473-hourly-cur"
            onChange={() => {}}
          />
          Click on Next
        </StepBox>

        <RoleDetailsCard img={five} />

        <button
          className="bg-blue-900 text-white px-4 py-2 rounded mt-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Cost;
