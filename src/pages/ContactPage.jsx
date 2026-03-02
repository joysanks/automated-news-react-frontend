import { useState } from 'react';

const ContactPage = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main>
            <section className="page-hero" style={{ padding: '4rem 0', textAlign: 'center', background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f172a 70%)' }}>
                <div className="container">
                    <h1>Contact Us</h1>
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: '600px' }}>
                    {submitted ? (
                        <div className="static-card text-center">
                            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</p>
                            <h2>Message Sent!</h2>
                            <p>Thanks for reaching out. We&apos;ll get back to you within 24 hours.</p>
                            <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Send Another</button>
                        </div>
                    ) : (
                        <div className="static-card">
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea id="message" name="message" rows="5" value={form.message} onChange={handleChange} placeholder="What's on your mind?" required />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
                            </form>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default ContactPage;
