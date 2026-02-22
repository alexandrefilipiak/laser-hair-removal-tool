/**
 * Glossary data and utilities
 *
 * Provides access to glossary terms, equipment links, and category configuration.
 * All data is sourced from /src/data/glossary.json for easy maintenance.
 */

import glossaryData from '@/data/glossary.json';

export interface GlossaryTerm {
  term: string;
  aka?: string;
  definition: string;
  category: string;
}

export interface CategoryConfig {
  label: string;
  color: string;
}

/**
 * Get all glossary terms
 */
export function getAllGlossaryTerms(): GlossaryTerm[] {
  return glossaryData.terms;
}

/**
 * Get equipment name to slug mapping for internal links
 */
export function getEquipmentLinks(): Record<string, string> {
  return glossaryData.equipmentLinks;
}

/**
 * Get category display configuration
 */
export function getCategoryConfig(): Record<string, CategoryConfig> {
  return glossaryData.categoryConfig;
}

/**
 * Build anchor map for glossary term linking
 * Maps term names (and variations) to their URL-safe anchor IDs
 */
export function buildGlossaryAnchors(): Record<string, string> {
  const anchors: Record<string, string> = {};

  glossaryData.terms.forEach((item) => {
    const anchor = item.term.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    anchors[item.term] = anchor;

    // Add common variations
    if (item.term === 'Fitzpatrick Scale') {
      anchors['Fitzpatrick'] = anchor;
    }
    if (item.term === 'Thermal Relaxation Time') {
      anchors['thermal relaxation time'] = anchor;
    }
  });

  return anchors;
}

/**
 * Get glossary statistics
 */
export function getGlossaryStats() {
  const terms = glossaryData.terms;
  const categories = new Set(terms.map((t) => t.category));

  return {
    termCount: terms.length,
    categoryCount: categories.size,
  };
}

/**
 * Get terms grouped by first letter
 */
export function getTermsByLetter(): Record<string, GlossaryTerm[]> {
  const grouped: Record<string, GlossaryTerm[]> = {};

  glossaryData.terms.forEach((term) => {
    const letter = term.term[0].toUpperCase();
    if (!grouped[letter]) {
      grouped[letter] = [];
    }
    grouped[letter].push(term);
  });

  return grouped;
}

/**
 * Get unique first letters from all terms (sorted)
 */
export function getAvailableLetters(): string[] {
  const letters = new Set(glossaryData.terms.map((t) => t.term[0].toUpperCase()));
  return Array.from(letters).sort();
}
