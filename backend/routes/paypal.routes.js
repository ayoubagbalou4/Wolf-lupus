const express = require('express');
const { createPayment, executePayment } = require('../controllers/paypal.controller');

const router = express.Router();

router.post('/create-payment', createPayment);
router.post('/execute-payment', executePayment);

module.exports = router;
