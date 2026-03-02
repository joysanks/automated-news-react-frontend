const AboutPage = () => (
    <main>
        <section className="page-hero" style={{ padding: '4rem 0', textAlign: 'center', background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f172a 70%)' }}>
            <div className="container">
                <h1>About Us</h1>
            </div>
        </section>

        <section className="section">
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="static-card">
                    <p><strong>Welcome to NirmanWeb – Building Knowledge, One Click at a Time.</strong></p>

                    <p>At NirmanWeb, we believe that technology and education are the two pillars of a progressive society. Founded in 2024, we started as a small blog with a simple mission: to simplify complex tech concepts and make exam preparation accessible to everyone.</p>

                    <h3>Who We Are</h3>
                    <p>We are a team of tech enthusiasts, educators, and lifelong learners. We understand the frustration of sifting through outdated tutorials or confusing study materials. That&apos;s why NirmanWeb exists — to cut through the noise and deliver clear, actionable, and up-to-date content.</p>

                    <h3>What We Do</h3>
                    <p>We specialize in three core areas:</p>
                    <ul>
                        <li><strong>Tech Insights:</strong> From the latest smartphone reviews to deep dives into AI and Blockchain.</li>
                        <li><strong>How-To Guides:</strong> Step-by-step tutorials that solve real-world digital problems.</li>
                        <li><strong>Exam Prep:</strong> Strategic guides and resources for competitive exams, helping students study smarter, not just harder.</li>
                    </ul>

                    <h3>Our Mission</h3>
                    <p>To empower our readers with the digital literacy and academic resources they need to succeed in a fast-evolving world. We are committed to accuracy, integrity, and quality in every article we publish.</p>

                    <h3>Connect With Us</h3>
                    <p>We love hearing from our readers! Whether you have a question about a tech article, need a specific exam guide, or just want to say hello, feel free to reach out.</p>
                    <p><strong>Email:</strong> <a href="mailto:contact@nirmanweb.com" style={{ color: 'var(--accent)' }}>contact@nirmanweb.com</a></p>
                    <p><strong>Location:</strong> Guwahati, Assam, India</p>

                    <p style={{ marginTop: '2rem' }}>Thank you for being part of our journey.</p>
                    <p><strong>The NirmanWeb Team</strong></p>
                </div>
            </div>
        </section>
    </main>
);

export default AboutPage;
