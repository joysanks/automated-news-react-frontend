import { Link } from 'react-router-dom';
import { formatDate } from '../services/utils';

const FeaturedCard = ({ post }) => {
    const date = formatDate(post.generatedAt);
    const category = post.tags && post.tags[0] ? post.tags[0] : 'News';
    const imgUrl = post.featuredImageUrl || 'https://placehold.co/800x450/1e293b/94a3b8?text=NirmanWeb';
    const altText = post.featuredImageAlt || post.title;
    const excerpt = post.excerpt || (post.content ? post.content.substring(0, 120) + '...' : 'Click to read more');
    const slug = post.filename ? post.filename.replace('.html', '') : (post.slug || post.articleId || post.id);

    return (
        <article className="featured-card" itemScope itemType="https://schema.org/NewsArticle">
            <Link to={`/post/${slug}`}>
                <img
                    src={imgUrl}
                    alt={altText}
                    className="featured-image"
                    loading="eager"
                    itemProp="image"
                />
                <div className="featured-content">
                    <span className="post-category" itemProp="articleSection">{category}</span>
                    <h3 className="featured-title" itemProp="headline">{post.title}</h3>
                    <p className="featured-excerpt" itemProp="description">{excerpt}</p>
                    <div className="post-meta">
                        <time dateTime={post.generatedAt} itemProp="datePublished">{date}</time>
                        <span>{post.wordCount} words</span>
                    </div>
                </div>
            </Link>
        </article>
    );
};

export default FeaturedCard;
