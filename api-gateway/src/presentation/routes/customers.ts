import { Router } from "express";
import httpProxy from 'express-http-proxy'
import { URL } from '../URLs'
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const customer = Router();

const customersServiceProxy = httpProxy(URL.CUSTOMERS_API_URL);
const emailsServiceProxy = httpProxy(URL.EMAILS_API_URL);

customer.post('/customers', (req, res, next) => customersServiceProxy(req, res, next));
customer.get('/customers', ensureAuthenticated, (req, res, next) => customersServiceProxy(req, res, next));
customer.get('/customers/:id', ensureAuthenticated, (req, res, next) => customersServiceProxy(req, res, next));
customer.patch('/customers/:id', ensureAuthenticated, (req, res, next) => customersServiceProxy(req, res, next));
customer.put('/customers/:id', ensureAuthenticated, (req, res, next) => customersServiceProxy(req, res, next));
customer.delete('/customers/:id', ensureAuthenticated, (req, res, next) => customersServiceProxy(req, res, next));
customer.all('/emails', ensureAuthenticated, (req, res, next) => emailsServiceProxy(req, res, next));


export { customer };