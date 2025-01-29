const paypal = require('paypal-rest-sdk');
require('dotenv').config();

paypal.configure({
    mode: process.env.PAYPAL_MODE,
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_SECRET,
});

// Create Payment
exports.createPayment = (req, res) => {
    const { totalAmount, items } = req.body;

    const createPaymentJson = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal',
        },
        redirect_urls: {
            return_url: 'https://wolf-lupus.vercel.app/success',
            cancel_url: 'https://wolf-lupus.vercel.app/cancel',
        },
        transactions: [
            {
                item_list: {
                    items: items,
                },
                amount: {
                    currency: 'USD',
                    total: totalAmount,
                },
                description: 'Payment using PayPal',
            },
        ],
    };

    paypal.payment.create(createPaymentJson, (error, payment) => {
        if (error) {
            return res.status(500).json({ error });
        } else {
            res.json({ id: payment.id });
        }
    });
};

// Execute Payment
exports.executePayment = (req, res) => {
    const { paymentId, payerId, totalAmount } = req.body;

    const executePaymentJson = {
        payer_id: payerId,
        transactions: [
            {
                amount: {
                    currency: 'USD',
                    total: totalAmount,
                },
            },
        ],
    };

    paypal.payment.execute(paymentId, executePaymentJson, (error, payment) => {
        if (error) {
            return res.status(500).json({ error });
        } else {
            res.json(payment);
        }
    });
};
