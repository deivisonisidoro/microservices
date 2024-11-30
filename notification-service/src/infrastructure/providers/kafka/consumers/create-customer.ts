import { createCustomerComposer } from '../../../services/composers/costumer/createCustomer';
import { sendWelcomeEmailComposer } from '../../../services/composers/sendWelcomeEmail';
import { kafkaConsumer } from '../kafka.consumer';

export async function createCustomerConsumer() {
  const consumer = await kafkaConsumer('CUSTOMER_CREATED');

  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageToString = message.value?.toString();
      if (messageToString) {
        const jsonObject = JSON.parse(messageToString);
        await sendWelcomeEmailComposer(jsonObject);
        await createCustomerComposer({...jsonObject, externalId: jsonObject.id})
      }
    },
  });
}

createCustomerConsumer();
