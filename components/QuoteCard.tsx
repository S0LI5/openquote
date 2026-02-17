import React from 'react';
import { Quote } from '../types';

interface QuoteCardProps {
  quote: Quote | null;
  loading: boolean;
  error: string | null;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, loading, error }) => {
  if (error) {
    return (
      <div className="quote-card" style={{ textAlign: 'center', color: '#fca5a5' }}>
        <p style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: '0.5rem' }}>
          Something went wrong
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="quote-card" style={{ minHeight: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="shimmer" style={{ height: '1rem', width: '80%', margin: '0 auto' }} />
          <div className="shimmer" style={{ height: '1rem', width: '90%', margin: '0 auto' }} />
          <div className="shimmer" style={{ height: '1rem', width: '60%', margin: '0 auto' }} />
          <div className="shimmer" style={{ height: '0.75rem', width: '30%', margin: '2rem auto 0' }} />
        </div>
      ) : quote ? (
        <div className="quote-enter" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto', padding: '0 1rem' }}>

          {/* Decorative quote mark */}
          <div className="quote-decoration" style={{ marginBottom: '1rem' }}>"</div>

          <blockquote style={{ position: 'relative' }}>
            <p style={{
              fontFamily: "'Merriweather', serif",
              fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
              lineHeight: 1.7,
              fontWeight: 300,
              color: 'var(--text-primary)',
              marginBottom: '2rem',
              letterSpacing: '-0.01em',
            }}>
              {quote.content}
            </p>
            <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
              <div style={{ height: '1px', width: '2rem', background: 'var(--accent)', opacity: 0.4 }} />
              <cite style={{
                fontStyle: 'normal',
                fontSize: '1.0625rem',
                fontWeight: 600,
                color: 'var(--accent)',
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '0.02em',
              }}>
                {quote.author}
              </cite>
              <div style={{ height: '1px', width: '2rem', background: 'var(--accent)', opacity: 0.4 }} />
            </footer>
          </blockquote>

          {/* Tags */}
          {quote.tags.length > 0 && (
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {quote.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: '0.6875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  padding: '0.25rem 0.625rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--accent-soft)',
                  border: '1px solid var(--border-subtle)',
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default QuoteCard;