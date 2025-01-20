import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { CartContext } from '../Context';

const ProductDetails = () => {
    const { id } = useParams(); // Get product ID from route parameters
    const { addToCart } = useContext(CartContext); // Use CartContext to access addToCart function
    const [loadingGetSingleProduct, setLoadingGetSingleProduct] = useState(false);
    const [productsData, setProductsData] = useState({});
    const [selectedSize, setSelectedSize] = useState(null); // Track selected size
    const [quantity, setQuantity] = useState(1); // Track quantity

    // Fetch single product data
    const getSingleProduct = async () => {
        setLoadingGetSingleProduct(true);
        try {
            const response = await axios.get(`/products/${id}`);
            setProductsData(response.data);

            // Automatically select the first size if available
            if (response.data.sizes?.length > 0) {
                setSelectedSize(response.data.sizes[0]);
            }
            setLoadingGetSingleProduct(false);
        } catch (error) {
            console.error('Error fetching product:', error);
            setLoadingGetSingleProduct(false);
        }
    };

    // Handle quantity changes
    const handleQuantityChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1); // Minimum quantity is 1
        setQuantity(value);
    };

    // Handle size selection changes
    const handleSizeChange = (e) => {
        const selected = productsData.sizes.find((size) => size.size === e.target.value);
        setSelectedSize(selected);
    };

    useEffect(() => {
        getSingleProduct();
    }, []);

    return (
        <>
            <Navbar />
            {loadingGetSingleProduct ? (
                <Loader />
            ) : (
                <section className="product-detail">
                    <div className="container">
                        <div className="product-wrapper">
                            <div className="product-image">
                                <img src={productsData.image_url} alt={productsData.name} />
                            </div>

                            <div className="product-info">
                                <h1 className="product-title">{productsData.name}</h1>
                                <p className="product-description">{productsData.description}</p>

                                <div className="product-options">
                                    <label htmlFor="size">Size:</label>
                                    <select
                                        id="size"
                                        name="size"
                                        value={selectedSize?.size || ''}
                                        onChange={handleSizeChange}
                                        className="size-select"
                                    >
                                        {productsData.sizes?.map((size, index) => (
                                            <option key={index} value={size.size}>
                                                {size.size}ml → ${size.price.toFixed(2)}
                                            </option>
                                        ))}
                                    </select>

                                    <p className="selected-price">
                                        Selected Price: ${selectedSize?.price?.toFixed(2) || '0.00'}
                                    </p>
                                </div>

                                <div className="quantity-cart">
                                    <label htmlFor="quantity">Quantity:</label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        value={quantity}
                                        min="1"
                                        onChange={handleQuantityChange}
                                        className="quantity-input"
                                    />
                                    <button
                                        className="btn add-to-cart"
                                        onClick={() => {
                                            if (!selectedSize) {
                                                alert("Please select a size before adding to cart!");
                                                return;
                                            }
                                            addToCart(
                                                { ...productsData, selectedSize },
                                                quantity
                                            );
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                </div>

                                <div className="additional-details">
                                    <h3>Details</h3>
                                    <ul>
                                        <li>Category: {productsData.category_id?.name}</li>
                                        <li>Heart Notes: Rose, Jasmine</li>
                                        <li>Base Notes: Sandalwood, Amber</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default ProductDetails;
