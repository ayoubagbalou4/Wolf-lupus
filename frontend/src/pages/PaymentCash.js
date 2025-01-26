import React, { useContext, useState } from 'react';
import { CartContext } from '../Context';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import axios from 'axios';

const PaymentCash = () => {
    const { cart, totalItems, totalPrice } = useContext(CartContext);

    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        phone: '',
        address: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails({ ...customerDetails, [name]: value });
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();

        if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill out all customer details!',
            });
            return;
        }

        if (cart.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'Cart is empty',
                text: 'Add items to your cart before placing an order.',
            });
            return;
        }

        const orderData = {
            customerName: customerDetails.name,
            customerPhone: customerDetails.phone,
            customerAddress: customerDetails.address,
            totalAmount: totalPrice,
            items: cart.map((item) => ({
                productId: item._id,
                selectedSize: item.selectedSize.size,
                price: item.selectedSize.price,
                productName: item.name,
                quantity: item.quantity,
            })),
        };

        console.log(orderData)

        try {
            const response = await axios.post('/orders',orderData)
            console.log('Order submitted:', orderData);
            Swal.fire({
                icon: 'success',
                title: 'Order placed!',
                text: 'Your cash-on-delivery order has been placed successfully.',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to place the order. Please try again later.',
            });
        }
    };

    return (
        <>
            <Navbar />
            <h2 className="paymentCash">Cash on Delivery</h2>
            <form onSubmit={handleOrderSubmit} className="payment-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={customerDetails.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={customerDetails.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={customerDetails.address}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <h3 className="text-xl font-bold mb-2">Order Summary</h3>
                <div className="order-summary">
                    {cart.map((item, index) => (
                        <div key={`${item._id}-${index}`}>
                            <p>
                                <strong>{item.name}</strong> - {item.selectedSize.size}ml x {item.quantity} → $
                                {(item.selectedSize.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="total-summary">
                    <p>
                        <strong>Total Items:</strong> {totalItems}
                    </p>
                    <p>
                        <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
                    </p>
                </div>
                <button type="submit" className="place-order-btn">
                    Place Order
                </button>
            </form>
        </>
    );
};

export default PaymentCash;
