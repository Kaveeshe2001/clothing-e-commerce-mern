import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, colors, bestseller } = req.body

        let parsedSizes = [];
        let parsedColors = [];

        if (sizes) {
            parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
        }

        if (colors) {
            parsedColors = typeof colors === "string" ? JSON.parse(colors) : colors;
        }

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        // image convert to imageUrl using cloudinary
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url
            })
        )

        // create new product
        const productData = {
            name, 
            description, 
            price: Number(price), 
            category, 
            subCategory, 
            sizes: parsedSizes,
            colors: parsedColors,
            bestseller: bestseller === "true" ? true : false,
            image: imagesUrl,
            date: Date.now()
        }

        const product = new productModel(productData);
        await product.save()

        res.json({success: true, message: 'Product Added'})
    } catch (error) {
       console.log(error);
       res.json({ success: false, message: error.message }) 
    }
}

//function for list product
const listProduct = async (req, res) => {}

// function for remove product
const removeProduct = async (req, res) => {}

//function for single product info
const singleProduct = async (req, res) => {}

export { listProduct, addProduct, removeProduct, singleProduct}