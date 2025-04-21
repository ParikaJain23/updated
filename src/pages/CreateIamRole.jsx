import React, { useState } from 'react';
import StepBox from '../components/StepBox';
import CodeBlock from '../components/CodeBlock';
import RoleDetailsCard from '../components/RoleDetailsCard';
import InputField from '../components/InputField';
import one from '../assets/1.png';
import CopyButton from '../components/CopyButton';
import { useNavigate } from 'react-router-dom';

const CreateIamRole = () => {
  const [iamArn, setIamArn] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountId, setAccountId] = useState("");
  const navigate = useNavigate();

  const trustPolicy = `{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::951945085289:root"
        },
        "Action": "sts:AssumeRole",
        "Condition": {
          "StringEquals": {
            "sts:ExternalId": "CloudKeeper-Tuner"
          }
        }
      }
    ]
  }`;

  return (
    <div className="max-w-8xl mx-2">
      <h1 className="text-2xl font-bold mb-4">Create an IAM Role</h1>
      <h1>Create an IAM Role by following these steps</h1>

      <div className="border border-gray-300 bg-white rounded-lg shadow-md p-6 px-4">
        <StepBox stepNumber={1}>
          Log into AWS account & <a href="#" className="text-blue-600 underline">Create an IAM Role</a>.
        </StepBox>

        <StepBox stepNumber={2}>
          In the <strong>Trusted entity type</strong> section, select <strong>Custom trust policy</strong>. Replace the policy with:
          <div className="relative overflow-y-auto border border-gray-300 rounded-md mt-2 text-blue-900" style={{ maxHeight: '250px', width: '230%' }}>
            <CodeBlock code={trustPolicy} />
            <CopyButton textToCopy={trustPolicy} />
          </div>
        </StepBox>

        <StepBox stepNumber={3}>
          Click on <strong>Next</strong> to go to the <em>Add permissions</em> page. No permissions for now. Click on <strong>Next</strong>.
        </StepBox>

        <StepBox stepNumber={4}>
          In the <strong>Role name</strong> field, enter the below-mentioned role name, Click <strong>Create Role</strong>.
          <div className="relative overflow-y-auto border border-gray-300 rounded-md mt-2 text-blue-900" style={{ maxHeight: '250px', width: '100%' }}>
            <CopyButton textToCopy="CK-Role-Tuner-dev2" />
            <CodeBlock code="CK-Role-Tuner-dev2" />
          </div>
        </StepBox>

        <StepBox stepNumber={5}>
          Go to the newly created IAM Role and copy the Role ARN:
          <RoleDetailsCard img={one} style={{ width: '400%', height: 'auto' }} />
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
                onChange={(e) => setIamArn(e.target.value)}
                copyValue={iamArn}
              />
            </div>

            <div className="flex-1 min-w-[250px]">
              <InputField
                label="Enter the Account Name"
                placeholder="Enter the Account Name"
                required={true}
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                copyValue={accountName}
              />
            </div>

            <div className="flex-1 min-w-[250px]">
              <InputField
                label="Enter the Account Id"
                placeholder="Enter the Account Id"
                required={true}
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                copyValue={accountId}
              />
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
              navigate("/add-policy", {
                state: {
                  iamArn,
                  accountName,
                  accountId,
                },
              })
            }
            disabled={!iamArn || !accountName || !accountId}
            className={`px-4 py-2 rounded font-medium transition duration-300 ${
              iamArn && accountName && accountId
                ? 'bg-blue-900 text-white hover:bg-blue-800 cursor-pointer'
                : 'bg-gray-200 text-blue-500 cursor-not-allowed'
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