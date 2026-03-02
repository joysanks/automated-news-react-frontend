const PrivacyPage = () => (
    <main>
        <section className="page-hero" style={{ padding: '4rem 0', textAlign: 'center', background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f172a 70%)' }}>
            <div className="container">
                <h1>Privacy Policy</h1>
                <p style={{ color: 'var(--text-muted)' }}>Last updated: March 2026</p>
            </div>
        </section>

        <section className="section">
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="static-card">
                    <h3>1. Information We Collect</h3>
                    <p>We collect information you provide directly to us, such as when you contact us via our contact form. This may include your name, email address, and message content.</p>

                    <h3>2. How We Use Your Information</h3>
                    <p>We use the information we collect to respond to your inquiries and improve our services. We do not sell your personal information to third parties.</p>

                    <h3>3. Cookies and Analytics</h3>
                    <p>NirmanWeb uses Google Analytics to understand how visitors interact with our site. This involves the use of cookies. You can opt out using Google's opt-out tools.</p>

                    <h3>4. Third-Party Links</h3>
                    <p>Our site may contain links to third-party websites. We are not responsible for the privacy practices of those websites.</p>

                    <h3>5. Data Security</h3>
                    <p>We implement reasonable security measures to protect your information. However, no method of transmission over the Internet is 100% secure.</p>

                    <h3>6. Your Rights</h3>
                    <p>You have the right to access, update, or request deletion of your personal information. Contact us at <a href="mailto:contact@nirmanweb.com" style={{ color: 'var(--accent)' }}>contact@nirmanweb.com</a>.</p>

                    <h3>7. Changes to This Policy</h3>
                    <p>We may update this Privacy Policy from time to time. Changes will be effective when posted. Your continued use of our website constitutes acceptance of the updated policy.</p>

                    <h3>8. Contact</h3>
                    <p>For questions about this Privacy Policy, email us at <a href="mailto:contact@nirmanweb.com" style={{ color: 'var(--accent)' }}>contact@nirmanweb.com</a>.</p>
                </div>
            </div>
        </section>
    </main>
);

export default PrivacyPage;
