import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ChoosePayment = () => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleProceed = () => {
        if (paymentMethod === 'card') {
            navigate('/payment-card');  
        } else if (paymentMethod === 'cash') {
            navigate('/payment-cash'); 
        }
    };

    return (
        <>
        <Navbar />
        <div className="choose-payment">
            <h2>Choose Payment Method</h2>
            <select value={paymentMethod} onChange={handleChange} className="payment-select">
                <option value="card">Pay with Card</option>
                <option value="cash">Cash on Delivery</option>
            </select>
            <div className="payment-message">
                {paymentMethod === 'card' && <p>You have chosen to pay with a card.</p>}
                {paymentMethod === 'cash' && <p>You have chosen to pay cash on delivery.</p>}
            </div>
            <button onClick={handleProceed} className="proceed-button">Proceed</button>
        </div>
        </>
    );
};

export default ChoosePayment;
