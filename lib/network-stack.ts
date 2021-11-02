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

    const vpc = new Vpc(this, `${appName}-vpc`, {
      cidr: "10.0.0.0/16",
      defaultInstanceTenancy: DefaultInstanceTenancy.DEFAULT,
      enableDnsSupport: true,
      enableDnsHostnames: true,
      subnetConfiguration: []
    })
  }
}
