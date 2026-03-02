import { Link } from 'react-router-dom';
import { useState } from 'react';
import { formatDate } from '../services/utils';

const CATEGORIES = [
    { slug: 'tech', label: 'Technology', key: 'TECH' },
    { slug: 'entertainment', label: 'Entertainment', key: 'ENTERTAINMENT' },
    { slug: 'exams', label: 'Exams & Education', key: 'EXAMS' },
    { slug: 'how-to', label: 'How-To Guides', key: 'HOW-TO' },
];

const Sidebar = ({ posts = [] }) => {
    const [email, setEmail] = useState('');

    // Top 5 trending (latest by date)
    const trending = [...posts]
        .sort((a, b) => new Date(b.generatedAt) - new Date(a.generatedAt))
        .slice(0, 5);

    // Category counts
    const catCounts = CATEGORIES.map(cat => ({
        ...cat,
        count: posts.filter(p => p.category && p.category.toUpperCase() === cat.key).length
    }));

    const handleSubscribe = (e) => {
        e.preventDefault();
        alert(`Thanks for subscribing with ${email}!`);
        setEmail('');
    };

    return (
        <aside className="sidebar-col">
            {/* Trending Widget */}
            <div className="sidebar-widget">
                <h4>🔥 Trending Now</h4>
                {trending.length === 0
                    ? <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 0 }}>Loading...</p>
                    : trending.map((post, idx) => {
                        const href = `/posts/${post.filename || post.title}`;
                        const date = formatDate(post.generatedAt);
                        return (
                            <a href={href} key={post.articleId || idx} style={{ textDecoration: 'none', display: 'block' }}>
                                <div className="sidebar-trending-item">
                                    <span className="sidebar-trending-num">{idx + 1}</span>
                                    <div>
                                        <div className="sidebar-trending-title">{post.title}</div>
                                        <div className="sidebar-trending-meta">{date}</div>
                                    </div>
                                </div>
                            </a>
                        );
                    })
                }
            </div>

            {/* Categories Widget */}
            <div className="sidebar-widget">
                <h4>📂 Categories</h4>
                {catCounts.map(cat => (
                    <Link to={`/category/${cat.slug}`} key={cat.slug} className="sidebar-category-link">
                        <span>{cat.label}</span>
                        <span className="cat-badge">{cat.count}</span>
                    </Link>
                ))}
            </div>

            {/* Newsletter Widget */}
            <div className="sidebar-widget sidebar-newsletter">
                <h4>📩 Newsletter</h4>
                <p>Get top stories delivered to your inbox daily.</p>
                <form onSubmit={handleSubscribe}>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary">Subscribe</button>
                </form>
            </div>
        </aside>
    );
};

export default Sidebar;
