import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing orders using COD method
const placeOrder = async (req, res) => {
    try {
        const { items, amount, address } = req.body

        const orderData = {
            userId: req.userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        console.log("USER ID:", req.userId);

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(req.userId, {cartData: {}});

        res.json({ success: true, message: "Order Placed" }); 

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message }); 
    }
}

// Placing orders using Stripe method
const placeOrderStripe = async (req, res) => {}

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true, orders});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// User Orders data for Frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.userId });
        res.json({ success: true, orders });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Update Order Status from Admin Panel
const UpdateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body

        console.log("ORDER ID:", orderId);
        console.log("NEW STATUS:", status);

        const updateOrder = await orderModel.findByIdAndUpdate(orderId, {status}, {new:true});

        if (!updateOrder) {
            return res.json({ success: false, message: "Order not found" });
        }

        res.json({success: true, message: 'Status Updated', order: updateOrder});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {placeOrder, placeOrderStripe, allOrders, userOrders, UpdateStatus}