# AWS CDK v2 Samples

🚀 Welcome to the `aws-cdk-v2-samples` repository! Here, you'll find a curated collection of sample projects and code snippets that showcase the 
capabilities of AWS Cloud Development Kit (CDK) version 2. If you're looking to kickstart your infrastructure-as-code journey with AWS CDK, you've come to 
the right place!

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setting Up AWS CDK v2](#setting-up-aws-cdk-v2)
- [Using the Samples](#using-the-samples)
- [Available Samples](#available-samples)
- [Contribution](#contribution)
- [License](#license)

## Prerequisites

- An active [AWS account](https://aws.amazon.com/account/).
- [Node.js](https://nodejs.org/) 10.x or later.
- [AWS CLI](https://aws.amazon.com/cli/) installed and configured.

## Setting Up AWS CDK v2

1. **Install the AWS CDK Toolkit Globally**: This will provide you with the `cdk` command-line tool.

   ```bash
   npm install -g aws-cdk@2.x
   ```

2. **Check the Installed Version**:

   ```bash
   cdk --version
   ```

3. **Configure AWS CLI** (if not done already):

   Ensure that you have the AWS CLI installed and set up with the necessary access rights. You can configure the AWS CLI by running:

   ```bash
   aws configure
   ```

## Using the Samples

1. **Clone this Repository**:

   ```bash
   git clone https://github.com/uladkaminski/aws-cdk-v2-samples.git
   cd aws-cdk-v2-samples
   ```

2. **Navigate to a Sample**:

   Each sample is contained within its own directory. Navigate to the sample of your choice:

   ```bash
   cd [SAMPLE_DIRECTORY]
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Deploy the Sample**:

   Use the `cdk` command-line tool to deploy the sample:

   ```bash
   cdk deploy
   ```

5. **(Optional) Destroy the Deployed Stack**:

   Once you're done experimenting with the sample, you can destroy the resources to avoid incurring costs:

   ```bash
   cdk destroy
   ```

## Available Samples

- `s3_bucket_creation_stack`: Sample with cdk script to create a private versioned S3 bucket and another one with fully public read policies.


## Contribution

Feel free to fork this repository, add your own samples, or enhance existing ones. Pull requests are always welcome!

## License

This repository is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

