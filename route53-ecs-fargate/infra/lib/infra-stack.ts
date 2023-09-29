import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as fs from 'fs';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'MyVPC', { maxAzs: 3 });
    const cluster = new ecs.Cluster(this, 'EcsCluster', { vpc });
    const ecrRepository = ecr.Repository.fromRepositoryName(this, 'EcrRepo', 'your-repo-name');
    const taskDef = new ecs.FargateTaskDefinition(this, 'TaskDef');
    const envVariables = JSON.parse(fs.readFileSync('env.json', 'utf-8'));


    const container = taskDef.addContainer('AppContainer', {
        image: ecs.ContainerImage.fromEcrRepository(ecrRepository),
        memoryLimitMiB: 512,
        cpu: 256,
        logging: new ecs.AwsLogDriver({ streamPrefix: 'AppContainer' }),
        environment: {
        },

    });

     // ACM Certificate
     const zone = route53.HostedZone.fromLookup(this, 'Zone', { domainName: 'example.com' });
     const cert = new acm.Certificate(this, 'Certificate', {
      domainName: 'test.example.com',
      subjectAlternativeNames: ['cool.example.com', 'test.example.net'],
      validation: acm.CertificateValidation.fromDnsMultiZone({
        'test.example.com': zone,
      }),
    });
     
 
    container.addPortMappings({ containerPort: 80 });
    const fargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service', {
        cluster,
        taskDefinition: taskDef,
        publicLoadBalancer: true, // if you want the LB to be internet-facing,
        desiredCount: 2, // amount of instances
    });

    new route53.ARecord(this, 'SubdomainRecord', {
        zone: zone,
        recordName: 'test.example.com',
        target: route53.RecordTarget.fromAlias(new route53Targets.LoadBalancerTarget(fargateService.loadBalancer))
    });

  }
}



