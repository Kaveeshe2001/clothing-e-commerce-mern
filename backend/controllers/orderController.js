import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel";

// Placing orders using COD method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {cartData: {}});

        res.json({ success: true, message: "Order Placed" }); 

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message }); 
    }
}

// Placing orders using Stripe method
const placeOrderStripe = async (req, res) => {}

// All Orders data for Admin Panel
const allOrders = async (req, res) => {}

// User Orders data for Frontend
const userOrders = async (req, res) => {}

// Update Order Status from Admin Panel
const UpdateStatus = async (req, res) => {}

export {placeOrder, placeOrderStripe, allOrders, userOrders, UpdateStatus}