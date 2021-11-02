#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { NetworkStack } from '../lib/network-stack';

const appName = 'sample';

const app = new cdk.App();
new NetworkStack(app, `${appName}-NetworkStack`);
