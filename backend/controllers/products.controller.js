const Category = require('../models/Category'); 
const Product = require('../models/Product'); 
const Review = require('../models/Review'); 
const Order = require('../models/Order');


exports.getCounts = async (req, res) => {

    try {
        const categoryCount = await Category.countDocuments();
        const productCount = await Product.countDocuments();
        const reviewsCount = await Review.countDocuments();
        const ordersCount = await Order.countDocuments();

        res.json({
            categoryCount, 
            productCount,
            reviewsCount,
            ordersCount
        });
    } catch (error) {
        console.error('Error fetching counts:', error);
        res.status(500).json({ message: 'Failed to retrieve data', error: error.message });
    }
};

// exports.createProduct = async (req, res) => {
//     try {
//         const { name,description,sizes,stock_quantity,category_id,image_url } = req.body;
//         const newProduct = Product({ name,description,sizes,stock_quantity,category_id,image_url });
//         await newProduct.save();
//         res.status(201).json({ message: 'Product created successfully', product: newProduct });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create product', details: error.message });
//     }
// };


exports.createProduct = async (req, res) => {
    try {
        const products = req.body;
        const newProducts = await Product.insertMany(products);
        res.status(201).json({ message: 'Products created successfully', products: newProducts });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create products', details: error.message });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const product = await Product.find().populate('category_id');
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve product', details: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('category_id');
        if (!product) {
            return res.status(404).json({ error: 'product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve product', details: error.message });
    }
};

exports.getProductByCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.find({category_id : id}).populate('category_id');
        if (!products) {
            return res.status(404).json({ error: 'products not found' });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve product', details: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name,description,sizes,stock_quantity,category_id,image_url } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name,description,sizes,stock_quantity,category_id,image_url },
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Product', details: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Product', details: error.message });
    }
};

exports.removePriceField = async (req, res) => {
    try {
        const result = await Product.updateMany({}, { $unset: { "price": "" } });
        console.log("Result of updateMany:", result); // Debugging line
        res.status(200).json({
            message: `${result.modifiedCount || 0} products updated.`,
        });
    } catch (error) {
        console.error("Error updating products:", error);
        res.status(500).json({
            message: "An error occurred while updating products.",
            error: error.message,
        });
    }
};

