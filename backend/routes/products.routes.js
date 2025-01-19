
const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller');

router.post('/products', productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.get('/productsByCategory/:id', productController.getProductByCategory);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.get('/counts', productController.getCounts);
router.delete('/removePriceField', productController.removePriceField);

module.exports = router;
