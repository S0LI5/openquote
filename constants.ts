import { Quote, QuoteCategory } from './types';

// QuoteSlate API endpoint (free, no key, CORS-enabled)
export const API_BASE_URL = 'https://quoteslate.vercel.app/api/quotes/random';

// Map our categories to QuoteSlate API tag strings
export const CATEGORY_TAG_MAP: Record<string, string> = {
  [QuoteCategory.TECHNOLOGY]: 'technology',
  [QuoteCategory.INSPIRATIONAL]: 'inspiration',
  [QuoteCategory.HUMOROUS]: 'humor',
  [QuoteCategory.WISDOM]: 'wisdom',
  [QuoteCategory.LIFE]: 'life',
  [QuoteCategory.LOVE]: 'love',
  [QuoteCategory.SCIENCE]: 'science',
};

// Fallback quotes for offline / API failure
export const FALLBACK_QUOTES: Quote[] = [
  {
    _id: 'fb1',
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    tags: ["technology", "inspiration"]
  },
  {
    _id: 'fb2',
    content: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    tags: ["technology"]
  },
  {
    _id: 'fb3',
    content: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    tags: ["life", "wisdom"]
  },
  {
    _id: 'fb4',
    content: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    tags: ["inspiration"]
  },
  {
    _id: 'fb5',
    content: "It is better to remain silent at the risk of being thought a fool, than to talk and remove all doubt of it.",
    author: "Maurice Switzer",
    tags: ["humor", "wisdom"]
  },
  {
    _id: 'fb6',
    content: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    tags: ["wisdom"]
  },
  {
    _id: 'fb7',
    content: "Any sufficiently advanced technology is indistinguishable from magic.",
    author: "Arthur C. Clarke",
    tags: ["technology", "science"]
  },
  {
    _id: 'fb8',
    content: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    tags: ["inspiration", "life"]
  },
  {
    _id: 'fb9',
    content: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    tags: ["wisdom", "science"]
  },
  {
    _id: 'fb10',
    content: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    tags: ["humor", "wisdom"]
  },
  {
    _id: 'fb11',
    content: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    author: "Albert Einstein",
    tags: ["humor", "science"]
  },
  {
    _id: 'fb12',
    content: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    tags: ["wisdom", "life"]
  },
  {
    _id: 'fb13',
    content: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
    author: "Dr. Seuss",
    tags: ["love"]
  },
  {
    _id: 'fb14',
    content: "Science is not only a disciple of reason but also one of romance and passion.",
    author: "Stephen Hawking",
    tags: ["science", "inspiration"]
  },
  {
    _id: 'fb15',
    content: "Technology is a useful servant but a dangerous master.",
    author: "Christian Lous Lange",
    tags: ["technology"]
  },
];

export const CATEGORY_OPTIONS = [
  { label: '✦ All', value: QuoteCategory.RANDOM },
  { label: '💡 Inspirational', value: QuoteCategory.INSPIRATIONAL },
  { label: '🧠 Wisdom', value: QuoteCategory.WISDOM },
  { label: '💻 Technology', value: QuoteCategory.TECHNOLOGY },
  { label: '😄 Humorous', value: QuoteCategory.HUMOROUS },
  { label: '🌿 Life', value: QuoteCategory.LIFE },
  { label: '❤️ Love', value: QuoteCategory.LOVE },
  { label: '🔬 Science', value: QuoteCategory.SCIENCE },
];