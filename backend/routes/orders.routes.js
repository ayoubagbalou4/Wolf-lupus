const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');

router.post('/orders', ordersController.createOrder);

router.get('/orders', ordersController.getAllOrders);

router.get('/orders/:id', ordersController.getOrderById);

router.put('/orders/:id', ordersController.updateOrder);

router.delete('/orders/:id', ordersController.deleteOrder);

module.exports = router;
