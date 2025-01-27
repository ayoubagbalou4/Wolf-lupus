
const Review = require('../models/Review'); 

exports.createReview = async (req, res) => {
    try {
        const { product_id,comment,status } = req.body;
        const newReview = Review({ product_id,comment,status });
        await newReview.save();
        res.status(201).json({ message: 'Review created successfully', review: newReview });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create review', details: error.message });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const review = await Review.find().populate('product_id');
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve review', details: error.message });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.find({product_id:id});
        if (!review) {
            return res.status(404).json({ error: 'review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve review', details: error.message });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_id,comment,status } = req.body;
        const updatedReview = await Review.findByIdAndUpdate(
            id,
            { product_id,comment,status : status },
            { new: true, runValidators: true }
        );
        if (!updatedReview) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Review', details: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReview = await Review.findByIdAndDelete(id);
        if (!deletedReview) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Review', details: error.message });
    }
};

