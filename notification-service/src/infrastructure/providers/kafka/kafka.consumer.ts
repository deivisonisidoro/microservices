import { kafka } from '.';

export const kafkaConsumer = async (topic: string) => {
  const consumer = kafka.consumer({ groupId: 'EMAIL-GROUP' });
  await consumer.connect();

  await consumer.subscribe({
    topics: [topic],
    fromBeginning: true,
  });
  return consumer;
};
