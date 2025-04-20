import cors from 'cors'
import express from 'express'
import '../infra/providers/kafka/consumers';
import rateLimit  from 'express-rate-limit';

import { authenticateRoutes } from './routes/authenticate'
import { customer } from './routes/customers';

/**
 * Express application instance.
 */
const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: 'Too many requests from this IP, please try again later.',
});


/**
 * CORS options for allowing all origins.
 */
const corsOptions: cors.CorsOptions = {
  origin: '*',
}

app.use(limiter)
app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/', customer);
app.use('/api/', authenticateRoutes)
app.get('/', (req, res) => {
  res.send('Hello, API Gateway!');
});


export { app }