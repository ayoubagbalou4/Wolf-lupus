import React, { useContext } from 'react';
import { CartContext } from '../Context';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useContext(CartContext);

    return (
        <>
            <Navbar />
            <section className="shopping-cart">
                <div className="container">
                    <h2>Your Shopping Cart</h2>
                    {cart.length > 0 ? (
                        <>
                            <div className="cart-items">
                                {cart.map((item) => (
                                    <div className="cart-item" key={item._id}>
                                        <div className="item-image">
                                            <img src={item.image_url} alt={item.name} />
                                        </div>
                                        <div className="item-details">
                                            <h3 className="item-name">{item.name}</h3>
                                            <p className="item-price">${item.price.toFixed(2)}</p>
                                            <div className="item-quantity">
                                                <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                                                <input
                                                    type="number"
                                                    id={`quantity-${item.id}`}
                                                    name="quantity"
                                                    value={item.quantity}
                                                    min="1"
                                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                    className="quantity-input"
                                                />
                                            </div>
                                            <p className="item-total">Total: ${(item.quantity * item.price).toFixed(2)}</p>
                                        </div>
                                        <button
                                            className="remove-item"
                                            onClick={() => removeFromCart(item._id)}
                                        >
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="cart-summary">
                                <div className="summary-item">
                                    <p><strong>Total Items:</strong> {totalItems}</p>
                                    <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
                                </div>
                                <Link to={'/checkout'} ><button className="btn checkout-btn">Proceed to Checkout</button></Link>
                            </div>
                        </>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Cart;
