const trustPolicy = {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "CostExplorer",
        "Action": [
          "ce:StartSavingsPlansPurchaseRecommendationGeneration",
          "ce:UpdatePreferences"
        ],
        "Effect": "Allow",
        "Resource": "*"
      },
      {
        "Sid": "ListEC2SPReservations",
        "Effect": "Allow",
        "Action": [
          "ec2:DescribeCapacityReservations",
          "ec2:DescribeCapacityReservationFleets",
          "ec2:GetCapacityReservationUsage",
          "ec2:GetGroupsForCapacityReservation",
          "ec2:DescribeHostReservations",
          "ec2:DescribeHostReservationOfferings",
          "ec2:GetHostReservationPurchasePreview",
          "ec2:DescribeReservedInstancesOfferings",
          "ec2:DescribeReservedInstancesModifications",
          "ec2:DescribeReservedInstances",
          "ec2:GetReservedInstancesExchangeQuote",
          "ec2:DescribeReservedInstancesListings"
        ],
        "Resource": "*"
      },
      {
        "Sid": "ComputeOptimizerAccess",
        "Effect": "Allow",
        "Action": [
          "compute-optimizer:UpdateEnrollmentStatus",
          "compute-optimizer:PutRecommendationPreferences"
        ],
        "Resource": "*"
      },
      {
        "Sid": "ServiceLinkedRole",
        "Effect": "Allow",
        "Action": "iam:CreateServiceLinkedRole",
        "Resource": "arn:aws:iam::*:role/aws-service-role/compute-optimizer.amazonaws.com/AWSServiceRoleForComputeOptimizer*",
        "Condition": {
          "StringLike": {
            "iam:AWSServiceName": "compute-optimizer.amazonaws.com"
          }
        }
      },
      {
        "Sid": "ServiceLinkedRolePolicy",
        "Effect": "Allow",
        "Action": "iam:PutRolePolicy",
        "Resource": "arn:aws:iam::*:role/aws-service-role/compute-optimizer.amazonaws.com/AWSServiceRoleForComputeOptimizer"
      },
      {
        "Sid": "AllowRoleToInspectItself",
        "Effect": "Allow",
        "Action": [
          "iam:ListRolePolicies",
          "iam:GetRolePolicy"
        ],
        "Resource": "arn:aws:iam::275595855473:role/CK-Tuner-Role-dev2"
      }
    ]
  }

export default trustPolicy;