import json
import os

def lambda_handler(event, context):
    environment = os.environ['ENVIRONMENT']

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda on ' + environment)
    }