import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { AnyPrincipal, PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class S3BucketStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create private versioned S3 bucket
    const s3BucketPrivate = new s3.Bucket(this, 'uk-demo-private-bucket', {
      bucketName: 'uk-demo-private-bucket',
      publicReadAccess: false,
      versioned: true,
    });

    // Create the most public S3 bucket in the world
    const s3PublicBucket = new s3.Bucket(this, 'uk-demo-public-bucket', {
      bucketName: 'uk-demo-public-bucket',
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
      objectOwnership: s3.ObjectOwnership.OBJECT_WRITER,
      versioned: false,
    });

    s3PublicBucket.addToResourcePolicy(
      new PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [`${s3PublicBucket.bucketArn}/*`],
        principals: [new AnyPrincipal()],
      })
    );
  }
}
