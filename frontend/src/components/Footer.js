import React from 'react'

const Footer = () => {
    return (
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
    )
}

export default Footer