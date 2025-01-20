import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Categories from './Categories'

const Home = () => {

    const [products, setProducts] = useState([])
    const [loadingProducts, setLoadingProducts] = useState([])
    const getProducts = async () => {
        setLoadingProducts(true)
        try {
            const response = await axios.get('/products')
            setProducts(response.data)
            setLoadingProducts(false)
        } catch (error) {
            console.log(error)
            setLoadingProducts(false)
        }
    }
    useEffect(() => {
        getProducts()
    }, [])

    const [categories, setCategories] = useState([])
    const [loadingCategories, setLoadingCategories] = useState([])
    const getCategories = async () => {
        setLoadingCategories(true)
        try {
            const response = await axios.get('/categories')
            setCategories(response.data)
            setLoadingCategories(false)
        } catch (error) {
            console.log(error)
            setLoadingCategories(false)
        }
    }
    useEffect(() => {
        getCategories()
    }, [])


    return (
        <>
            <Navbar />

            <section className="hero-banner">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1>Your Signature Scent Awaits</h1>
                    <p>Discover exclusive collections with up to <span>50% OFF</span></p>
                    <div className="hero-buttons">
                        <a href="#shop-now" className="btn primary-btn">Shop Now</a>
                        <a href="#collections" className="btn secondary-btn">Explore Collections</a>
                    </div>
                </div>
            </section>

            <section className="categories">
                <h2 className="section-title">Shop by Category</h2>
                <div className="category-container">
                    {
                        categories.map((category, index) => (
                            <div className="category-card" key={index}>
                                <img src="https://i.ibb.co/23CMMH2/perfume1.png" alt="Women's Fragrances" />
                                <h3>{category.name}</h3>
                                <Link to={`/categories/${category._id}`} className="btn">Shop Now</Link>
                            </div>
                        ))
                    }
                </div>
            </section>

            <section className="featured-products">
                <h2 className="section-title">Top-Selling Perfumes</h2>
                <div className="product-container">
                    {
                        products.map((product, index) => (
                            <div className="product-card" key={index}>
                                <img src={product.image_url} alt="Product Img" />
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    {product.sizes?.map((sizeObj, i) => (
                                        <p key={i}>
                                            {sizeObj.size}ml → ${sizeObj.price.toFixed(2)}
                                        </p>
                                    ))}
                                    <Link to={`/product/${product._id}`} className="btn">View Details</Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>


            <section className="testimonials">
                <h2 className="section-title">What Our Customers Say</h2>
                <div className="testimonials-container">
                    <div className="testimonial-card">
                        <p className="testimonial-text">"Absolutely love these perfumes! The scents are long-lasting and perfect for
                            any occasion. Highly recommend!"</p>
                    </div>
                    <div className="testimonial-card">
                        <p className="testimonial-text">"The variety is amazing, and the quality is top-notch. My go-to shop for
                            gifts and personal use!"</p>
                    </div>
                    <div className="testimonial-card">
                        <p className="testimonial-text">"Fast shipping and excellent customer service. I'm beyond happy with my
                            purchase!"</p>
                    </div>
                    <div className="testimonial-card">
                        <p className="testimonial-text">"The fragrances are unique and luxurious. I've received so many compliments
                            since I started using them."</p>
                    </div>
                </div>
            </section>


            <section className="newsletter">
                <div className="newsletter-container">
                    <div className="newsletter-content">
                        <h2>Stay Updated!</h2>
                        <p>Subscribe to our newsletter and get the latest news, offers, and perfume recommendations straight to
                            your inbox.</p>
                    </div>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Enter your email" required />
                        <button type="submit" className="btn">Subscribe</button>
                    </form>
                </div>
            </section>



            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-section">
                        <h3>Contact Us</h3>
                        <p>Email: <a href="mailto:info@perfumeshop.com">info@perfumeshop.com</a></p>
                        <p>Phone: +1 (800) 123-4567</p>
                        <p>Address: 123 Perfume St, Fragrance City</p>
                    </div>

                    <div className="footer-section">
                        <h3>Follow Us</h3>
                        <div className="social-links">
                            <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="social-icon"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h3>Policies</h3>
                        <ul>
                            <li><a href="#privacy-policy">Privacy Policy</a></li>
                            <li><a href="#terms-of-service">Terms of Service</a></li>
                            <li><a href="#return-policy">Return Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 Wolf&LupusPerfums. All Rights Reserved.</p>
                </div>
            </footer>

        </>
    )
}

export default Home


