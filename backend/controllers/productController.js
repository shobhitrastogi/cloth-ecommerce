
import fs from "fs";
// import productModel from './../models/productModel'
import productModel from '../models/productModel.js';
;
const getProduct = async (req, res) => {
  const { id } = req.params; // Get the ID from the URL params

  try {
    const product = await productModel.findById(id); // Find the product by ID
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: product }); // Return the product data
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error retrieving product" });
  }
};
const addProduct = async (req, res) => {
  const { name, description, price, category } = req.body;
 console.log(req.file);
  if (!req.body.image) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const image_filename = req.body.image;

  const product = new productModel({
    name,
    description,
    price,
    category,
    image: image_filename
  });

  try {
    await product.save();
    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error adding product" });
  }
};


const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    fs.unlink(`uploads/${product.image}`, () => {});
    await productModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addProduct, listProduct, removeProduct ,getProduct};