import { EnvironmentVariables } from '../../infrastructure/config/EnvironmentVariables';
import { app, logger } from './app';

/**
 * Starts the server.
 */
const start = async () => {
  try {
    /**
     * Retrieves environment variables for server configuration.
     */
    const env = EnvironmentVariables.getInstance();

    /**
     * Starts the server and logs the server's address.
     */
    app.listen({ port: 3001 }, () => {
      logger.info(
        `Server is running on http://${env.getHostIp()}:${env.getHostPort()}`,
      );
    });
  } catch (error) {
    /**
     * Logs an error if the server fails to start and exits the process with an error code.
     */
    logger.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

/**
 * Calls the start function to initiate the server.
 */
start();
