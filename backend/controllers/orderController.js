import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// global variables
const currency = 'lkr'
const deliveryCharges = 10

// gateway initiallize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Save address to user profile
        await userModel.findByIdAndUpdate(req.userId, {
            $push: { addresses: address }
        });

        await userModel.findByIdAndUpdate(req.userId, {cartData: {}});

        res.json({ success: true, message: "Order Placed" }); 

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message }); 
    }
}

// Placing orders using Stripe method
const placeOrderStripe = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const { origin } = req.headers; 

        const orderData = {
            userId: req.userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharges * 100
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        });

        res.json({success:true,session_url:session.url});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message }); 
    }
}

// verify stripe
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}});
            res.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });  
    }
}

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

export {placeOrder, placeOrderStripe, allOrders, userOrders, UpdateStatus, verifyStripe}