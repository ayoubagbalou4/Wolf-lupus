import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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
            {
                loadingProducts ? <Loader />
                    :
                    <section className="featured-products">
                        <h2 className="section-title">Our Products.</h2>
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
            }
            <Footer />
        </>
    )
}

export default ProductsCatalog