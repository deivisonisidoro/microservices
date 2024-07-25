import Fastify from 'fastify';
import '../../infrastructure/providers/kafka/consumers';
import winston from 'winston';

const app = Fastify();
const logger = winston.createLogger({
  level: 'info', // Set log level
  format: winston.format.json(), // Use JSON format for logs
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'combined.log' }), // Log to a file
  ],
});

export { app, logger };
