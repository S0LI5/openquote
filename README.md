# OpenQuote 

A lightweight, distraction-free quote generator with beautiful dark-mode design. Get instant inspiration from thousands of quotes, filtered by category.

![OpenQuote](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react) ![Vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=flat-square&logo=typescript)

## Features

- 🎲 **Random quotes** from the [QuoteSlate API](https://quoteslate.vercel.app)
- 🏷️ **8 categories** — Inspirational, Wisdom, Technology, Humorous, Life, Love, Science, or All
- ❤️ **Favorites** — save quotes to a local list (persisted in localStorage)
- 📋 **Copy & Tweet** — one-click sharing
- ⌨️ **Keyboard shortcut** — press `Space` for a new quote
- 🌙 **Premium dark mode** with glassmorphism cards, aurora gradient background, and micro-animations
- 📴 **Offline support** — 15+ fallback quotes when API is unavailable

## Tech Stack

- **React 19** + **TypeScript 5.8**
- **Vite 6** for fast dev/build
- **Tailwind CSS** (CDN) + custom CSS
- **Lucide React** for icons
- **QuoteSlate API** for quotes

## Run Locally

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
openquote/
├── App.tsx                # Main app with state management & toast system
├── index.html             # Entry HTML with Tailwind CDN & fonts
├── index.css              # Custom CSS: glassmorphism, animations, design tokens
├── index.tsx              # React DOM root
├── types.ts               # TypeScript interfaces & enums
├── constants.ts           # API config, fallback quotes, category options
├── components/
│   ├── CategoryFilter.tsx # Category pill buttons
│   ├── QuoteCard.tsx      # Glassmorphism quote display card
│   ├── Controls.tsx       # Action buttons (new, copy, tweet, favorite)
│   └── FavoritesList.tsx  # Slide-in favorites panel
└── services/
    └── quoteService.ts    # API calls with timeout & offline fallback
```

## License

MIT
