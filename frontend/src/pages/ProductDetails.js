import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { CartContext } from '../Context';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const [loadingGetSingleProduct, setLoadingGetSingleProduct] = useState(false);
    const [productsData, setProductsData] = useState({});
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [comment, setComment] = useState([]);

    const getSingleProduct = async () => {
        setLoadingGetSingleProduct(true);
        try {
            const response = await axios.get(`/products/${id}`);
            setProductsData(response.data);

            if (response.data.sizes?.length > 0) {
                setSelectedSize(response.data.sizes[0]);
            }
            setLoadingGetSingleProduct(false);
        } catch (error) {
            console.error('Error fetching product:', error);
            setLoadingGetSingleProduct(false);
        }
    };

    const handleQuantityChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setQuantity(value);
    };

    const handleSizeChange = (e) => {
        const selected = productsData.sizes.find((size) => size.size === e.target.value);
        setSelectedSize(selected);
    };

    const addReview = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/reviews', {
                product_id: id,
                comment
            })
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Add review With Success",
                showConfirmButton: false,
                timer: 1500
            });
            getReviews()
            setComment('')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSingleProduct();
    }, []);

    const [reviews, setReviews] = useState([])
    const [loadingReviews, setLoadingReviews] = useState([])
    const getReviews = async () => {
        setLoadingReviews(true)
        try {
            const response = await axios.get(`/reviews/${id}`)
            setReviews(response.data)
            setLoadingReviews(false)
        } catch (error) {
            console.log(error)
            setLoadingReviews(false)
        }
    }
    useEffect(() => {
        getReviews()
    }, [])

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
                                    <label htmlFor="size">Size : </label>
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
                                    <label htmlFor="quantity">Quantity : </label>
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

                                {/* Add Reviews Section */}
                                <div className="product-reviews">
                                    <h3>Customer Reviews</h3>
                                    {reviews.length > 0 ? (
                                        <ul>
                                            {reviews.map((review, index) => (
                                                <li key={index} className="review-item">
                                                    {review.comment}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No reviews yet.</p>
                                    )}
                                </div>

                                {/* Add Review Form */}
                                <div className="add-review">
                                    <h3>Add Your Review</h3>
                                    <form onSubmit={addReview}>
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Write your review here..."
                                            rows="4"
                                            className="review-textarea"
                                        ></textarea>
                                        <button type="submit" className="btn submit-review">
                                            Submit Review
                                        </button>
                                    </form>
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
