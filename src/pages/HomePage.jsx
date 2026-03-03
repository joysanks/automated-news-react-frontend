import { useState } from "react";
import { usePosts } from "../hooks/usePosts";
import FeaturedCard from "../components/FeaturedCard";
import PostCard from "../components/PostCard";
import CategoryCard from "../components/CategoryCard";
import SkeletonCard from "../components/SkeletonCard";
import Sidebar from "../components/Sidebar";

const POSTS_PER_PAGE = 9;

const CATEGORIES_DATA = [
  {
    icon: "💻",
    title: "Technology",
    description: "Latest tech news, gadgets, and innovation",
    to: "/category/tech",
  },
  {
    icon: "🎬",
    title: "Entertainment",
    description: "Movies, TV shows, celebrities, and more",
    to: "/category/entertainment",
  },
  {
    icon: "📚",
    title: "Exams & Education",
    description: "Exam updates, study tips, and results",
    to: "/category/exams",
  },
  {
    icon: "📚",
    title: "Others",
    description: "Other News",
    to: "/category/others",
  },
  {
    icon: "🛠️",
    title: "How-To Guides",
    description: "Step-by-step tutorials and tips",
    to: "/category/how-to",
  },
];

const HomePage = () => {
  const { posts, loading } = usePosts();
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const featuredPosts = posts.slice(0, 2);
  const latestPosts = posts.slice(2);
  const visiblePosts = latestPosts.slice(0, visibleCount);
  const hasMore = visibleCount < latestPosts.length;

  return (
    <main>
      {/* Hero */}
      <section className="hero" role="banner">
        <div className="container">
          <h1>Your Trusted Source for Breaking News &amp; Insights</h1>
          <p>
            Discover the latest in Technology, Sports, Entertainment, Education,
            and practical How-To Guides. Updated daily with stories that matter.
          </p>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="section" aria-labelledby="featured-heading">
        <div className="container">
          <header className="section-header" style={{ marginBottom: "2rem" }}>
            <h2 id="featured-heading">Featured Stories</h2>
            <p className="section-subtitle">Top picks handpicked for you</p>
          </header>
          <div className="grid grid-2">
            {loading
              ? [1, 2].map((n) => <SkeletonCard key={n} />)
              : featuredPosts.map((post) => (
                  <FeaturedCard
                    key={post.articleId || post.title}
                    post={post}
                  />
                ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="latest-heading">
        <div className="container">
          <div className="content-with-sidebar">
            <div>
              <header
                className="section-header"
                style={{ marginBottom: "2rem", textAlign: "left" }}
              >
                <h2 id="latest-heading">Latest Articles</h2>
                <p className="section-subtitle">
                  Stay updated with our newest content
                </p>
              </header>

              <div className="grid grid-3" role="feed">
                {loading
                  ? [1, 2, 3, 4, 5, 6].map((n) => <SkeletonCard key={n} />)
                  : visiblePosts.map((post) => (
                      <PostCard
                        key={post.articleId || post.title}
                        post={post}
                      />
                    ))}
              </div>

              {!loading && posts.length === 0 && (
                <p>No posts found. Please check back later.</p>
              )}

              {hasMore && !loading && (
                <div className="text-center" style={{ marginTop: "3rem" }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => setVisibleCount((c) => c + POSTS_PER_PAGE)}
                  >
                    Load More Articles
                  </button>
                </div>
              )}
            </div>

            <Sidebar posts={posts} />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        className="section categories-section"
        aria-labelledby="categories-heading"
      >
        <div className="container">
          <header className="section-header" style={{ marginBottom: "2rem" }}>
            <h2 id="categories-heading">Explore by Category</h2>
            <p className="section-subtitle">
              Find stories that interest you most
            </p>
          </header>
          <nav className="categories-grid" aria-label="Category navigation">
            {CATEGORIES_DATA.map((cat) => (
              <CategoryCard key={cat.to} {...cat} />
            ))}
          </nav>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section
        className="section newsletter-section"
        aria-labelledby="newsletter-heading"
      >
        <div className="container text-center">
          <h2 id="newsletter-heading">Never Miss an Update</h2>
          <p>
            Join thousands of readers who stay ahead with our daily highlights.
          </p>
          <div className="newsletter-benefits">
            <span>✓ Breaking News Alerts</span>
            <span>✓ Exclusive Content</span>
            <span>✓ Weekly Roundups</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
