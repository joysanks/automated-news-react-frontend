import { useState, useEffect } from 'react';
import { usePosts } from '../hooks/usePosts';
import { slugify } from '../services/utils';

// Auth utils
const checkAuth = () => localStorage.getItem('admin_token') === 'valid_token';

const login = (user, pass) => {
    if (user === 'admin' && pass === 'admin123') {
        localStorage.setItem('admin_token', 'valid_token');
        return true;
    }
    return false;
};

const logout = () => localStorage.removeItem('admin_token');

// Template for generated post HTML
const generatePostHTML = (post) => {
    const base = '../';
    const dateStr = new Date(post.generatedAt).toLocaleDateString();
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.metaTitle || post.title}</title>
  <meta name="description" content="${post.metaDescription || post.excerpt}">
  <link rel="stylesheet" href="${base}css/style.css">
  <link rel="stylesheet" href="${base}css/article.css">
</head>
<body>
  <main>
    <h1>${post.title}</h1>
    <p>${dateStr} &bull; ${post.wordCount} words</p>
    ${post.featuredImageUrl ? `<img src="${post.featuredImageUrl}" alt="${post.featuredImageAlt || post.title}">` : ''}
    <article>${post.content}</article>
  </main>
</body>
</html>`;
};

// ---- LOGIN VIEW ----
const LoginView = ({ onLogin }) => {
    const [creds, setCreds] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(creds.username, creds.password)) {
            onLogin();
        } else {
            setError('Invalid credentials. Try admin / admin123');
        }
    };

    return (
        <div className="admin-login-wrapper">
            <div className="login-card">
                <h2>⚡ Admin Access</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="admin"
                            value={creds.username}
                            onChange={e => setCreds(c => ({ ...c, username: e.target.value }))}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="••••••"
                            value={creds.password}
                            onChange={e => setCreds(c => ({ ...c, password: e.target.value }))}
                        />
                    </div>
                    {error && <p style={{ color: '#f87171', fontSize: '0.88rem', marginBottom: '1rem' }}>{error}</p>}
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Enter Dashboard</button>
                </form>
            </div>
        </div>
    );
};

// ---- DASHBOARD VIEW ----
const DashboardView = ({ onLogout }) => {
    const { posts, loading } = usePosts();
    const [statusLog, setStatusLog] = useState('Ready. Click "Fetch & Generate All" to begin.');
    const [generating, setGenerating] = useState(false);

    const log = (msg) => setStatusLog(prev => prev + '\n' + msg);

    const handleGenerate = async () => {
        setGenerating(true);
        setStatusLog(`Fetching posts...`);

        if (!posts || posts.length === 0) {
            setStatusLog('No posts found. Make sure your backend is running or posts/data.js is loaded.');
            setGenerating(false);
            return;
        }

        log(`Found ${posts.length} posts. Starting generation...`);

        if ('showDirectoryPicker' in window) {
            try {
                log('\nPlease select the PROJECT ROOT folder...');
                const rootHandle = await window.showDirectoryPicker();
                const outputDirectoryHandle = await rootHandle.getDirectoryHandle('posts', { create: true });
                log(`✅ Target: ${rootHandle.name}/posts`);

                let successCount = 0;
                for (const post of posts) {
                    const filename = `${slugify(post.title)}.html`;
                    try {
                        await outputDirectoryHandle.getFileHandle(filename);
                        log(`⚠ Skipped (Exists): ${filename}`);
                        continue;
                    } catch (_) { /* proceed */ }

                    const htmlContent = generatePostHTML(post);
                    const fileHandle = await outputDirectoryHandle.getFileHandle(filename, { create: true });
                    const writable = await fileHandle.createWritable();
                    await writable.write(htmlContent);
                    await writable.close();
                    log(`✔ Generated: ${filename}`);
                    successCount++;
                }

                // Generate data files
                const indexData = posts.map(p => ({ ...p, filename: `${slugify(p.title)}.html` }));
                const indexHandle = await outputDirectoryHandle.getFileHandle('posts.json', { create: true });
                const wi = await indexHandle.createWritable();
                await wi.write(JSON.stringify(indexData, null, 2));
                await wi.close();
                log('✔ Generated Index: posts.json');

                const jsContent = `window.POSTS_DATA = ${JSON.stringify(indexData, null, 2)};`;
                const jsHandle = await outputDirectoryHandle.getFileHandle('data.js', { create: true });
                const wj = await jsHandle.createWritable();
                await wj.write(jsContent);
                await wj.close();
                log('✔ Generated Data: data.js');

                log(`\nDone! Generated ${successCount} new files.`);
            } catch (err) {
                log(`❌ Error: ${err.message}`);
            }
        } else {
            log('⚠ Browser does not support direct file access. Try Chrome/Edge.');
        }
        setGenerating(false);
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-logo">⚡ NirmanWeb Admin</div>
                <nav className="admin-sidebar-nav">
                    <a href="#" className="active">Overview</a>
                    <a href="/" target="_blank" rel="noreferrer">View Site ↗</a>
                    <span className="logout-link" onClick={() => { logout(); onLogout(); }}>Logout</span>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="dashboard-header">
                    <div>
                        <h1>Content Manager</h1>
                        <p>Manage posts and generate SEO pages.</p>
                        <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
                            <em>Tip: Browser issues? Run <code>node generate.js</code> in terminal instead.</em>
                        </p>
                    </div>
                    <div className="action-bar">
                        <button
                            id="generate-btn"
                            className="btn btn-primary"
                            onClick={handleGenerate}
                            disabled={generating}
                        >
                            {generating ? '⏳ Generating...' : '🔄 Fetch & Generate All'}
                        </button>
                    </div>
                </header>

                {/* Status Log */}
                <div className="status-log">{statusLog}</div>

                {/* Posts Table */}
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Article ID</th>
                                <th>Title</th>
                                <th>Generated At</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading posts...</td></tr>
                            ) : posts.length === 0 ? (
                                <tr><td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No posts found.</td></tr>
                            ) : posts.map((post, i) => (
                                <tr key={post.articleId || i}>
                                    <td>{post.articleId || post.id || i + 1}</td>
                                    <td><b>{post.title}</b></td>
                                    <td>{new Date(post.generatedAt).toLocaleDateString()}</td>
                                    <td><span className="status-badge status-active">Active</span></td>
                                    <td>
                                        <button className="toggle-btn" onClick={() => alert('Delete simulated')}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

// ---- ADMIN PAGE WRAPPER ----
const AdminPage = () => {
    const [authed, setAuthed] = useState(checkAuth());

    return authed
        ? <DashboardView onLogout={() => setAuthed(false)} />
        : <LoginView onLogin={() => setAuthed(true)} />;
};

export default AdminPage;
