import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../Context';

const Navbar = () => {

    const { cart } = useContext(CartContext);

    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <Link to={"/"}>
                        Wolf&Lupus<span>Perfums</span></Link>
                </div>
                <nav className="navbar">
                    <ul className="nav-links">
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={"/categories"}>Categories</Link></li>
                        <li><Link to={"/product-catalog"}>Products</Link></li>
                        <li><Link to={"/contact"}>Contact</Link></li>
                    </ul>
                </nav>
                <div className="header-icons">
                    <Link to="#search" className="icon search-icon"><i className="fas fa-search"></i></Link>
                    <Link to="/cart" className="icon cart-icon"><i className="fas fa-shopping-cart"></i></Link>
                </div>
                <div className="menu-toggle" id="mobile-menu">
                    <i className="fas fa-bars"></i>
                </div>
            </div>
        </header>
    )
}

export default Navbar