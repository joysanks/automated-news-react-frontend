const TermsPage = () => (
    <main>
        <section className="page-hero" style={{ padding: '4rem 0', textAlign: 'center', background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f172a 70%)' }}>
            <div className="container">
                <h1>Terms &amp; Conditions</h1>
                <p style={{ color: 'var(--text-muted)' }}>Last updated: March 2026</p>
            </div>
        </section>

        <section className="section">
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="static-card">
                    <h3>1. Acceptance of Terms</h3>
                    <p>By accessing and using NirmanWeb, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.</p>

                    <h3>2. Use of Content</h3>
                    <p>All content on NirmanWeb is for informational purposes only. You may not reproduce, distribute, or create derivative works without our explicit permission.</p>

                    <h3>3. Intellectual Property</h3>
                    <p>The NirmanWeb brand, logo, and all content are the intellectual property of NirmanWeb unless otherwise noted. All rights reserved.</p>

                    <h3>4. User Conduct</h3>
                    <p>You agree not to use our website for any unlawful purpose or in a way that could harm our services or other users.</p>

                    <h3>5. Disclaimer of Warranties</h3>
                    <p>NirmanWeb is provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or timeliness of information.</p>

                    <h3>6. Limitation of Liability</h3>
                    <p>NirmanWeb shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website.</p>

                    <h3>7. Changes to Terms</h3>
                    <p>We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance.</p>

                    <h3>8. Governing Law</h3>
                    <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Assam, India.</p>

                    <h3>9. Contact</h3>
                    <p>For questions about these Terms, email <a href="mailto:contact@nirmanweb.com" style={{ color: 'var(--accent)' }}>contact@nirmanweb.com</a>.</p>
                </div>
            </div>
        </section>
    </main>
);

export default TermsPage;
