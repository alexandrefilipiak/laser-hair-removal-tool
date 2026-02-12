import { describe, it, expect } from 'vitest';
import {
  getEquipmentBySlug,
  getAllEquipmentSlugs,
  isMachine,
  isTechnologyTerm,
  type EquipmentEntry,
  type MachineEntry,
  type TechnologyTermEntry,
} from './equipment';

describe('getEquipmentBySlug', () => {
  it('returns correct entry for valid slug', () => {
    const entry = getEquipmentBySlug('gentlemax-pro');
    expect(entry).toBeDefined();
    expect(entry?.name).toBe('GentleMax Pro');
  });

  it('returns undefined for unknown slug', () => {
    const entry = getEquipmentBySlug('unknown-machine');
    expect(entry).toBeUndefined();
  });

  it('resolves alias to canonical entry', () => {
    const entry = getEquipmentBySlug('gentle max pro');
    expect(entry).toBeDefined();
    expect(entry?.slug).toBe('gentlemax-pro');
    expect(entry?.name).toBe('GentleMax Pro');
  });

  it('normalizes input to lowercase', () => {
    const entry = getEquipmentBySlug('GentleMax-Pro');
    expect(entry).toBeDefined();
    expect(entry?.slug).toBe('gentlemax-pro');
  });
});

describe('getAllEquipmentSlugs', () => {
  it('returns array of all primary slugs', () => {
    const slugs = getAllEquipmentSlugs();
    expect(Array.isArray(slugs)).toBe(true);
    expect(slugs).toContain('gentlemax-pro');
    expect(slugs).toContain('shr');
    expect(slugs).toContain('755nm');
  });

  it('does not include aliases', () => {
    const slugs = getAllEquipmentSlugs();
    // 'gentle max pro' is an alias, not a primary slug
    expect(slugs).not.toContain('gentle max pro');
  });
});

describe('isMachine', () => {
  it('returns true for machine entries', () => {
    const machineEntry = getEquipmentBySlug('gentlemax-pro');
    expect(machineEntry).toBeDefined();
    expect(isMachine(machineEntry!)).toBe(true);
  });

  it('returns false for technology term entries', () => {
    const termEntry = getEquipmentBySlug('shr');
    expect(termEntry).toBeDefined();
    expect(isMachine(termEntry!)).toBe(false);
  });

  it('narrows type correctly', () => {
    const entry = getEquipmentBySlug('gentlemax-pro');
    expect(entry).toBeDefined();
    if (isMachine(entry!)) {
      // TypeScript should allow accessing machine-specific fields
      expect(entry.manufacturer).toBe('Candela');
      expect(entry.wavelengths).toBeDefined();
      expect(entry.brandTier).toBe('premium-clinical');
    }
  });
});

describe('isTechnologyTerm', () => {
  it('returns true for technology term entries', () => {
    const termEntry = getEquipmentBySlug('shr');
    expect(termEntry).toBeDefined();
    expect(isTechnologyTerm(termEntry!)).toBe(true);
  });

  it('returns false for machine entries', () => {
    const machineEntry = getEquipmentBySlug('gentlemax-pro');
    expect(machineEntry).toBeDefined();
    expect(isTechnologyTerm(machineEntry!)).toBe(false);
  });

  it('narrows type correctly', () => {
    const entry = getEquipmentBySlug('shr');
    expect(entry).toBeDefined();
    if (isTechnologyTerm(entry!)) {
      // TypeScript should allow accessing term-specific fields
      expect(entry.whatItIs).toBeDefined();
      expect(entry.whyItMatters).toBeDefined();
    }
  });
});
