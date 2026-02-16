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
    // In empty state, add +1 for "Browse all equipment" option
    const itemCount = hasResults ? results.length : suggestions.length + 1;

    // No items to navigate (in empty state we still have "Browse all" so itemCount >= 1)
    if (!isOpen) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((prev) => {
          const next = prev < itemCount - 1 ? prev + 1 : prev;
          // Scroll the item into view
          setTimeout(() => {
            const element = document.getElementById(`result-${next}`);
            element?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }, 0);
          return next;
        });
        break;

      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((prev) => {
          const next = prev > 0 ? prev - 1 : 0;
          // Scroll the item into view
          setTimeout(() => {
            const element = document.getElementById(`result-${next}`);
            element?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }, 0);
          return next;
        });
        break;

      case 'Enter':
        event.preventDefault();
        if (activeIndex >= 0) {
          if (hasResults) {
            // Navigate to the selected result
            const slug = results[activeIndex].item.slug;
            router.push(`/is-it-a-real-laser/${slug}`);
            setIsOpen(false);
            setQuery('');
            setActiveIndex(-1);
          } else if (activeIndex === suggestions.length) {
            // "Browse all equipment" is selected - scroll to #machines
            handleBrowseAll();
          } else if (suggestions[activeIndex]?.slug) {
            // Navigate to a suggestion
            router.push(`/is-it-a-real-laser/${suggestions[activeIndex].slug}`);
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
        setTimeout(() => {
          const element = document.getElementById('result-0');
          element?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }, 0);
        break;

      case 'End':
        event.preventDefault();
        setActiveIndex(itemCount - 1);
        setTimeout(() => {
          const element = document.getElementById(`result-${itemCount - 1}`);
          element?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }, 0);
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

  // Handle "Browse all equipment" selection
  function handleBrowseAll() {
    setIsOpen(false);
    setQuery('');
    setActiveIndex(-1);
    // Scroll to the machines section
    const machinesSection = document.getElementById('machines');
    if (machinesSection) {
      machinesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const hasResults = results.length > 0;
  const showDropdown = isOpen && hasResults;
  const showEmptyState = isOpen && debouncedQuery.trim() && !hasResults;

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search input container */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E8E4DF',
          borderRadius: '9999px',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        className="focus-within:border-[#5E8B7E] focus-within:ring-2 focus-within:ring-[rgba(94,139,126,0.15)]"
      >
        {/* Search icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: '1rem',
            pointerEvents: 'none',
          }}
        >
          <svg
            style={{ width: '20px', height: '20px', color: '#5A5550' }}
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
          placeholder="Type the machine name your clinic uses..."
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            color: '#2D2D2D',
            fontSize: '1rem',
            padding: '0.875rem 1rem 0.875rem 0.75rem',
            border: 'none',
            outline: 'none',
          }}
        />
      </div>

      {/* Results dropdown */}
      {showDropdown && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-50 w-full mt-3 rounded-2xl max-h-96 overflow-auto"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E8E4DF',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
            textAlign: 'left',
          }}
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
        <div
          className="absolute z-50 w-full mt-3 rounded-2xl"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E8E4DF',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
            padding: '1.25rem 1rem',
            textAlign: 'left',
          }}
        >
          <p
            className="mb-4 text-sm"
            style={{
              color: '#5A5550',
              fontSize: '0.75rem',
            }}
          >
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
            onBrowseAll={handleBrowseAll}
          />
        </div>
      )}
    </div>
  );
}
