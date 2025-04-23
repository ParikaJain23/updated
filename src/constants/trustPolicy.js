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

export default trustPolicy;