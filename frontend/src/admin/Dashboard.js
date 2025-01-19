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
                            <Link to={'/admin/designations'}>
                                <div className='box'>
                                    <div>
                                        <h1>{counts.designations}</h1>
                                        <h3>Designations</h3>
                                    </div>
                                    <i class="fa-solid fa-clipboard-list"></i>
                                </div>
                            </Link>
                            <Link to={'/admin/teamMembers'}>
                                <div className='box'>
                                    <div>
                                        <h1>{counts.members}</h1>
                                        <h3>Team Members</h3>
                                    </div>
                                    <i class="fa-solid fa-user-tie"></i>
                                </div>
                            </Link>
                            <Link to={'/admin/projects'}>
                                <div className='box'>
                                    <div>
                                        <h1>{counts.projects}</h1>
                                        <h3>Projects</h3>
                                    </div>
                                    <i class="fa-solid fa-bars-progress"></i>
                                </div>
                            </Link>
                            <Link to={'/admin/tasks'}>
                                <div className='box'>
                                    <div>
                                        <h1>{counts.tasksCompleted}</h1>
                                        <h3>Completed Tasks</h3>
                                    </div>
                                    <i class="fa-solid fa-list-check"></i>
                                </div>
                            </Link>
                            <Link to={'/admin/tasks'}>
                                <div className='box'>
                                    <div>
                                        <h1>{counts.tasksPending}</h1>
                                        <h3>Pending Tasks</h3>
                                    </div>
                                    <i class="fa-solid fa-list-ul"></i>
                                </div>
                            </Link>
                            <Link to={'/admin/productivities'}>
                                <div className='box'>
                                    <div>
                                        <h1>{counts.productivities}</h1>
                                        <h3>Productivities</h3>
                                    </div>
                                    <i class="fa-solid fa-clipboard-check"></i>
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

