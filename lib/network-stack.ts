import * as cdk from '@aws-cdk/core';
import {
  DefaultInstanceTenancy,
  CfnRouteTable,
  CfnRoute,
  CfnSubnetRouteTableAssociation,
  Vpc,
  CfnSubnet,
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

    // IGW
    const internetGateway = new CfnInternetGateway(this, "InternetGateway", {})
    new CfnVPCGatewayAttachment(this, "igwAttachment", {
      vpcId: vpc.vpcId,
      internetGatewayId: internetGateway.ref
    })

    // ingress subnet
    const pubSubentIngress1A = new CfnSubnet(this, `${appName}-subnet-pulic-ingress-1a`, {
      availabilityZone: "ap-northeast-1a",
      vpcId: vpc.vpcId,
      cidrBlock: "10.0.0.0/24"
    })
    const pubSubentIngress1C = new CfnSubnet(this, `${appName}-subnet-pulic-ingress-1c`, {
      availabilityZone: "ap-northeast-1c",
      vpcId: vpc.vpcId,
      cidrBlock: "10.0.1.0/24"
    })

    // application subnet
    const priSubnetApp1A = new CfnSubnet(this, `${appName}-subnet-private-app-1a`, {
      availabilityZone: "ap-northeast-1a",
      vpcId: vpc.vpcId,
      cidrBlock: "10.0.8.0/24"
    })
    const priSubnetApp1C =new CfnSubnet(this, `${appName}-subnet-private-app-1c`, {
      availabilityZone: "ap-northeast-1c",
      vpcId: vpc.vpcId,
      cidrBlock: "10.0.9.0/24"
    })

    // db subnet
    const priSubnetDB1A = new CfnSubnet(this, `${appName}-subnet-private-db-1a`, {
      availabilityZone: "ap-northeast-1a",
      vpcId: vpc.vpcId,
      cidrBlock: "10.0.16.0/24"
    })
    const priSubnetDB1C = new CfnSubnet(this, `${appName}-subnet-private-db-1c`, {
      availabilityZone: "ap-northeast-1c",
      vpcId: vpc.vpcId,
      cidrBlock: "10.0.17.0/24"
    })

    // management subnet
    const pubSubentManagement1A = new CfnSubnet(this, `${appName}-subnet-pulic-management-1a`, {
      availabilityZone: "ap-northeast-1a",
      vpcId: vpc.vpcId,
      cidrBlock: "10.0.240.0/24"
    })
    const pubSubentManagement1C = new CfnSubnet(this, `${appName}-subnet-pulic-management-1c`, {
      availabilityZone: "ap-northeast-1c",
      vpcId: vpc.vpcId,
      cidrBlock: "10.0.241.0/24"
    })

    // Public RouteTable
    const publicRouteTable = new CfnRouteTable(this, 'PublicRouteTable', {
      vpcId: vpc.vpcId,
    })
    new CfnRoute(this, 'PublicRoute', {
      routeTableId: publicRouteTable.ref,
      destinationCidrBlock: '0.0.0.0/0',
      gatewayId: internetGateway.ref,
    })
    new CfnSubnetRouteTableAssociation(this, 'PublicSubnetIngress1ARouteTableAssociation', {
      routeTableId: publicRouteTable.ref,
      subnetId: pubSubentIngress1A.ref
    })
    new CfnSubnetRouteTableAssociation(this, 'PublicSubnetIngress1CRouteTableAssociation', {
      routeTableId: publicRouteTable.ref,
      subnetId: pubSubentIngress1C.ref
    })
    new CfnSubnetRouteTableAssociation(this, 'PublicSubnetManagement1ARouteTableAssociation', {
      routeTableId: publicRouteTable.ref,
      subnetId: pubSubentManagement1A.ref
    })
    new CfnSubnetRouteTableAssociation(this, 'PublicSubnetManagement1CRouteTableAssociation', {
      routeTableId: publicRouteTable.ref,
      subnetId: pubSubentManagement1C.ref
    })

    // Application RouteTable
    const privateAppTable = new CfnRouteTable(this, 'PrivateAppRouteTable', {
      vpcId: vpc.vpcId,
    })
    new CfnSubnetRouteTableAssociation(this, 'PrivateSubnetApp1ARouteTableAssociation', {
      routeTableId: privateAppTable.ref,
      subnetId: priSubnetApp1A.ref
    })
    new CfnSubnetRouteTableAssociation(this, 'PrivateSubnetApp1CRouteTableAssociation', {
      routeTableId: privateAppTable.ref,
      subnetId: priSubnetApp1C.ref
    })

    // DB RouteTable
    const privateDBTable = new CfnRouteTable(this, 'PrivateDBRouteTable', {
      vpcId: vpc.vpcId,
    })
    new CfnSubnetRouteTableAssociation(this, 'PrivateSubnetDB1ARouteTableAssociation', {
      routeTableId: privateDBTable.ref,
      subnetId: priSubnetDB1A.ref
    })
    new CfnSubnetRouteTableAssociation(this, 'PrivateSubnetDB1CRouteTableAssociation', {
      routeTableId: privateDBTable.ref,
      subnetId: priSubnetDB1C.ref
    })
  }
}
