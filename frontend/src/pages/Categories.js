import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Categories = () => {

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
        </>
    )
}

export default Categories