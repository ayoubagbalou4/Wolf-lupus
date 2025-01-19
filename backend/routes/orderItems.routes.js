
const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItems.controller');

router.post('/orderItems', orderItemController.createOrderItem);
router.get('/orderItems', orderItemController.getAllOrderItems);
router.get('/orderItems/:id', orderItemController.getOrderItemById);
router.put('/orderItems/:id', orderItemController.updateOrderItem);
router.delete('/orderItems/:id', orderItemController.deleteOrderItem);

module.exports = router;
