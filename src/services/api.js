const API = {
  getPosts: async () => {
    try {
      if (window.POSTS_DATA) {
        return window.POSTS_DATA;
      }

      try {
        const backendRes = await fetch('https://automated-news-backend.onrender.com/api/content');
        if (backendRes.ok) {
          const json = await backendRes.json();
          return json.data || [];
        }
      } catch (_) { /* backend not running, fall through */ }

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


  getPostBySlug: async (slug) => {
    const posts = await API.getPosts();
    return posts.find(p => {
      const fileSlug = p.filename ? p.filename.replace('.html', '') : '';
      return fileSlug === slug || p.slug === slug || p.articleId === slug || p.id === slug;
    }) || null;
  },

  deletePost: async (id) => {
    console.warn('Delete not yet implemented with backend.');
    return true;
  }
};

export default API;
