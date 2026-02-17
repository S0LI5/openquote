import React from 'react';
import { QuoteCategory } from '../types';
import { CATEGORY_OPTIONS } from '../constants';

interface CategoryFilterProps {
  selectedCategory: QuoteCategory;
  onSelectCategory: (category: QuoteCategory) => void;
  disabled?: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onSelectCategory, disabled }) => {
  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}
      role="group"
      aria-label="Quote Categories"
    >
      {CATEGORY_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelectCategory(option.value)}
          disabled={disabled}
          className={`category-pill ${selectedCategory === option.value ? 'category-pill--active' : ''}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;