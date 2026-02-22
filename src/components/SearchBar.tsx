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
  const [isMobile, setIsMobile] = useState(false);

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

  // Detect mobile for shorter placeholder
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
            router.push(`/equipment-verification-tool/${slug}`);
            setIsOpen(false);
            setQuery('');
            setActiveIndex(-1);
          } else if (activeIndex === suggestions.length) {
            // "Browse all equipment" is selected - scroll to #machines
            handleBrowseAll();
          } else if (suggestions[activeIndex]?.slug) {
            // Navigate to a suggestion
            router.push(`/equipment-verification-tool/${suggestions[activeIndex].slug}`);
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

  // Handle search button click
  function handleSearchClick() {
    if (activeIndex >= 0 && results.length > 0) {
      // Navigate to the highlighted result
      const slug = results[activeIndex].item.slug;
      router.push(`/equipment-verification-tool/${slug}`);
      setIsOpen(false);
      setQuery('');
      setActiveIndex(-1);
    } else if (results.length > 0) {
      // Navigate to the first result
      const slug = results[0].item.slug;
      router.push(`/equipment-verification-tool/${slug}`);
      setIsOpen(false);
      setQuery('');
      setActiveIndex(-1);
    } else {
      // No results - focus the input
      inputRef.current?.focus();
    }
  }

  const hasResults = results.length > 0;
  const showDropdown = isOpen && hasResults;
  const showEmptyState = isOpen && debouncedQuery.trim() && !hasResults;

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* Decorative glow effect on focus */}
      <div
        className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#5E8B7E]/20 via-[#7BA99E]/20 to-[#5E8B7E]/20 opacity-0 blur-md transition-opacity duration-300 pointer-events-none peer-focus-within:opacity-100"
        style={{ zIndex: -1 }}
        aria-hidden="true"
      />

      {/* Search input container */}
      <div
        className="group relative flex items-center h-14 md:h-16 bg-white border-2 border-[#E8E4DF] rounded-full shadow-lg shadow-black/5 transition-all duration-200 ease-out hover:border-[#D4D0CB] hover:shadow-xl hover:shadow-black/8 focus-within:border-[#5E8B7E] focus-within:shadow-xl focus-within:shadow-[#5E8B7E]/10"
      >
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
          placeholder={isMobile ? "Type the machine name..." : "Type the machine name your clinic uses..."}
          className="peer flex-1 h-full bg-transparent text-[#2D2D2D] text-base md:text-lg placeholder:text-[#9A9590] pl-5 md:pl-6 pr-16 md:pr-36 border-none outline-none"
        />

        {/* Search button */}
        <button
          type="button"
          onClick={handleSearchClick}
          aria-label="Search"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-10 md:h-12 px-4 md:px-6 rounded-full bg-[#5E8B7E] hover:bg-[#4A7566] active:bg-[#3D6356] text-white font-semibold text-sm md:text-base shadow-md shadow-[#5E8B7E]/25 hover:shadow-lg hover:shadow-[#5E8B7E]/30 transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5E8B7E]/50 focus:ring-offset-2"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="hidden md:inline">Search</span>
        </button>
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
              router.push(`/equipment-verification-tool/${slug}`);
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
