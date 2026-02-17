import React, { useState } from 'react';
import { RefreshCw, Copy, Twitter, Heart } from 'lucide-react';

interface ControlsProps {
  onNewQuote: () => void;
  onCopy: () => void;
  onTweet: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
  isLoading: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  onNewQuote,
  onCopy,
  onTweet,
  onToggleFavorite,
  isFavorite,
  isLoading
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%', maxWidth: '700px', margin: '0 auto' }}>

      {/* Primary row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>

        {/* New Quote */}
        <button
          onClick={onNewQuote}
          disabled={isLoading}
          className="btn-primary"
          title="Get New Quote (Spacebar)"
        >
          <RefreshCw size={18} className={isLoading ? 'spin' : ''} style={{ transition: 'transform 0.3s' }} />
          <span>New Quote</span>
        </button>

        {/* Copy */}
        <button
          onClick={handleCopy}
          className="btn-icon"
          title="Copy to Clipboard"
          aria-label="Copy to Clipboard"
          style={{ position: 'relative' }}
        >
          <Copy size={18} />
          {copied && <span className="copy-tooltip">Copied!</span>}
        </button>

        {/* Tweet */}
        <button
          onClick={onTweet}
          className="btn-icon btn-icon--twitter"
          title="Share on Twitter"
          aria-label="Share on Twitter"
        >
          <Twitter size={18} />
        </button>

        {/* Favorite */}
        <button
          onClick={onToggleFavorite}
          className={`btn-icon btn-icon--favorite ${isFavorite ? 'is-active' : ''}`}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          aria-label="Toggle Favorite"
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
};

export default Controls;