const trustPolicy ={
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": [
          "cur:ValidateReportDestination",
          "cur:DescribeReportDefinitions"
        ],
        "Resource": [
          "*"
        ],
        "Effect": "Allow",
        "Sid": "ReadCostAndUsageReport"
      },
      {
        "Action": [
          "s3:ListBucket",
          "s3:GetReplicationConfiguration",
          "s3:GetObjectVersionForReplication",
          "s3:GetObjectVersionAcl",
          "s3:GetObjectVersionTagging",
          "s3:GetObjectRetention",
          "s3:GetObjectLegalHold",
          "s3:GetObject"
        ],
        "Resource": [
          "arn:aws:s3:::ck-tuner-275595855473",
          "arn:aws:s3:::ck-tuner-275595855473/*"
        ],
        "Effect": "Allow",
        "Sid": "S3LimitedRead"
      },
      {
        "Action": [
          "s3:GetObjectVersionTagging",
          "s3:GetBucketVersioning",
          "s3:ReplicateObject",
          "s3:ReplicateDelete",
          "s3:ReplicateTags",
          "s3:ObjectOwnerOverrideToBucketOwner"
        ],
        "Resource": [
          "arn:aws:s3:::ck-tuner-cur-dev2-1000291",
          "arn:aws:s3:::ck-tuner-cur-dev2-1000291/*"
        ],
        "Effect": "Allow",
        "Sid": "S3Replicate"
      },
      {
        "Action": [
          "s3:PutObject",
          "s3:GetObject"
        ],
        "Resource": "arn:aws:s3:::ck-tuner-275595855473/CKTunerTestFile",
        "Effect": "Allow",
        "Sid": "S3ReplicationCheck"
      }
    ]
  }

export default trustPolicy;