import { Kafka, logLevel } from 'kafkajs';

import { EnvironmentVariables } from '../../configs/EnvironmentVariables';

const env = EnvironmentVariables.getInstance();
const kafka = new Kafka({
  clientId: 'costumer-app',
  brokers: [`${env.getHostIp()}:9092`],
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
  logLevel: logLevel.ERROR,
});

export { kafka };
