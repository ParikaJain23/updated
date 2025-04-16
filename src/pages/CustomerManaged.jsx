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
import { useNavigate } from 'react-router-dom'

function CustomerManaged() {
    const navigate = useNavigate();
    const text = {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Sid": "CostAudit",
            "Effect": "Allow",
            "Action": [
              "dms:Describe*",
              "dms:List*",
              "kafka:Describe*",
        //       "kafka:Get*",
        //       "kafka:List*",
        //       "mq:Describe*",
        //       "mq:List*",
        //       "route53resolver:Get*",
        //       "route53resolver:List*",
        //       "memorydb:Describe*",
        //       "savingsplans:Describe*",
        //       "cloudsearch:Describe*",
        //       "quicksight:Describe*",
        //       "quicksight:List*",
        //       "codepipeline:Get*",
        //       "codepipeline:List*",
        //       "codebuild:List*",
        //       "codebuild:Get*",
        //       "codebuild:Describe*",
        //       "codebuild:BatchGet*",
        //       "codedeploy:List*",
        //       "codedeploy:BatchGet*",
        //       "codedeploy:Get*",
        //       "mediaconnect:Describe*",
        //       "mediaconnect:List*",
        //       "mediaconvert:Describe*",
        //       "mediaconvert:Get*",
        //       "mediaconvert:List*",
        //       "medialive:Describe*",
        //       "medialive:List*",
        //       "mediapackage:Describe*",
        //       "mediapackage:List*",
        //       "mediapackage-vod:Describe*",
        //       "mediapackage-vod:List*",
        //       "mediastore:DescribeObject",
        //       "mediastore:Get*",
        //       "mediastore:List*",
        //       "mediatailor:Describe*",
        //       "mediatailor:Get*",
        //       "mediatailor:List*",
        //       "ec2:Describe*",
        //       "elasticache:Describe*",
        //       "events:DescribeEventBus",
        //       "events:List*",
        //       "elasticloadbalancing:Describe*",
        //       "kinesis:List*",
        //       "kinesis:Describe*",
        //       "kinesisanalytics:Describe*",
        //       "kinesisanalytics:List*",
        //       "dynamodb:Describe*",
        //       "dynamodb:List*",
        //       "cloudwatch:Describe*",
        //       "cloudwatch:List*",
        //       "cloudwatch:GetMetricStatistics",
        //       "ecr:GetLifecyclePolicy",
        //       "ecr:GetRepositoryPolicy",
        //       "ecr-public:DescribeRepositories",
        //       "ecr:List*",
        //       "ecr:Describe*",
        //       "lambda:List*",
        //       "lambda:GetPolicy",
        //       "lambda:GetAccountSettings",
        //       "lambda:GetFunctionConfiguration",
        //       "lambda:GetFunctionCodeSigningConfig",
        //       "lambda:GetFunctionConcurrency",
        //       "lambda:GetFunctionConfiguration",
        //       "rds:Describe*",
        //       "rds:ListTagsForResource",
        //       "sqs:GetQueueAttributes",
        //       "sqs:List*",
        //       "firehose:Describe*",
        //       "firehose:List*",
        //       "kafka:Describe*",
        //       "kafka:List*",
        //       "glue:GetDevEndpoint",
        //       "s3:GetBucketPolicy",
        //       "s3:List*",
        //       "network-firewall:Describe*",
        //       "network-firewall:List*",
        //       "elasticfilesystem:Describe*",
        //       "kms:Describe*",
        //       "kms:List*",
        //       "kms:GetKeyRotationStatus",
        //       "kms:GetKeyPolicy",
        //       "elasticmapreduce:List*",
        //       "es:Describe*",
        //       "es:List*",
        //       "es:Get*",
        //       "aoss:Get*",
        //       "aoss:List*",
        //       "logs:Describe*",
        //       "logs:List*",
        //       "application-autoscaling:Describe*",
        //       "route53:List*",
        //       "redshift:Describe*",
        //       "backup:Describe*",
        //       "backup:Get*",
        //       "backup:List*",
        //       "dlm:Get*",
        //       "dlm:List*",
        //       "sagemaker:List*",
        //       "lambda:Get*"
        //     ],
        //     "Resource": "*"
        //   },
        //   {
        //     "Sid": "BillingReadOnly",
        //     "Effect": "Allow",
        //     "Action": [
        //       "billingconductor:List*",
        //       "billing:ListBillingViews"
        //     ],
        //     "Resource": "*"
        //   },
        //   {
        //     "Sid": "ComputeOptimizerReadAccess",
        //     "Effect": "Allow",
        //     "Action": [
        //       "compute-optimizer:Get*"
        //     ],
        //     "Resource": "*"
        //   },
        //   {
        //     "Sid": "CostExplorerAccess",
        //     "Effect": "Allow",
        //     "Action": [
        //       "ce:Describe*",
        //       "ce:Get*",
        //       "ce:List*"
        //     ],
        //     "Resource": "*"
        //   },
        //   {
        //     "Sid": "CURReportDefinitions",
        //     "Effect": "Allow",
        //     "Action": [
        //       "organizations:Describe*",
        //       "organizations:List*"
        //     ],
        //     "Resource": "*"
        //   },
        //   {
        //     "Sid": "PricingAPIAccess",
        //     "Effect": "Allow",
        //     "Action": [
        //       "pricing:*"
        //     ],
        //     "Resource": "*"
        //   },
        //   {
        //     "Sid": "WellArchitectedAccess",
        //     "Effect": "Allow",
        //     "Action": [
        //       "wellarchitected:*"
        //     ],
        //     "Resource": "*"
        //   },
        //   {
        //     "Sid": "ReadOnlyForOrgServices",
        //     "Effect": "Allow",
        //     "Action": [
        //       "detective:Describe*",
        //       "detective:List*",
        //       "detective:Get*",
        //       "devops-guru:Describe*",
        //       "devops-guru:List*",
        //       "devops-guru:Get*",
        //       "devops-guru:Search*",
        //       "guardduty:Describe*",
        //       "guardduty:Get*",
        //       "guardduty:List*",
        //       "inspector:Describe*",
        //       "inspector:Get*",
        //       "inspector2:List*",
        //       "inspector2:Get*",
        //       "inspector2:Describe*",
        //       "macie2:Describe*",
        //       "macie2:Get*",
        //       "macie2:List*",
        //       "account:Get*",
        //       "account:ListRegions",
        //       "auditmanager:Get*",
        //       "auditmanager:List*",
        //       "controltower:Describe*",
        //       "controltower:Get*",
        //       "controltower:List*",
        //       "sso:Describe*",
        //       "sso:List*",
        //       "sso:Get*",
        //       "sso:Search*",
        //       "sso-directory:Describe*",
        //       "sso-directory:Get*",
        //       "sso-directory:List*",
        //       "sso-directory:Search*",
        //       "aws-marketplace:DescribeAgreement",
        //       "aws-marketplace:Get*",
        //       "aws-marketplace:List*",
        //       "aws-marketplace:ViewSubscriptions",
        //       "aws-marketplace:SearchAgreements",
        //       "networkmanager:DescribeGlobalNetworks",
        //       "networkmanager:Get*",
        //       "networkmanager:List*",
        //       "trustedadvisor:Describe*",
        //       "trustedadvisor:List*",
        //       "cloudtrail:Describe*",
        //       "cloudtrail:Get*",
        //       "cloudtrail:List*",
        //       "cloudtrail:LookupEvents",
        //       "cloudformation:Describe*",
        //       "cloudformation:Get*",
        //       "cloudformation:List*",
        //       "compute-optimizer:DescribeRecommendationExportJobs",
        //       "config:Describe*",
        //       "config:Get*",
        //       "config:List*",
        //       "ds:Describe*",
        //       "ds:Get*",
        //       "ds:List*",
        //       "fms:Get*",
        //       "fms:List*",
        //       "access-analyzer:Get*",
        //       "access-analyzer:List*",
        //       "healthlake:Describe*",
        //       "healthlake:GetCapabilities",
        //       "healthlake:List*",
        //       "healthlake:ReadResource",
        //       "healthlake:Search*",
        //       "health:Describe*",
        //       "license-manager:Get*",
        //       "license-manager:List*",
        //       "servicecatalog:Describe*",
        //       "servicecatalog:Get*",
        //       "servicecatalog:List*",
        //       "servicecatalog:ScanProvisionedProducts",
        //       "servicecatalog:Search*",
        //       "securityhub:Describe*",
        //       "securityhub:Get*",
        //       "securityhub:List*",
        //       "ssm:Describe*",
        //       "ssm:List*",
        //       "ram:Get*",
        //       "ram:List*",
        //       "servicequotas:Get*",
              "servicequotas:List*",
              "s3:Describe*",
              "license-manager:GetGrant",
              "license-manager:ListTokens",
              "license-manager-user-subscriptions:List*"
            ],
            "Resource": "*"
          }
        ]
      }
  return (
    <div className="max-w-8xl mx-2 ">
         <h1 className="text-2xl font-bold mb-4">Add Customer Managed Policies</h1>
         <div className="border border-gray-300 bg-white rounded-lg shadow-md p-6 px-4">
        <StepBox stepNumber={1}>
            Go to the<a href="#" className="text-blue-900 underline"> Create Policy</a>. 
        </StepBox>

        <StepBox stepNumber={2}>
        Click on the <strong>JSON</strong> tab and paste the following policy and click on Next:
          <div className="relative overflow-y-auto border border-gray-300 rounded-md mt-2 text-blue-900" style={{ maxHeight: '250px' , width : '230%' }}>
          <CodeBlock code={JSON.stringify(text, null, 2)} />
          <CopyButton textToCopy={JSON.stringify(text, null, 2)} />

          </div>
        </StepBox>

        <StepBox stepNumber={3}>
        In the  <strong>Name </strong>field, enter below-mentioned policy name and click on Create Policy
          <InputField
            label=""
            placeholder="cktuner-CostAuditPolicy"
            value="cktuner-CostAuditPolicy"
            onChange={() => {}}
          />
        </StepBox>

<StepBox stepNumber={4}>
Again, go to the <a href =" ">Create Policy</a> Page.
</StepBox>

<StepBox stepNumber={5}>
        Click on the <strong>JSON</strong> tab and paste the following policy and click on Next:
          <div className="relative overflow-y-auto border border-gray-300 rounded-md mt-2 text-blue-900" style={{ maxHeight: '250px' , width : '230%' }}>
          <CodeBlock code={JSON.stringify(text, null, 2)} />
          <CopyButton textToCopy={JSON.stringify(text, null, 2)} />

          </div>
        </StepBox>

        <StepBox stepNumber={6}>
        In the  <strong>Name </strong>field, enter below-mentioned policy name and click on Create Policy
          <InputField
            label=""
            placeholder="cktuner-SecAuditPolicy"
            value="cktuner-SecAuditPolicy"
            onChange={() => {}}
          />
        </StepBox>
        <StepBox stepNumber={7}>
          Again , go to the <a href = "#">Create Policy</a> Page
        </StepBox>

        <StepBox stepNumber={8}>
        Click on the <strong>JSON</strong> tab and paste the following policy and click on Next:
          <div className="relative overflow-y-auto border border-gray-300 rounded-md mt-2 text-blue-900" style={{ maxHeight: '250px' , width : '230%' }}>
          <CodeBlock code={JSON.stringify(text, null, 2)} />
          <CopyButton textToCopy={JSON.stringify(text, null, 2)} />

          </div>
        </StepBox>
        <StepBox stepNumber={9}>
        In the  <strong>Name </strong>field, enter below-mentioned policy name and click on Create Policy
          <InputField
            label=""
            placeholder="cktuner-TunerReadEssentials"
            value="cktuner-TunerReadEssentials"
            onChange={() => {}}
          />
        </StepBox>
        <StepBox stepNumber={10}>
        Go to the <a href="#" className="text-blue-900 underline">  CK-Tuner-Role</a>. 
          <RoleDetailsCard img={img} style={{ width: '500%', height: 'auto' }} />
        </StepBox>

        <StepBox stepNumber={11}>
        In Permission policies, click on <strong>Add permissions  Attach Policy</strong>
          <RoleDetailsCard img={permission} style={{ width: '500%', height: 'auto' }} />
        </StepBox>

        <StepBox stepNumber={12}>
        Filter by Type  Customer managed then search for <strong> cktuner-CostAuditPolicy, cktuner-SecAuditPolicy, cktuner-TunerReadEssentials </strong>and select them.
          <RoleDetailsCard img={three} style={{ width: '500%', height: 'auto' }} />
        </StepBox>

        <StepBox stepNumber={13}>
        Now, click on <strong>Add permissions</strong>
</StepBox>

      <StepBox stepNumber={14}>
      In Permission policies, click on <strong> Add permissions  Create inline policy </strong>
          <RoleDetailsCard img={four} style={{ width: '500%', height: 'auto' }} />
        </StepBox>

        <StepBox stepNumber={15}>
        Click on the <strong>JSON</strong> tab and paste the following policy and click on Next:
          <div className="relative overflow-y-auto border border-gray-300 rounded-md mt-2 text-blue-900" style={{ maxHeight: '250px' , width : '230%' }}>
          <CodeBlock code={JSON.stringify(text, null, 2)} />
          <CopyButton textToCopy={JSON.stringify(text, null, 2)} />

          </div>
        </StepBox>

        <StepBox stepNumber={16}>
        Now, click on Review policy
</StepBox>


<StepBox stepNumber={17}>
        In the  <strong>Name </strong>field, enter below-mentioned policy name and click on Create Policy
          <InputField
            label=""
            placeholder="S3CrossAccountReplication"
            value="S3CrossAccountReplication"
            onChange={() => {}}
          />
        </StepBox>

        </div>
        <div className="flex justify-between mt-8">
          <button className=" text-blue-500 border-indigo-500 px-4 py-2 rounded">Cancel</button>
          <button className="bg-blue-900 text-white px-4 py-2 rounded" 
          onClick = {()=>navigate("/next")}>Next - Add Customer Managed Policy </button>
        </div>
    </div>
    
   
  )
}
export default CustomerManaged