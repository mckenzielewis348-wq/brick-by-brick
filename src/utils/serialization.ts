// src/utils/serialization.ts
import { ComposerSegment, ContextItem, TokenSegment } from '../types';

/** Extracts plain text, mapping tokens to their display labels (e.g. "@README.md") */
export function getText(segments: ComposerSegment[]): string {
  return segments
    .map(seg => (seg.type === 'text' ? seg.value : `${seg.trigger}${seg.item.label}`))
    .join('');
}

/** Extracts referenced context items, optionally filtered by a specific trigger char like '@' */
export function getTokens(segments: ComposerSegment[], triggerChar?: string): ContextItem[] {
  return segments
    .filter((seg): seg is TokenSegment => seg.type === 'token')
    .filter(seg => (triggerChar ? seg.trigger === triggerChar : true))
    .map(seg => seg.item);
}

/** Returns true if the composer contains no text or tokens */
export function isEmpty(segments: ComposerSegment[]): boolean {
  if (segments.length === 0) return true;
  return segments.every(seg => seg.type === 'text' && seg.value.trim() === '');
}
