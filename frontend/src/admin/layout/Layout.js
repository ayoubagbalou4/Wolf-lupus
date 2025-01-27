import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Layout.css'
import axios from 'axios'

const Layout = (props) => {

    const [openMenuClick, setOpenMenuClick] = useState(false)
    const nav = useNavigate()
    const user = JSON.parse(localStorage.getItem('userPerfum'))

    const logout = async () => {
        nav('/')
        localStorage.removeItem('userPerfum')
    }

    useEffect(() => {
        if (!user) {
            nav('/')
        }
    }, [])
    if (!user) {
        return null
    }



    return (
        <div className="containerDahboard">
            <div className="aside">
                <div className="brand">Project<span>Manage</span></div>
                <div className="linksSide">
                    <Link className={props.dashboard} to="/admin/dashboard"><i className="fa-solid fa-house-chimney"></i> Dashboard</Link>
                    <Link className={props.categories} to="/admin/categories"><i class="fa-solid fa-list"></i> Categories</Link>
                    <Link className={props.products} to="/admin/products"><i class="fa-brands fa-product-hunt"></i> Products</Link>
                    <Link className={props.reviews} to="/admin/reviews"><i class="fa-solid fa-comments"></i> Reviews</Link>
                    <Link className={props.orders} to="/admin/orders"><i class="fa-solid fa-circle-check"></i> Orders</Link>
                </div>
            </div>
            <div className="main">
                <nav>
                    <div className="headerLogo">{props.header}</div>
                    <div onClick={() => setOpenMenuClick(!openMenuClick)} className="logout">
                        <i class="fa-regular fa-user"></i>
                    </div>
                </nav>
                {
                    openMenuClick &&
                    <div className="menuClick">
                        <div onClick={logout}><i className="fa-solid fa-power-off"></i> Logout</div>
                    </div>
                }
                <div className="content">
                    {props.content}
                </div>
            </div>
        </div>
    )
}

export default Layout
