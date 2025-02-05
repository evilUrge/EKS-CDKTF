# EKS-CDKTF - WIP
## Overview

This project demonstrates a simple Express service running on AWS EKS, orchestrated using Terraform and AWS CDK.

## Prerequisites

- AWS account
- AWS CLI configured
- Node.js v22.13.1
- Terraform installed

## Setup

1. **Clone the repository:**
  ```sh
  git clone https://github.com/yourusername/EKS-CDKTF.git
  cd EKS-CDKTF
  ```

2. **Install dependencies:**
  ```sh
  yarn install
  ```

3. **Deploy infrastructure using Terraform:**
  ```sh
  terraform init
  terraform apply
  ```

4. **Deploy the CDK stack:**
  ```sh
  cdk deploy
  ```

## Usage

After deployment, the Express service will be running on an EKS cluster. You can access it via the provided Load Balancer URL.

## Cleanup

To remove all resources created by this project:

1. **Destroy the CDK stack:**
  ```sh
  cdk destroy
  ```

2. **Destroy the Terraform infrastructure:**
  ```sh
  terraform destroy
  ```

## License

This project is licensed under the MIT License.

## TODO:
  - [X] Create a generic CDK construct for stack
  - [ ] Include terraform files
  - [ ] Include some jest tests
