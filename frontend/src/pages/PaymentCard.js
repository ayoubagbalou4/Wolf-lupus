import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PayPalButton from '../components/PayPalButton';
import { CartContext } from '../Context';

const PaymentCard = () => {
    const { totalPrice, cart } = useContext(CartContext);
    const [paid, setPaid] = useState(false);

    const handleSuccess = (details) => {
        console.log('Transaction completed by:', details.payer.name.given_name);
        console.log('Transaction details:', details);
        setPaid(true);
    };

    return (
        <>
            <Navbar />
            <section className="payment-card">
                <div className="container">
                    <h2 className="payment-title">{paid ? 'Payment Successful!' : 'Complete Your Payment'}</h2>

                    {cart.length > 0 ? (
                        !paid ? (
                            <>
                                <div className="payment-summary">
                                    <h3>Total Amount: ${totalPrice.toFixed(2)}</h3>
                                    <p>Please proceed with your payment using PayPal.</p>
                                </div>
                                <div className="paypal-button-container">
                                    <PayPalButton totalAmount={totalPrice.toFixed(2)} onSuccess={handleSuccess} />
                                </div>
                            </>
                        ) : (
                            <div className="payment-success">
                                <h3>Thank you for your purchase!</h3>
                                <p>Your transaction was successful. You will receive an email confirmation shortly.</p>
                            </div>
                        )
                    ) : (
                        <div className="empty-cart">
                            <p>Your cart is empty. Please add items to proceed to payment.</p>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default PaymentCard;
