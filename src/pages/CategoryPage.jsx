import { useParams } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import PostCard from '../components/PostCard';
import SkeletonCard from '../components/SkeletonCard';
import Sidebar from '../components/Sidebar';

const CATEGORY_MAP = {
    tech: { label: 'Technology', key: 'TECH', icon: '💻', desc: 'Latest updates from the tech world.' },
    entertainment: { label: 'Entertainment', key: 'ENTERTAINMENT', icon: '🎬', desc: 'Movies, music, celebrities and more.' },
    exams: { label: 'Exams & Education', key: 'EXAMS', icon: '📚', desc: 'Exam alerts, study tips and results.' },
    'how-to': { label: 'How-To Guides', key: 'HOW-TO', icon: '🛠️', desc: 'Step-by-step tutorials and tips.' },
};

const CategoryPage = () => {
    const { slug } = useParams();
    const { posts: allPosts, loading } = usePosts();
    const meta = CATEGORY_MAP[slug] || { label: 'Category', key: '', icon: '📰', desc: '' };

    const categoryPosts = allPosts.filter(
        p => p.category && p.category.toUpperCase() === meta.key
    );

    return (
        <main>
            {/* Hero */}
            <section className="page-hero hero" style={{ padding: '4rem 0' }}>
                <div className="container">
                    <span style={{ fontSize: '3rem' }}>{meta.icon}</span>
                    <h1>{meta.label}</h1>
                    <p>{meta.desc}</p>
                </div>
            </section>

            {/* Posts + Sidebar */}
            <section className="section">
                <div className="container">
                    <div className="content-with-sidebar">
                        {/* Posts Grid */}
                        <div>
                            {loading ? (
                                <div className="grid grid-3">
                                    {[1, 2, 3, 4, 5, 6].map(n => <SkeletonCard key={n} />)}
                                </div>
                            ) : categoryPosts.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                                    <p style={{ fontSize: '1.2rem' }}>No stories found in this category yet.</p>
                                    <p>Check back soon — new content is added daily!</p>
                                </div>
                            ) : (
                                <div className="grid grid-3">
                                    {categoryPosts.map(post => (
                                        <PostCard key={post.articleId || post.title} post={post} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <Sidebar posts={allPosts} />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CategoryPage;
