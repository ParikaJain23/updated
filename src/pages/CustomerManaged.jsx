import React from 'react'
import StepBox from '../components/StepBox'
import CodeBlock from '../components/CodeBlock'
import CopyButton from '../components/CopyButton'
import InputField from '../components/InputField'
import img from '../assets/2.png'
import permission from '../assets/Permission.png'
import three from '../assets/3.png'
import four from '../assets/4.png'
import RoleDetailsCard from '../components/RoleDetailsCard'
import { useLocation, useNavigate } from 'react-router-dom';
import trustPolicy from '../constants/trustPolicy'

function CustomerManaged() {
    const location = useLocation();
    const navigate = useNavigate();
    const { iamArn, accountName, accountId } = location.state || {};
    console.log("Received:", iamArn, accountName, accountId);

    return (
        <div className="max-w-8xl mx-2 ">
            <h1 className="text-2xl font-bold mb-4">Add Customer Managed Policies</h1>
            <div className="border border-gray-300 bg-white rounded-lg shadow-md p-6 px-4">
                <StepBox stepNumber={1}>
                    Go to the<a href="#" className="text-blue-900 underline"> Create Policy</a>. 
                </StepBox>

                <StepBox stepNumber={2}>
                    Click on the <strong>JSON</strong> tab and paste the following policy and click on Next:
                    <div className="relative overflow-y-auto border border-gray-300 rounded-md mt-2 text-blue-900" style={{ maxHeight: '250px', width: '290%' }}>
                        <CopyButton textToCopy={trustPolicy} />
                        <CodeBlock code={trustPolicy} />
                    </div>
                </StepBox>

                <StepBox stepNumber={3}>
                    In the <strong>Name</strong> field, enter below-mentioned policy name and click on Create Policy
                    <div className="relative overflow-y-auto border border-gray-300 rounded-md mt-2 text-blue-900" style={{ maxHeight: '250px', width: '100%' }}>
                        <CopyButton textToCopy="cktuner-CostAuditPolicy"/> 
                        <CodeBlock code="cktuner-CostAuditPolicy"/>   
                    </div> 
                </StepBox>

                <StepBox stepNumber={4}>
                    Again, go to the <a href=" ">Create Policy</a> Page.
                </StepBox>

                <StepBox stepNumber={5}>
                    Click on the <strong>JSON</strong> tab and paste the following policy and click on Next:
                    <div className="relative overflow-y-auto border border-gray-300 rounded-md mt-2 text-blue-900" style={{ maxHeight: '250px', width: '290%' }}>
                        <CopyButton textToCopy={trustPolicy} />
                        <CodeBlock code={trustPolicy} />
                    </div>
                </StepBox>

                <StepBox stepNumber={6}>
                    In the <strong>Name</strong> field, enter below-mentioned policy name and click on Create Policy
                    <div className="relative overflow-y-auto border border-gray-300 rounded-md mt-2 text-blue-900" style={{ maxHeight: '250px', width: '100%' }}>
                        <CopyButton textToCopy="cktuner-SecAuditPolicy"/> 
                        <CodeBlock code="cktuner-SecAuditPolicy"/>   
                    </div>
                </StepBox>

                <StepBox stepNumber={7}>
                    Again, go to the <a href="#">Create Policy</a> Page
                </StepBox>

                <StepBox stepNumber={8}>
                    Click on the <strong>JSON</strong> tab and paste the following policy and click on Next:
                    <div className="relative overflow-y-auto border border-gray-300 rounded-md mt-2 text-blue-900" style={{ maxHeight: '250px', width: '290%' }}>
                        <CopyButton textToCopy={trustPolicy} />
                        <CodeBlock code={trustPolicy} />
                    </div>
                </StepBox>

                <StepBox stepNumber={9}>
                    In the <strong>Name</strong> field, enter below-mentioned policy name and click on Create Policy
                    <div className="relative overflow-y-auto border border-gray-300 rounded-md mt-2 text-blue-900" style={{ maxHeight: '250px', width: '100%' }}>
                        <CopyButton textToCopy="cktuner-TunerReadEssentials" />
                        <CodeBlock code="cktuner-TunerReadEssentials"/>
                    </div>
                </StepBox>

                <StepBox stepNumber={10}>
                    Go to the <a href="#" className="text-blue-900 underline">CK-Tuner-Role</a>. 
                    <RoleDetailsCard img={img} style={{ width: '100%', height: '20%' }} />
                </StepBox>

                <StepBox stepNumber={11}>
                    In Permission policies, click on <strong>Add permissions → Attach Policy</strong>
                    <RoleDetailsCard img={permission} style={{ width: '500%', height: 'auto' }} />
                </StepBox>

                <StepBox stepNumber={12}>
                    Filter by Type → Customer managed then search for <strong>cktuner-CostAuditPolicy, cktuner-SecAuditPolicy, cktuner-TunerReadEssentials</strong> and select them.
                    <RoleDetailsCard img={three} style={{ width: '500%', height: 'auto' }} />
                </StepBox>

                <StepBox stepNumber={13}>
                    Now, click on <strong>Add permissions</strong>
                </StepBox>

                <StepBox stepNumber={14}>
                    In Permission policies, click on <strong>Add permissions → Create inline policy</strong>
                    <RoleDetailsCard img={four} style={{ width: '500%', height: 'auto' }} />
                </StepBox>

                <StepBox stepNumber={15}>
                    Click on the <strong>JSON</strong> tab and paste the following policy and click on Next:
                    <div className="relative overflow-y-auto border border-gray-300 rounded-md mt-2 text-blue-900" style={{ maxHeight: '250px', width: '290%' }}>
                        <CopyButton textToCopy={trustPolicy} />
                        <CodeBlock code={trustPolicy} />
                    </div>
                </StepBox>

                <StepBox stepNumber={16}>
                    Now, click on Review policy
                </StepBox>

                <StepBox stepNumber={17}>
                    In the <strong>Name</strong> field, enter below-mentioned policy name and click on Create Policy
                    <div className="relative overflow-y-auto border border-gray-300 rounded-md mt-2 text-blue-900" style={{ maxHeight: '250px', width: '100%' }}>
                        <CopyButton textToCopy="cktuner-TunerReadEssentials" />
                        <CodeBlock code="cktuner-TunerReadEssentials"/>
                    </div>
                </StepBox>
            </div>
            <div className="flex justify-between mt-8">
                <button className="text-blue-500 border-indigo-500 px-4 py-2 rounded">Cancel</button>
                <button className="bg-blue-900 text-white px-4 py-2 rounded" 
                    onClick={() => navigate("/next", {
                        state: { iamArn, accountName, accountId }
                    })}>
                    Next - Add CUR
                </button>
                
            </div>
        </div>
    )
}

export default CustomerManaged