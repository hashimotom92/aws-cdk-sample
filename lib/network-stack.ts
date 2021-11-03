import * as cdk from '@aws-cdk/core';
import {
  DefaultInstanceTenancy,
  RouterType,
  Vpc,
  Subnet,
  CfnInternetGateway,
  CfnVPCGatewayAttachment
} from "@aws-cdk/aws-ec2"

export class NetworkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, appName: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // vpc
    const vpc = new Vpc(this, `${appName}-vpc`, {
      cidr: "10.0.0.0/16",
      defaultInstanceTenancy: DefaultInstanceTenancy.DEFAULT,
      enableDnsSupport: true,
      enableDnsHostnames: true,
      subnetConfiguration: []
    })

    // ingress subnet
    new Subnet(this, `${appName}-subnet-pulic-ingress-1a`, {
      availabilityZone: "ap-northeast-1a",
      vpcId: vpc.vpcId,
      cidrBlock: "10.0.0.0/24"
    })
    new Subnet(this, `${appName}-subnet-pulic-ingress-1c`, {
      availabilityZone: "ap-northeast-1c",
      vpcId: vpc.vpcId,
      cidrBlock: "10.0.1.0/24"
    })

    // application subnet
    new Subnet(this, `${appName}-subnet-private-container-1a`, {
      availabilityZone: "ap-northeast-1a",
      vpcId: vpc.vpcId,
      cidrBlock: "10.0.8.0/24"
    })
    new Subnet(this, `${appName}-subnet-private-container-1c`, {
      availabilityZone: "ap-northeast-1c",
      vpcId: vpc.vpcId,
      cidrBlock: "10.0.9.0/24"
    })

    // db subnet
    new Subnet(this, `${appName}-subnet-private-db-1a`, {
      availabilityZone: "ap-northeast-1a",
      vpcId: vpc.vpcId,
      cidrBlock: "10.0.16.0/24"
    })
    new Subnet(this, `${appName}-subnet-private-db-1c`, {
      availabilityZone: "ap-northeast-1c",
      vpcId: vpc.vpcId,
      cidrBlock: "10.0.17.0/24"
    })

    // management subnet
    new Subnet(this, `${appName}-subnet-pulic-management-1a`, {
      availabilityZone: "ap-northeast-1a",
      vpcId: vpc.vpcId,
      cidrBlock: "10.0.240.0/24"
    })
    new Subnet(this, `${appName}-subnet-pulic-management-1c`, {
      availabilityZone: "ap-northeast-1c",
      vpcId: vpc.vpcId,
      cidrBlock: "10.0.241.0/24"
    })

    // IGW
    const internetGateway = new CfnInternetGateway(this, "InternetGateway", {})
    new CfnVPCGatewayAttachment(this, "igwAttachment", {
      vpcId: vpc.vpcId,
      internetGatewayId: internetGateway.ref
    })
  }
}
