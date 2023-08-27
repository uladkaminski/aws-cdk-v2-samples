import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    // S3 bucket
    const bucket = new s3.Bucket(this, 'uk-test-s3-bucket', {
      bucketName: 'uk-test-s3-bucket',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });


    const iamRole = new iam.Role(this, 'uk-test-s3-role', {
      roleName: 'uk-test-s3-role',
      description: 'Role for lambda to access S3',
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    iamRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'));

    const lambdaFunction = new lambda.Function(this, 'uk-test-s3-lambda', {
      functionName: 'uk-test-s3-lambda',
      description: 'Lambda to access S3',
      runtime: lambda.Runtime.PYTHON_3_8,
      handler: 'lambda_function.lambda_handler',
      code: lambda.Code.fromAsset('../service/'),
      role: iamRole,
      timeout: cdk.Duration.seconds(300),
      memorySize: 128,
      environment: {
        'BUCKET_NAME': bucket.bucketName,
      },
    });

    const restAPI = new apiGateway.LambdaRestApi(this, 'uk-test-s3-api', {
      handler: lambdaFunction,
      restApiName: 'uk-test-s3-api',
      description: 'API to access S3',
      deploy: true, 
      proxy: false,
    });

    const accountResource = restAPI.root.addResource('account');
    accountResource.addMethod('GET');
        
 
  }
}
