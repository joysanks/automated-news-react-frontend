import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import { formatDate } from "../services/utils";
import Sidebar from "../components/Sidebar";
import { usePosts } from "../hooks/usePosts";

const PostDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { posts: allPosts } = usePosts();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setNotFound(false);
      const found = await API.getPostBySlug(slug);
      if (found) {
        setPost(found);
        // Update page title for SEO
        document.title = `${found.metaTitle || found.title} - NirmanWeb`;
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };
    fetchPost();
    return () => {
      document.title = "NirmanWeb";
    }; // reset on unmount
  }, [slug]);

  if (loading) {
    return (
      <main>
        <section style={{ padding: "6rem 0", textAlign: "center" }}>
          <div
            className="skeleton-loader"
            style={{
              background: "#1e293b",
              height: "48px",
              width: "60%",
              margin: "0 auto 2rem",
            }}
          />
          <div
            className="skeleton-loader"
            style={{
              background: "#1e293b",
              height: "20px",
              width: "30%",
              margin: "0 auto 1rem",
            }}
          />
          <div
            className="skeleton-loader"
            style={{
              background: "#1e293b",
              height: "400px",
              maxWidth: "800px",
              margin: "2rem auto",
            }}
          />
        </section>
      </main>
    );
  }

  if (notFound) {
    return (
      <main>
        <section style={{ padding: "8rem 0", textAlign: "center" }}>
          <h1 style={{ fontSize: "5rem", color: "var(--primary)" }}>404</h1>
          <p style={{ fontSize: "1.2rem" }}>Article not found.</p>
          <Link
            to="/"
            className="btn btn-primary"
            style={{ marginTop: "1rem", display: "inline-block" }}
          >
            ← Back to Home
          </Link>
        </section>
      </main>
    );
  }

  const date = formatDate(post.generatedAt);
  const category = post.tags && post.tags[0] ? post.tags[0] : "News";
  const categorySlug = post.category ? post.category.toLowerCase() : "tech";

  return (
    <main>
      {/* Article Hero */}
      <section
        className="hero"
        style={{ padding: "4rem 0", textAlign: "left" }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <nav
            style={{
              marginBottom: "1.5rem",
              fontSize: "0.88rem",
              color: "var(--text-muted)",
            }}
          >
            <Link to="/" style={{ color: "var(--text-muted)" }}>
              Home
            </Link>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <Link
              to={`/category/${categorySlug}`}
              style={{ color: "var(--text-muted)" }}
            >
              {category}
            </Link>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <span style={{ color: "var(--text-main)" }}>
              {post.title.substring(0, 40)}...
            </span>
          </nav>

          {/* Category tag */}
          <span
            className="post-category"
            style={{ marginBottom: "1rem", display: "inline-block" }}
          >
            {category}
          </span>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              background: "linear-gradient(to right, #fff, #94a3b8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "1.5rem",
              lineHeight: 1.2,
            }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, var(--primary), var(--accent))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                AD
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    color: "white",
                    fontSize: "0.9rem",
                  }}
                >
                  Anurag Dutta
                </div>
                <div
                  style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}
                >
                  Chief Editor
                </div>
              </div>
            </div>
            <div>
              <div style={{ color: "white", fontSize: "0.9rem" }}>{date}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                {post.wordCount} words · {Math.ceil(post.wordCount / 200)} min
                read
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body + Sidebar */}
      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="content-with-sidebar">
            {/* Article Content */}
            <article>
              {/* Featured Image */}
              {post.featuredImageUrl && (
                <img
                  src={post.featuredImageUrl}
                  alt={post.featuredImageAlt || post.title}
                  style={{
                    width: "100%",
                    maxHeight: "450px",
                    objectFit: "cover",
                    borderRadius: "var(--radius-lg)",
                    marginBottom: "2rem",
                    border: "var(--glass-border)",
                  }}
                />
              )}

              {/* Article HTML content */}
              <div
                className="article-body"
                style={{
                  background: "var(--surface)",
                  border: "var(--glass-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "2.5rem",
                  lineHeight: 1.9,
                  fontSize: "1.05rem",
                  color: "var(--text-muted)",
                }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Author Box */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "var(--glass-border)",
                  borderRadius: "var(--radius-md)",
                  padding: "1.5rem",
                  marginTop: "2rem",
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    background:
                      "linear-gradient(135deg, var(--primary), var(--accent))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  AD
                </div>
                <div>
                  <h4 style={{ marginBottom: "0.4rem" }}>About the Author</h4>
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>
                    This post is AI generated, So no author is assigned to this
                    post.
                  </p>
                </div>
              </div>

              {/* Back button */}
              <div style={{ marginTop: "2rem" }}>
                <Link to="/" className="btn btn-primary">
                  ← Back to Home
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <Sidebar posts={allPosts} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default PostDetailPage;
