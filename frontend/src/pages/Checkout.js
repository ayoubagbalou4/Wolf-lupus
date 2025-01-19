import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { CartContext } from '../Context'

const Checkout = () => {

    const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useContext(CartContext);

    const navigate = useNavigate()
    const [loadingAddCustomer, setLoadingAddCustomer] = useState(false)
    const [customersData, setCustomersData] = useState({})
    const handleCustomer = (e) => {
        setCustomersData({ ...customersData, [e.target.name]: e.target.value })
    }

    const addCustomer = async (e) => {
        e.preventDefault()
        setLoadingAddCustomer(true)
        try {
            const response = await axios.post('/customers', customersData)
            setLoadingAddCustomer(false)
            navigate('/admin/customers')
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Add customer With Success",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error)
            setLoadingAddCustomer(false)
        }
    }

    return (
        <>
            <Navbar />
            <div className="checkout-container">
                <h1>Checkout</h1>

                <section className="billing-info">
                    <h2>Billing Information</h2>
                    <form id="billing-form" onSubmit={addCustomer}>
                        <input onChange={handleCustomer} name='name' type="text" placeholder="Name" required />
                        <input onChange={handleCustomer} name='email' type="text" placeholder="Email" required />
                        <input onChange={handleCustomer} name='phone' type="text" placeholder="Phone" required />
                        <input onChange={handleCustomer} name='billing_address' type="text" placeholder="Billing address" required />
                        <input onChange={handleCustomer} name='shipping_address' type="text" placeholder="Shipping address" required />
                    </form>
                </section>

                <section className="shipping-info">
                    <h2>Shipping Information</h2>
                    <label>
                        <input type="checkbox" id="same-as-billing" checked />
                        Use the same address as billing
                    </label>
                    <div id="shipping-details" className="hidden">
                        <input type="text" placeholder="Shipping Address" />
                        <input type="text" placeholder="City" />
                        <input type="text" placeholder="State" />
                        <input type="text" placeholder="ZIP/Postal Code" />
                    </div>
                </section>

                <section className="order-summary">
                    <h2>Order Summary</h2>
                    <ul>
                        {
                            cart.map((item) => (
                                <li>{item.name} <span>${item.quantity * item.price}</span></li>
                            ))
                        }
                        <li>Subtotal <span>${totalPrice.toFixed(2)}</span></li>
                        <li>Tax <span>$3.00</span></li>
                        <li>Shipping <span>$5.00</span></li>
                        <li className="total">Total <span>${totalPrice.toFixed(2) + 8}</span></li>
                    </ul>
                </section>

                <section className="payment-options">
                    <h2>Payment Options</h2>
                    <form id="payment-form">
                        <label>
                            <input type="radio" name="payment-method" value="card" checked />
                            Credit/Debit Card
                        </label>
                        <label>
                            <input type="radio" name="payment-method" value="paypal" />
                            PayPal
                        </label>
                        <label>
                            <input type="radio" name="payment-method" value="bank" />
                            Bank Transfer
                        </label>
                        <label>
                            <input type="radio" name="payment-method" value="cod" />
                            Cash on Delivery
                        </label>
                        <div className="card-details">
                            <input type="text" placeholder="Card Number" />
                            <input type="text" placeholder="Expiration Date (MM/YY)" />
                            <input type="text" placeholder="CVV" />
                        </div>
                    </form>
                </section>

                <section className="review-order">
                    <h2>Review Order</h2>
                    <p>Double-check your order and details before placing it.</p>
                </section>

                <button className="place-order-btn">Place Order</button>
            </div>
        </>
    )
}

export default Checkout