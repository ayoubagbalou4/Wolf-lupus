import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../Context';

const Navbar = () => {

    const { cart } = useContext(CartContext);
    const [open, setOpen] = useState(false)

    const openMenu = () => {
        setOpen(!open)
    }

    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <Link to={"/"}>
                        <img src="https://i.ibb.co/G3ktbFc/logo.jpg" alt="imgLogo" />
                    </Link>
                </div>
                <nav className={`navbar ${open ? 'active' : ''}`}>
                    <ul className="nav-links">
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={"/categories"}>Categories</Link></li>
                        <li><Link to={"/product-catalog"}>Products</Link></li>
                    </ul>
                </nav>
                <div className='cartIconMenu'>
                    <div className="cart">
                        <Link to="/cart">
                            <i className="fas fa-shopping-cart"></i>
                            <span className="cart-count">{cart.length}</span>
                        </Link>
                    </div>
                    <div onClick={openMenu} className="menu-toggle" id="mobile-menu">
                        <i className="fas fa-bars"></i>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar