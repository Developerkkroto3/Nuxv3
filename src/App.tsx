import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

type Page = 'register' | 'login';

export default function App() {
  const [page, setPage] = useState<Page>('login');

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<Page>;
      setPage(custom.detail);
    };
    window.addEventListener('navigate', handler);
    return () => window.removeEventListener('navigate', handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#050e0a] flex flex-col">
      <Header page={page} onNavigate={setPage} />
      {page === 'login' ? (
        <LoginPage onNavigate={setPage} />
      ) : (
        <RegisterPage onNavigate={setPage} />
      )}
      <Footer />
    </div>
  );
}