import React, { useState } from "react";
import StepBox from "../components/onboarding/StepBox";
import CodeBlock from "../components/onboarding/CodeBlock";
import RoleDetailsCard from "../components/onboarding/RoleDetailsCard";
import InputField from "../components/onboarding/InputField";
import one from "../assets/1.png";
import CopyButton from "../components/onboarding/CopyButton";
import { useNavigate } from "react-router-dom";
import trustPolicy from "../constants/trustPolicy"; 
const CreateIamRole = () => {
  const [iamArn, setIamArn] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountId, setAccountId] = useState("");

  const [iamArnError, setIamArnError] = useState("");
  const [accountNameError, setAccountNameError] = useState("");
  const [accountIdError, setAccountIdError] = useState("");

  const navigate = useNavigate();

  const validateIamArn = (value) => {
    if (!value.trim()) {
      setIamArnError("IAM Role ARN is required.");
    } else {
      setIamArnError("");
    }
  };

  const validateAccountName = (value) => {
    if (!value.trim()) {
      setAccountNameError("Account Name is required.");
    } else {
      setAccountNameError("");
    }
  };

  const validateAccountId = (value) => {
    const regex = /^\d{12}$/;
    if (!value.trim()) {
      setAccountIdError("Account ID is required.");
    } else if (!regex.test(value)) {
      setAccountIdError("Account ID must be exactly 12 digits.");
    } else {
      setAccountIdError("");
    }
  };

  const handleIamArnChange = (e) => {
    const value = e.target.value;
    setIamArn(value);
    validateIamArn(value);
  };

  const handleAccountNameChange = (e) => {
    const value = e.target.value;
    setAccountName(value);
    validateAccountName(value);
  };

  const handleAccountIdChange = (e) => {
    const value = e.target.value;
    setAccountId(value);
    validateAccountId(value);
  };

  const isFormValid =
    iamArn &&
    accountName &&
    accountId &&
    !iamArnError &&
    !accountNameError &&
    !accountIdError;

  return (
    <div className="max-w-8xl mx-2">
      <h1 className="text-2xl font-bold mb-4">Create an IAM Role</h1>
      <h1>Create an IAM Role by following these steps</h1>

      <div className="border border-gray-300 bg-white rounded-lg shadow-md p-6 px-4">
        <StepBox stepNumber={1}>
          Log into AWS account &{" "}
          <a href="#" className="text-blue-600 underline">
            Create an IAM Role
          </a>
          .
        </StepBox>

        <StepBox stepNumber={2}>
          Click on the <strong>JSON</strong> tab and paste the following policy
          and click on Next:
          <div
            className="relative overflow-y-auto border border-gray-300 rounded-md mt-2 text-blue-900"
            style={{ maxHeight: "250px", width: "290%" }}
          >
            <CopyButton textToCopy={trustPolicy} />
            <CodeBlock code={trustPolicy} />
          </div>
        </StepBox>

        <StepBox stepNumber={3}>
          Click on <strong>Next</strong> to go to the <em>Add permissions</em>{" "}
          page. No permissions for now. Click on <strong>Next</strong>.
        </StepBox>

        <StepBox stepNumber={4}>
          In the <strong>Role name</strong> field, enter the below-mentioned
          role name, Click <strong>Create Role</strong>.
          <div
            className="relative overflow-y-auto border border-gray-300 rounded-md mt-2 text-blue-900"
            style={{ maxHeight: "250px", width: "100%" }}
          >
            <CopyButton textToCopy="CK-Role-Tuner-dev2" />
            <CodeBlock code="CK-Role-Tuner-dev2" />
          </div>
        </StepBox>

        <StepBox stepNumber={5}>
          Go to the newly created IAM Role and copy the Role ARN:
          <RoleDetailsCard
            img={one}
            style={{ width: "400%", height: "auto" }}
          />
        </StepBox>

        <StepBox stepNumber={6}>
          Paste the copied Role ARN below:
          <div className="flex flex-wrap gap-x-56">
            <div className="flex-1 min-w-[250px]">
              <InputField
                label="Enter the IAM Role ARN"
                placeholder="Enter the IAM Role ARN"
                required={true}
                value={iamArn}
                onChange={handleIamArnChange}
                copyValue={iamArn}
              />
              {iamArnError && (
                <p className="text-red-500 text-sm mt-1">{iamArnError}</p>
              )}
            </div>

            <div className="flex-1 min-w-[250px]">
              <InputField
                label="Enter the Account Name"
                placeholder="Enter the Account Name"
                required={true}
                value={accountName}
                onChange={handleAccountNameChange}
                copyValue={accountName}
              />
              {accountNameError && (
                <p className="text-red-500 text-sm mt-1">{accountNameError}</p>
              )}
            </div>

            <div className="flex-1 min-w-[250px]">
              <InputField
                label="Enter the Account Id"
                placeholder="Enter the 12-digit Account Id"
                required={true}
                value={accountId}
                onChange={handleAccountIdChange}
                copyValue={accountId}
              />
              {accountIdError && (
                <p className="text-red-500 text-sm mt-1">{accountIdError}</p>
              )}
            </div>
          </div>
        </StepBox>

        <div className="flex justify-between mt-8">
          <button
            onClick={() => navigate("/user-management")}
            className="text-blue-500 border-indigo-500 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              navigate("/onboarding/customer-managed", {
                state: {
                  iamArn,
                  accountName,
                  accountId,
                },
              })
            }
            disabled={!isFormValid}
            className={`px-4 py-2 rounded font-medium transition duration-300 ${
              isFormValid
                ? "bg-blue-900 text-white hover:bg-blue-800 cursor-pointer"
                : "bg-gray-200 text-blue-500 cursor-not-allowed"
            }`}
          >
            Next - Add Customer Managed Policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateIamRole;
