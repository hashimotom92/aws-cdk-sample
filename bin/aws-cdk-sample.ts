#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { AwsCdkSampleStack } from '../lib/aws-cdk-sample-stack';

const app = new cdk.App();
new AwsCdkSampleStack(app, 'AwsCdkSampleStack');
