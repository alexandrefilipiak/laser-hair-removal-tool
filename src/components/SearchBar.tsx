'use client';

import { useState, useRef, useId, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/hooks/useSearch';
import { useDebounce } from '@/hooks/useDebounce';
import { useNotFoundSuggestions } from '@/hooks/useNotFoundSuggestions';
import type { EquipmentEntry } from '@/lib/equipment';
import { SearchResultItem } from './SearchResultItem';
import { NotFoundSuggestions } from './NotFoundSuggestions';

interface SearchBarProps {
  /** Equipment data to search through */
  equipment: EquipmentEntry[];
}

/**
 * Accessible autocomplete search bar with ARIA combobox pattern
 *
 * Features:
 * - Keyboard navigation (Arrow keys, Enter, Escape, Home, End)
 * - Click-outside to close dropdown
 * - 150ms debounce for performance
 * - ARIA attributes for screen reader accessibility
 * - Results limited to 8 for UX
 * - "Did you mean?" suggestions when no exact matches
 *
 * @example
 * <SearchBar equipment={equipmentData} />
 */
export function SearchBar({ equipment }: SearchBarProps) {
  // State
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // IDs for ARIA
  const listboxId = useId();

  // Router for navigation
  const router = useRouter();

  // Debounced search
  const debouncedQuery = useDebounce(query, 150);
  const results = useSearch(equipment, debouncedQuery);

  // Get suggestions for empty state (used for keyboard navigation count)
  const suggestions = useNotFoundSuggestions(equipment, debouncedQuery);

  // Reset active index when results or suggestions change
  useEffect(() => {
    setActiveIndex(-1);
  }, [results, suggestions]);

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Keyboard navigation handler
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    // Open dropdown on any key if we have query
    if (query.trim() && !isOpen) {
      setIsOpen(true);
    }

    // Determine which list we're navigating (results or suggestions)
    const hasResults = results.length > 0;
    const hasSuggestions = suggestions.length > 0;
    const itemCount = hasResults ? results.length : suggestions.length;

    // No items to navigate
    if (!isOpen || itemCount === 0) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((prev) =>
          prev < itemCount - 1 ? prev + 1 : 0
        );
        break;

      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : itemCount - 1
        );
        break;

      case 'Enter':
        event.preventDefault();
        if (activeIndex >= 0) {
          // Navigate to the selected item
          const slug = hasResults
            ? results[activeIndex].item.slug
            : suggestions[activeIndex]?.slug;
          if (slug) {
            router.push(`/is-it-a-real-laser/${slug}`);
            setIsOpen(false);
            setQuery('');
            setActiveIndex(-1);
          }
        }
        break;

      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        setActiveIndex(-1);
        break;

      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;

      case 'End':
        event.preventDefault();
        setActiveIndex(itemCount - 1);
        break;
    }
  }

  // Handle input focus
  function handleFocus() {
    if (query.trim()) {
      setIsOpen(true);
    }
  }

  // Handle input change
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setQuery(value);
    if (value.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  }

  const hasResults = results.length > 0;
  const showDropdown = isOpen && hasResults;
  const showEmptyState = isOpen && debouncedQuery.trim() && !hasResults;

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search container with glow effect */}
      <div className="relative group">
        {/* Glow effect on focus */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-300" />

        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none z-10">
          <svg
            className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Search input */}
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 ? `result-${activeIndex}` : undefined
          }
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="Search by device name, brand, or technology..."
          className="relative w-full py-4 pl-14 pr-5 text-lg bg-white border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder:text-gray-400"
        />
      </div>

      {/* Results dropdown */}
      {showDropdown && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-50 w-full mt-3 bg-white border border-gray-100 rounded-2xl shadow-xl max-h-96 overflow-auto"
        >
          {results.map((result, index) => (
            <SearchResultItem
              key={result.item.slug}
              result={result}
              isActive={index === activeIndex}
              index={index}
            />
          ))}
        </ul>
      )}

      {/* Empty state with suggestions */}
      {showEmptyState && (
        <div className="absolute z-50 w-full mt-3 bg-white border border-gray-100 rounded-2xl shadow-xl p-6">
          <p className="text-gray-500 mb-4 text-sm">
            No exact match for &ldquo;{debouncedQuery}&rdquo;
          </p>
          <NotFoundSuggestions
            query={debouncedQuery}
            equipment={equipment}
            activeIndex={activeIndex}
            onSelect={(slug) => {
              router.push(`/is-it-a-real-laser/${slug}`);
              setIsOpen(false);
              setQuery('');
              setActiveIndex(-1);
            }}
          />
        </div>
      )}
    </div>
  );
}
