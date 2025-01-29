import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = ({ totalAmount, onSuccess }) => {
    return (
        <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: { value: totalAmount },
                        },
                    ],
                });
            }}
            onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                    onSuccess(details);
                });
            }}
        />
    );
};

export default PayPalButton;
