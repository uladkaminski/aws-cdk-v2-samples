import json
import boto3
import os

client = boto3.client('s3')

def lambda_handler(event, context):
    response = client.get_object(
        Bucket=os.environ['BUCKET_NAME'],
        Key='account.json'
    )

    data_bytes = response['Body'].read()
    data_string = data_bytes.decode('utf-8')
    data_json = json.loads(data_string)

    return {
        'statusCode': 200,
        'body': json.dumps(data_json),
        'headers': {
            'Content-Type': 'application/json',
        }
    }