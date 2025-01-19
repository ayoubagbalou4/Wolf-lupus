const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) => {
    try {
        const { name, email, phone, billing_address, shipping_address } = req.body;
        const newCustomer = Customer({ name, email, phone, billing_address, shipping_address });
        await newCustomer.save();
        res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create customer', details: error.message });
    }
};

exports.getAllCustomers = async (req, res) => {
    try {
        const customer = await Customer.find();
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve customer', details: error.message });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({ error: 'customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve customer', details: error.message });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, billing_address, shipping_address } = req.body;
        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            { name, email, phone, billing_address, shipping_address },
            { new: true, runValidators: true }
        );
        if (!updatedCustomer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer updated successfully', customer: updatedCustomer });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Customer', details: error.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Customer', details: error.message });
    }
};

