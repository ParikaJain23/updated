import React from "react";
import { useLocation } from "react-router-dom";
import StepBox from "../components/onboarding/StepBox";
import InputField from "../components/onboarding/InputField";
import five from "../assets/5.png";
import six from "../assets/6.png";
import seven from "../assets/7.png";
import RoleDetailsCard from "../components/onboarding/RoleDetailsCard";
import CopyButton from "../components/onboarding/CopyButton";
import CodeBlock from "../components/onboarding/CodeBlock";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const Cost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { iamArn, accountName, accountId } = location.state || {};

  const handleSubmit = async () => {
    const payload = { arnNumber: iamArn, accountName, accountId };
    try {
      const response = await axiosInstance.post(
        "/accounts",
        JSON.stringify(payload)
      );
      alert("Account created successfully!");
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6">
    <div className="w-full bg-white rounded-lg shadow-md p-10 mt-10">
  
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Create Cost & Usage Report
      </h1>
      <p className="text-gray-700 mb-6">
        Create a Cost & Usage Report by following these steps
      </p>

      <StepBox stepNumber={1}>
        Go to the{" "}
        <a href="#" className="text-blue-800 underline font-medium">
          Cost and Usage Reports
        </a>{" "}
        in the Billing Dashboard and click on <strong>Create report</strong>.
      </StepBox>

      <StepBox stepNumber={2}>
        Name the report as shown below and select the resource IDs checkbox –
        <div className="relative mt-3 border border-gray-300 rounded-md bg-gray-50 p-2 text-blue-900">
          <CopyButton textToCopy="ck-tuner-275595855473-hourly-cur" />
          <CodeBlock code="ck-tuner-275595855473-hourly-cur" />
        </div>
        <div className="mt-3 flex items-center space-x-2">
          <input
            id="includeResource"
            type="checkbox"
            className="w-4 h-4"
            checked
            disabled
          />
          <label htmlFor="includeResource" className="text-gray-700">
            Include Resource IDs
          </label>
        </div>
      </StepBox>

      <RoleDetailsCard img={five} />

      <RoleDetailsCard img={six} />
      <br />

      <StepBox stepNumber={4}>
        In the <strong>Delivery options</strong> section, enter the
        below-mentioned Report path prefix –
        <div className="relative mt-3 border border-gray-300 rounded-md bg-gray-50 p-2 text-blue-900">
          <CopyButton textToCopy="ck-tuner-275595855473-hourly-cur" />
          <CodeBlock code="ck-tuner-275595855473-hourly-cur" />
        </div>
      </StepBox>

      <RoleDetailsCard img={seven} />
      <br/>


      <StepBox stepNumber={5}>
        Click on Next. Now, review the configuration of the Cost and Usage
        Report. Once satisfied, click on Create Report.
      </StepBox>

      <button
            onClick={() => navigate("/onboarding", )}
            className="text-blue-500 border-indigo-500 px-4 py-2 rounded"
          >
            Cancel
          </button>

      <button
        className="mt-6 bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
    </div>
  );
};

export default Cost;
