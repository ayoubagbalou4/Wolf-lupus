
const OrderItem = require('../models/OrderItem');

exports.createOrderItem = async (req, res) => {
    try {
        const { order_id, product_id, quantity, price } = req.body;
        const newOrderItem = newOrderItem({ order_id, product_id, quantity, price });
        await newOrderItem.save();
        res.status(201).json({ message: 'OrderItem created successfully', orderItem: newOrderItem });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create orderItem', details: error.message });
    }
};

exports.getAllOrderItems = async (req, res) => {
    try {
        const orderItem = await OrderItem.find();
        res.status(200).json(orderItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve orderItem', details: error.message });
    }
};

exports.getOrderItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const orderItem = await OrderItem.findById(id);
        if (!orderItem) {
            return res.status(404).json({ error: 'orderItem not found' });
        }
        res.status(200).json(orderItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve orderItem', details: error.message });
    }
};

exports.updateOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { order_id, product_id, quantity, price } = req.body;
        const updatedOrderItem = await OrderItem.findByIdAndUpdate(
            id,
            { order_id, product_id, quantity, price },
            { new: true, runValidators: true }
        );
        if (!updatedOrderItem) {
            return res.status(404).json({ error: 'OrderItem not found' });
        }
        res.status(200).json({ message: 'OrderItem updated successfully', orderItem: updatedOrderItem });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update OrderItem', details: error.message });
    }
};

exports.deleteOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrderItem = await OrderItem.findByIdAndDelete(id);
        if (!deletedOrderItem) {
            return res.status(404).json({ error: 'OrderItem not found' });
        }
        res.status(200).json({ message: 'OrderItem deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete OrderItem', details: error.message });
    }
};

