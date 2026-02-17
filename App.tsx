import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Heart } from 'lucide-react';
import './index.css';

import { Quote, QuoteCategory } from './types';
import { fetchQuote } from './services/quoteService';
import CategoryFilter from './components/CategoryFilter';
import QuoteCard from './components/QuoteCard';
import Controls from './components/Controls';
import FavoritesList from './components/FavoritesList';

const App: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [category, setCategory] = useState<QuoteCategory>(QuoteCategory.RANDOM);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [quoteCount, setQuoteCount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show toast notification
  const showToast = useCallback((message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(message);
    toastTimerRef.current = setTimeout(() => setToastMessage(null), 2500);
  }, []);

  // Load favorites from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('openquote_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  // Save favorites to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('openquote_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const getQuote = useCallback(async (selectedCategory: QuoteCategory) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const quote = await fetchQuote(selectedCategory, abortControllerRef.current.signal);
      setCurrentQuote(quote);
      setQuoteCount(prev => prev + 1);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      console.error(err);
      setError("Couldn't fetch a quote right now. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load and category change
  useEffect(() => {
    getQuote(category);
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [category, getQuote]);

  // Keyboard shortcut: Spacebar for new quote
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && document.activeElement?.tagName !== 'BUTTON' && !isFavoritesOpen) {
        e.preventDefault();
        getQuote(category);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [category, getQuote, isFavoritesOpen]);

  const handleCategoryChange = (newCategory: QuoteCategory) => {
    if (newCategory === category) return;
    setCategory(newCategory);
  };

  const handleCopy = () => {
    if (currentQuote) {
      const text = `"${currentQuote.content}" — ${currentQuote.author}`;
      navigator.clipboard.writeText(text);
      showToast('✓ Copied to clipboard');
    }
  };

  const handleTweet = () => {
    if (currentQuote) {
      const text = encodeURIComponent(`"${currentQuote.content}" — ${currentQuote.author}`);
      window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    }
  };

  const handleToggleFavorite = () => {
    if (!currentQuote) return;
    const isFav = favorites.some(f => f._id === currentQuote._id);
    if (isFav) {
      setFavorites(prev => prev.filter(f => f._id !== currentQuote._id));
      showToast('Removed from favorites');
    } else {
      setFavorites(prev => [...prev, currentQuote]);
      showToast('♥ Added to favorites');
    }
  };

  const isCurrentFavorite = currentQuote
    ? favorites.some(f => f._id === currentQuote._id)
    : false;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{
        width: '100%',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '2rem',
            height: '2rem',
            background: 'linear-gradient(135deg, var(--accent), #818cf8)',
            borderRadius: 'var(--radius-sm)',
            boxShadow: '0 0 20px var(--accent-glow)',
          }} />
          <h1 style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            fontFamily: "'Inter', sans-serif",
            color: 'var(--text-primary)',
          }}>
            OpenQuote
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Quote counter */}
          {quoteCount > 0 && (
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}>
              #{quoteCount} this session
            </span>
          )}

          {/* Favorites button */}
          <button
            onClick={() => setIsFavoritesOpen(true)}
            className="btn-icon"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}
          >
            <Heart size={16} style={{ color: favorites.length > 0 ? 'var(--pink)' : undefined, fill: favorites.length > 0 ? 'var(--pink)' : 'none' }} />
            <span style={{ fontSize: '0.8125rem', fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
              Favorites
            </span>
            {favorites.length > 0 && (
              <span style={{
                background: 'var(--accent-soft)',
                color: 'var(--accent)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                padding: '0.125rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                marginLeft: '0.25rem',
              }}>
                {favorites.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem 4rem',
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}>

        <CategoryFilter
          selectedCategory={category}
          onSelectCategory={handleCategoryChange}
          disabled={loading}
        />

        <div style={{ width: '100%', marginBottom: '2rem' }}>
          <QuoteCard
            quote={currentQuote}
            loading={loading}
            error={error}
          />
        </div>

        <Controls
          onNewQuote={() => getQuote(category)}
          onCopy={handleCopy}
          onTweet={handleTweet}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isCurrentFavorite}
          isLoading={loading}
        />

        <p style={{
          marginTop: '2.5rem',
          color: 'var(--text-muted)',
          fontSize: '0.8125rem',
          fontFamily: "'Inter', sans-serif",
        }}>
          Press <kbd style={{
            padding: '0.25rem 0.5rem',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            fontFamily: "'Inter', monospace",
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}>Space</kbd> for a new quote
        </p>
      </main>

      {/* Footer */}
      <footer style={{
        width: '100%',
        padding: '1.5rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.75rem',
        fontFamily: "'Inter', sans-serif",
        borderTop: '1px solid var(--border-subtle)',
      }}>
        <p>Built with React &bull; Powered by <a href="https://quoteslate.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>QuoteSlate</a></p>
      </footer>

      {/* Favorites Panel */}
      <FavoritesList
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemove={(id) => setFavorites(prev => prev.filter(f => f._id !== id))}
      />

      {/* Toast Notification */}
      <div className={`toast ${toastMessage ? 'show' : ''}`}>
        {toastMessage}
      </div>
    </div>
  );
};

export default App;