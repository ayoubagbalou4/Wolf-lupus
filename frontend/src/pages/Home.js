import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Categories from './Categories'
import Footer from '../components/Footer'

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
                                <img src={category.image_url} alt={category.image_url} />
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
                                    <div className="price">
                                        {product.sizes?.map((sizeObj, i) => (
                                            <p key={i}>
                                                {sizeObj.size}ml → ${sizeObj.price.toFixed(2)}
                                            </p>
                                        ))}
                                    </div>
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



            <Footer />

        </>
    )
}

export default Home


