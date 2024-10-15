import { EnvironmentVariables } from '../infra/configs/EnvironmentVariables';
import { app } from './app'



const env = EnvironmentVariables.getInstance();

/**
 * Port number for the server to listen on.
 * Default is 3333, can be overridden with the PORT environment variable.
 */

/**
 * Start the server and listen on the specified port.
 */
app.listen(env.getHostPort(), () =>
  console.log(`Server is running in http://${env.getHostIp()}:${env.getHostPort()}`)
)