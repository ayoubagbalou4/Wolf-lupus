import React, { useEffect, useState } from 'react'
import Layout from './layout/Layout'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {

    const [counts, setCounts] = useState([])
    const [loadingCounts, setLoadingCounts] = useState([])
    const getCounts = async () => {
        setLoadingCounts(true)
        try {
            const response = await axios.get('counts')
            setCounts(response.data)
            setLoadingCounts(false)
        } catch (error) {
            console.log(error)
            setLoadingCounts(false)
        }
    }
    useEffect(() => {
        getCounts()
    }, [])


    return (
        <Layout dashboard="active" header="dashboard" content={
            <>
                {loadingCounts ? <div className="loader1"></div> :
                    <>
                        <div className='boxs'>
                            <Link to={'/admin/Categories'}>
                                <div className='box'>
                                    <div>
                                        <h1>{counts.categoryCount}</h1>
                                        <h3>Categories</h3>
                                    </div>
                                    <i class="fa-solid fa-list"></i>
                                </div>
                            </Link>
                            <Link to={'/admin/Products'}>
                                <div className='box'>
                                    <div>
                                        <h1>{counts.productCount}</h1>
                                        <h3>Products</h3>
                                    </div>
                                    <i class="fa-brands fa-product-hunt"></i>
                                </div>
                            </Link>
                            <Link to={'/admin/Reviews'}>
                                <div className='box'>
                                    <div>
                                        <h1>{counts.reviewsCount}</h1>
                                        <h3>Reviews</h3>
                                    </div>
                                    <i class="fa-solid fa-comments"></i>
                                </div>
                            </Link>
                            
                        </div>
                    </>
                }
            </>
        } />
    )
}

export default Dashboard

