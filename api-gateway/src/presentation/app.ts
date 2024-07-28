import cors from 'cors'
import express from 'express'
import '../infra/providers/kafka/consumers';


import { authenticateRoutes } from './routes/authenticate'
import { customer } from './routes/customers';

/**
 * Express application instance.
 */
const app = express()

/**
 * CORS options for allowing all origins.
 */
const corsOptions: cors.CorsOptions = {
  origin: '*',
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/', customer);
app.use('/api/', authenticateRoutes)


export { app }