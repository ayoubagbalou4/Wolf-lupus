import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
                                {cart.map((item, index) => (
                                    <div className="cart-item" key={`${item._id}-${item.selectedSize.size}-${index}`}>
                                        <div className="item-image">
                                            <img src={item.image_url} alt={item.name} />
                                        </div>
                                        <div className="item-details">
                                            <h3 className="item-name">{item.name}</h3>
                                            <p className="item-size">
                                                Size: {item.selectedSize.size}ml → ${item.selectedSize.price.toFixed(2)}
                                            </p>
                                            <div className="item-quantity">
                                                <label htmlFor={`quantity-${index}`}>Quantity:</label>
                                                <input
                                                    type="number"
                                                    id={`quantity-${index}`}
                                                    value={item.quantity}
                                                    min="1"
                                                    onChange={(e) =>
                                                        updateQuantity(item._id, item.selectedSize.size, parseInt(e.target.value))
                                                    }
                                                    className="quantity-input"
                                                />
                                            </div>
                                            <p className="item-total">
                                                Total: ${(item.quantity * item.selectedSize.price).toFixed(2)}
                                            </p>
                                        </div>
                                        <button
                                            className="remove-item"
                                            onClick={() => removeFromCart(item._id, item.selectedSize.size)}
                                        >
                                            <i className="fa fa-trash"></i> Remove
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-summary">
                                <div className="summary-item">
                                    <p>
                                        <strong>Total Items:</strong> {totalItems}
                                    </p>
                                    <p>
                                        <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
                                    </p>
                                </div>
                                <Link to="/checkout">
                                    <button className="btn checkout-btn">Proceed to Checkout</button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="empty-cart">
                            <p>Your cart is empty. Start adding items to your cart!</p>
                            <Link to="/">
                                <button className="btn shop-btn">Shop Now</button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
            {/* <Footer /> */}
        </>
    );
};

export default Cart;
