import express from 'express'
import { allOrders, placeOrder, placeOrderStripe, UpdateStatus, userOrders } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list-order',adminAuth, allOrders)
orderRouter.post('/status',adminAuth, UpdateStatus)

// Payment Features
orderRouter.post('/place',authUser, placeOrder)
orderRouter.post('/stripe',authUser, placeOrderStripe)

// User Feature
orderRouter.post('/userorders',authUser, userOrders)

export default orderRouter;