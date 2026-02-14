'use client';

import type { FuseResultMatch } from 'fuse.js';

interface HighlightMatchProps {
  /** The full text to display */
  text: string;
  /** Fuse.js match data containing indices */
  matches: readonly FuseResultMatch[] | undefined;
  /** The field key to look for in matches (e.g., 'name', 'manufacturer') */
  fieldKey: string;
}

/**
 * Renders text with matched characters highlighted
 *
 * Uses Fuse.js match indices to wrap matched portions in <mark> tags
 * with sage green highlight styling.
 *
 * @example
 * <HighlightMatch
 *   text="GentleMax Pro"
 *   matches={fuseResult.matches}
 *   fieldKey="name"
 * />
 * // If "gentle" matched, renders: <mark>Gentle</mark>Max Pro
 */
export function HighlightMatch({
  text,
  matches,
  fieldKey,
}: HighlightMatchProps) {
  // Find matches for this specific field
  const fieldMatch = matches?.find((match) => match.key === fieldKey);

  // No matches for this field - return plain text
  if (!fieldMatch || !fieldMatch.indices || fieldMatch.indices.length === 0) {
    return <span>{text}</span>;
  }

  // Build segments by iterating through match indices
  const segments: React.ReactNode[] = [];
  let lastIndex = 0;

  for (let i = 0; i < fieldMatch.indices.length; i++) {
    const [start, end] = fieldMatch.indices[i];

    // Add non-matched text before this match
    if (start > lastIndex) {
      segments.push(
        <span key={`text-${i}`}>{text.slice(lastIndex, start)}</span>
      );
    }

    // Add matched text with highlight
    segments.push(
      <mark
        key={`match-${i}`}
        style={{
          backgroundColor: 'rgba(94, 139, 126, 0.2)',
          color: '#5E8B7E',
          borderRadius: '2px',
          padding: '0 2px',
        }}
      >
        {text.slice(start, end + 1)}
      </mark>
    );

    lastIndex = end + 1;
  }

  // Add remaining text after last match
  if (lastIndex < text.length) {
    segments.push(<span key="text-end">{text.slice(lastIndex)}</span>);
  }

  return <span>{segments}</span>;
}
