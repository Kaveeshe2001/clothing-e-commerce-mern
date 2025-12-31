import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import { v2 as cloudinary } from "cloudinary";
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import profileRouter from './routes/profileRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middleware
app.use(express.json())
app.use(cors({
    origin: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'token'] // <--- ADD 'token' HERE
}));

//api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/profile', profileRouter)

app.get('/', (req, res) => {
    res.send("API Working")
})

app.get("/cloudinary-test", async (req, res) => {
  try {
    const result = await cloudinary.api.ping();
    res.json(result);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(port, () => console.log('Server started on PORT : '+ port))