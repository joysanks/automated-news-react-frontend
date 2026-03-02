import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import PostDetailPage from './pages/PostDetailPage';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <main style={{ textAlign: 'center', padding: '6rem 0' }}>
    <h1 style={{ fontSize: '5rem', color: 'var(--primary)' }}>404</h1>
    <p>Page not found.</p>
    <Link to="/" className="btn btn-primary">Go Home</Link>
  </main>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Admin page has its own full layout (no shared header/footer) */}
      <Route path="/admin" element={<AdminPage />} />

      {/* All other pages share header + footer */}
      <Route path="*" element={
        <>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:slug" element={<PostDetailPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/terms-conditions" element={<TermsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      } />
    </Routes>
  </BrowserRouter>
);

export default App;
