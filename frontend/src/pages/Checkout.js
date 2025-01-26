import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CartContext } from '../Context';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const Checkout = () => {
    const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useContext(CartContext);

    const [amount, setAmount] = useState("");

    const handlePaymentSuccess = (details, data) => {
        alert("Transaction completed by " + details.payer.name.given_name);
        console.log({ details, data });
    };

    return (
        <>
            <Navbar />
            <div className="checkout-page">
                <div>
                    <h2>PayPal Payment</h2>
                    <input
                        type="number"
                        placeholder="Enter Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <PayPalScriptProvider
                        options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}
                    >
                        <PayPalButtons
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [{ amount: { value: amount } }],
                                });
                            }}
                            onApprove={(data, actions) => {
                                return actions.order.capture().then((details) => {
                                    handlePaymentSuccess(details, data);
                                });
                            }}
                        />
                    </PayPalScriptProvider>
                </div>
            </div>
        </>
    );
};

export default Checkout;
