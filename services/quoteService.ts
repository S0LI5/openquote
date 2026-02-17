import { Quote, QuoteCategory } from '../types';
import { API_BASE_URL, FALLBACK_QUOTES, CATEGORY_TAG_MAP } from '../constants';

/**
 * Fetches a random quote from the QuoteSlate API, optionally filtered by tag.
 * Falls back to local quotes if API is unavailable.
 */
export const fetchQuote = async (category: QuoteCategory, signal?: AbortSignal): Promise<Quote> => {
  const isRandom = category === QuoteCategory.RANDOM;
  const tag = isRandom ? '' : CATEGORY_TAG_MAP[category] || '';
  const tagParam = tag ? `?tags=${tag}` : '';
  const url = `${API_BASE_URL}${tagParam}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    // Use provided signal or our timeout signal
    const finalSignal = signal || controller.signal;

    const response = await fetch(url, { signal: finalSignal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Map QuoteSlate response format to our Quote interface
    const quote: Quote = {
      _id: data.id?.toString() || crypto.randomUUID(),
      content: data.quote,
      author: data.author || 'Unknown',
      tags: data.tags ? (Array.isArray(data.tags) ? data.tags : data.tags.split(',').map((t: string) => t.trim())) : [],
    };

    return quote;
  } catch (error: unknown) {
    // Don't swallow abort errors from the parent signal
    if (error instanceof DOMException && error.name === 'AbortError' && signal?.aborted) {
      throw error;
    }

    console.warn('API request failed, using offline fallback.', error);
    return getFallbackQuote(category);
  }
};

/**
 * Returns a relevant quote from the local fallback list.
 */
const getFallbackQuote = (category: QuoteCategory): Quote => {
  let pool = FALLBACK_QUOTES;

  if (category !== QuoteCategory.RANDOM) {
    const tag = CATEGORY_TAG_MAP[category] || category;
    pool = FALLBACK_QUOTES.filter(q => q.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
    if (pool.length === 0) pool = FALLBACK_QUOTES;
  }

  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
};