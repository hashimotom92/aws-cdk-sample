import * as cdk from '@aws-cdk/core';
import {RemovalPolicy} from '@aws-cdk/core';
import { 
  Repository,
  TagMutability
} from '@aws-cdk/aws-ecr';

export class EcrStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, appName: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ECR
    new Repository(this, `${appName}-backend`, {
      repositoryName: `${appName}-backend`,
      imageTagMutability: TagMutability.MUTABLE,
      removalPolicy: RemovalPolicy.DESTROY,
      imageScanOnPush: false
    });

    new Repository(this, `${appName}-frontend`, {
      repositoryName: `${appName}-frontend`,
      imageTagMutability: TagMutability.MUTABLE,
      removalPolicy: RemovalPolicy.DESTROY,
      imageScanOnPush: false
    });
  }
}
