import React from 'react';
import { Quote } from '../types';
import { X, Trash2, Heart } from 'lucide-react';

interface FavoritesListProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Quote[];
  onRemove: (id: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ isOpen, onClose, favorites, onRemove }) => {
  if (!isOpen) return null;

  return (
    <div className="favorites-overlay" onClick={onClose}>
      <div
        className="favorites-panel"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 10,
          background: 'rgba(17, 24, 39, 0.95)',
          backdropFilter: 'blur(12px)',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif" }}>
            Your Favorites <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({favorites.length})</span>
          </h2>
          <button
            onClick={onClose}
            className="btn-icon"
            style={{ padding: '0.5rem' }}
            aria-label="Close favorites"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {favorites.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
              {/* Empty state illustration */}
              <Heart size={48} style={{ opacity: 0.15, margin: '0 auto 1.5rem', display: 'block' }} />
              <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                No favorites yet
              </p>
              <p style={{ fontSize: '0.8125rem' }}>
                Click the heart icon on a quote to save it here.
              </p>
            </div>
          ) : (
            favorites.map(quote => (
              <div key={quote._id} className="favorite-item" style={{ position: 'relative' }}>
                <p style={{
                  fontFamily: "'Merriweather', serif",
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem',
                  fontWeight: 300,
                }}>
                  "{quote.content}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--accent)',
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    {quote.author}
                  </span>
                  <button
                    onClick={() => onRemove(quote._id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '0.375rem',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onMouseEnter={e => {
                      (e.target as HTMLElement).style.color = '#f87171';
                      (e.target as HTMLElement).style.background = 'var(--red-soft)';
                    }}
                    onMouseLeave={e => {
                      (e.target as HTMLElement).style.color = 'var(--text-muted)';
                      (e.target as HTMLElement).style.background = 'transparent';
                    }}
                    title="Remove from favorites"
                    aria-label="Remove from favorites"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesList;