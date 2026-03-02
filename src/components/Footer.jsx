import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="main-footer">
        <div className="container footer-content">
            <div className="footer-section">
                <h3>NirmanWeb</h3>
                <p>Get your daily dose of trending entertainment news, live sports updates, competitive exam alerts, and practical how-to guides. Stay informed and ahead with NirmanWeb.</p>
            </div>
            <div className="footer-section">
                <h4>Legal</h4>
                <ul className="footer-links">
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                    <li><Link to="/terms-conditions">Terms &amp; Conditions</Link></li>
                </ul>
            </div>
            <div className="footer-section">
                <h4>Connect</h4>
                <ul className="footer-links">
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to="/admin">Admin Login</Link></li>
                </ul>
            </div>
        </div>
        <div className="container text-center" style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', fontSize: '0.8rem' }}>
            <p>&copy; 2026 NirmanWeb. All Rights Reserved.</p>
        </div>
    </footer>
);

export default Footer;
