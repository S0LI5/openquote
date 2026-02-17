export interface Quote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug?: string;
  length?: number;
  dateAdded?: string;
  dateModified?: string;
}

export enum QuoteCategory {
  RANDOM = 'random',
  TECHNOLOGY = 'technology',
  INSPIRATIONAL = 'inspirational',
  HUMOROUS = 'humor',
  WISDOM = 'wisdom',
  LIFE = 'life',
  LOVE = 'love',
  SCIENCE = 'science',
}

export type QuoteCategoryKey = keyof typeof QuoteCategory;