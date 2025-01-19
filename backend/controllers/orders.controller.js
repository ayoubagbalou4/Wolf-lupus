
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        const { customer_id, order_date, total_amount, status, shipping_fee, tax } = req.body;
        const newOrder = Order({ customer_id, order_date, total_amount, status, shipping_fee, tax });
        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order', details: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const order = await Order.find();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve order', details: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ error: 'order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve order', details: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { customer_id, order_date, total_amount, status, shipping_fee, tax } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { customer_id, order_date, total_amount, status, shipping_fee, tax },
            { new: true, runValidators: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Order', details: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Order', details: error.message });
    }
};

