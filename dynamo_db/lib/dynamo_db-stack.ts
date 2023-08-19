import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class DynamoDbStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Table
    const table = new dynamodb.Table(this, 'uk-dynamodb-table', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'dynamo_db_table',

      // Read/Write Capacity
      readCapacity: 3,
      writeCapacity: 3,

      // Removal Policy
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    
  }
}
