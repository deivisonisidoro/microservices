/**
 * Abstract class for sending messages to a Kafka topic.
 */
export abstract class AbstractKafkaProducer {
  /**
   * Executes sending a message to the specified Kafka topic.
   *
   * @param topic - The name of the Kafka topic to send the message to.
   * @param payload - The payload of the message to be sent.
   * @returns A Promise that resolves when the message is successfully sent.
   */
  abstract execute(topic: string, payload: any): Promise<void>;
}
