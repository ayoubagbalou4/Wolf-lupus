import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'

const ProductsCatalog = () => {

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

    return (
        <>
        <Navbar />
        <section className="product-catalog">
            <div className="catalog-container">
                <div className="filters">
                    <h3>Filters</h3>
                    <div className="filter-category">
                        <h4>Categories</h4>
                        <ul>
                            <li><input type="checkbox" id="men" /><label for="men"> Men</label></li>
                            <li><input type="checkbox" id="women" /><label for="women"> Women</label></li>
                            <li><input type="checkbox" id="unisex" /><label for="unisex"> Unisex</label></li>
                        </ul>
                    </div>
                    <div className="filter-price">
                        <h4>Price</h4>
                        <input type="range" min="0" max="500" step="10" id="price-range" />
                        <p>Price: $<span id="price-value">50</span></p>
                    </div>
                    <div className="filter-scent">
                        <h4>Scent Type</h4>
                        <ul>
                            <li><input type="checkbox" id="floral" /><label for="floral"> Floral</label></li>
                            <li><input type="checkbox" id="woody" /><label for="woody"> Woody</label></li>
                            <li><input type="checkbox" id="citrus" /><label for="citrus"> Citrus</label></li>
                            <li><input type="checkbox" id="spicy" /><label for="spicy"> Spicy</label></li>
                        </ul>
                    </div>
                </div>

                <div className="products">
                    <h2>Our Products</h2>
                    {
                        loadingProducts ? <Loader /> :
                            <div className="product-list">
                                {
                                    products.map((product, index) => (
                                        <div className="product-card" key={index}>
                                            <img src={product.image_url} alt="Product Img" />
                                            <h3>{product.name}</h3>
                                            <p className="price">${product.price}</p>
                                            <Link to={`/product/${product._id}`} className="btn">View Details</Link>
                                        </div>
                                    ))
                                }
                            </div>
                    }
                </div>
            </div>
        </section>
        </>
    )
}

export default ProductsCatalog