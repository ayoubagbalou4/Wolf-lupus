import React from 'react'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>Email: <a href="mailto:wlupus@gmail.com">wlupus@gmail.com</a></p>
                    <p>Phone: +212 6 89 16 06 00</p>
                </div>

                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="social-links">
                        <a href="#" className="social-icon"><i className="fab fa-tiktok"></i></a>
                        <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
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