import { CompressionTypes } from 'kafkajs';

import { kafka } from '.';
import { AbstractKafkaProducer } from '../../../application/providers/kafka/producer';

/**
 * Class to send messages to a Kafka topic.
 */
export class KafkaProducer implements AbstractKafkaProducer {
  /**
   * Executes sending a message to the specified Kafka topic.
   *
   * @param topic - The name of the Kafka topic to send the message to.
   * @param payload - The payload of the message to be sent.
   * @returns A Promise that resolves when the message is successfully sent.
   */
  async execute(topic: string, payload: any): Promise<void> {
    const producer = kafka.producer({
      allowAutoTopicCreation: true,
    });

    await producer.connect();
    await producer.send({
      topic,
      compression: CompressionTypes.GZIP,
      messages: [
        {
          value: JSON.stringify(payload),
        },
      ],
    });

    await producer.disconnect();
  }
}
