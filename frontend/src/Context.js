import React, { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity = 1) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) => item._id === product._id && item.selectedSize.size === product.selectedSize.size
            );

            if (existingItem) {
                return prevCart.map((item) =>
                    item._id === product._id && item.selectedSize.size === product.selectedSize.size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity }];
            }
        });

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Added to cart!',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        });
    };

    const removeFromCart = (productId, size) => {
        setCart((prevCart) =>
            prevCart.filter(
                (item) => item._id !== productId || item.selectedSize.size !== size
            )
        );

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: 'Removed from cart!',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        });
    };

 
    const updateQuantity = (productId, size, quantity) => {
        if (quantity < 1) return; // Ensure quantity is at least 1

        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === productId && item.selectedSize.size === size
                    ? { ...item, quantity }
                    : item
            )
        );
    };


    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);


    const totalPrice = cart.reduce(
        (sum, item) => sum + item.quantity * item.selectedSize.price,
        0
    );

    useEffect(() => {
        console.log('Cart updated:', cart);
    }, [cart]);

    const contextValues = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
    };

    return (
        <CartContext.Provider value={contextValues}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
