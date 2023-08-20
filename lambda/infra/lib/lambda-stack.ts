import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaDemo = new lambda.Function(this, 'uk-lambda-function', {
      functionName: 'uk-lambda-function',
      code: lambda.Code.fromAsset('../service/'),
      handler: 'lambda_function.lambda_handler',
      runtime: lambda.Runtime.PYTHON_3_11
    });

    lambdaDemo.addEnvironment('ENVIRONMENT', 'dev');

    const cloudwatchDemo = new cloudwatch.Alarm(this, 'uk-lambda-alarm', {
      metric: lambdaDemo.metricErrors(),
      threshold: 1,
      evaluationPeriods: 1,
      alarmName: 'uk-lambda-alarm',
    });
    
  }
}
