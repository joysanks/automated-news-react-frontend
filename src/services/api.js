const API = {
  getPosts: async () => {
    try {
      // Priority 1: window.POSTS_DATA (loaded via data.js for static hosting)
      if (window.POSTS_DATA) {
        return window.POSTS_DATA;
      }

      // Priority 2: Backend API (the main source in React SPA mode)
      try {
        const backendRes = await fetch('https://automated-news-backend.onrender.com/api/content');
        if (backendRes.ok) {
          const json = await backendRes.json();
          return json.data || [];
        }
      } catch (_) { /* backend not running, fall through */ }

      // Priority 3: Static posts.json (for static hosting fallback)
      const response = await fetch('/posts/posts.json');
      if (response.ok) {
        return await response.json();
      }

      return [];
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      return [];
    }
  },

  /**
   * Get a single post by its slug (filename without .html, or slugified title).
   * Finds it from the full posts list — no extra network request needed.
   */
  getPostBySlug: async (slug) => {
    const posts = await API.getPosts();
    return posts.find(p => {
      const fileSlug = p.filename ? p.filename.replace('.html', '') : '';
      return fileSlug === slug || p.slug === slug;
    }) || null;
  },

  deletePost: async (id) => {
    console.warn('Delete not yet implemented with backend.');
    return true;
  }
};

export default API;
