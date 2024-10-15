import { EnvironmentVariables } from "../infra/configs/EnvironmentVariables";

const env = EnvironmentVariables.getInstance();
const URL = {
  CUSTOMERS_API_URL: env.geCustomerApiURL(),
  EMAILS_API_URL: 'http://email-api:3002',
};

export { URL };
