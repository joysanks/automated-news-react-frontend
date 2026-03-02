const SkeletonCard = () => (
    <article className="post-card" aria-hidden="true">
        <div className="post-image skeleton-loader" style={{ background: '#1e293b' }} />
        <div className="post-content">
            <div className="skeleton-loader" style={{ background: '#1e293b', height: '14px', width: '30%', marginBottom: '0.75rem' }} />
            <div className="skeleton-loader" style={{ background: '#1e293b', height: '20px', width: '85%', marginBottom: '0.5rem' }} />
            <div className="skeleton-loader" style={{ background: '#1e293b', height: '20px', width: '70%', marginBottom: '1rem' }} />
            <div className="skeleton-loader" style={{ background: '#1e293b', height: '60px' }} />
        </div>
    </article>
);

export default SkeletonCard;
