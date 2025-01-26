const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { customerName, customerPhone, customerAddress, items, totalAmount } = req.body;

    // Create a new order
    const newOrder = new Order({
      customerName, 
      customerPhone,
      customerAddress,
      totalAmount,
      items,
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve orders', details: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve order', details: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order', details: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }


    res.status(200).json({ message: 'Order and order items deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order', details: error.message });
  }
};
