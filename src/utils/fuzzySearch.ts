// src/utils/fuzzySearch.ts
import { ContextItem } from '../types';

export function fuzzyFilter(items: ContextItem[], query: string): ContextItem[] {
  if (!query) return items;
  const lowerQuery = query.toLowerCase();
  
  return items.filter(item => {
    const labelMatch = item.label.toLowerCase().includes(lowerQuery);
    const idMatch = item.id.toLowerCase().includes(lowerQuery);
    const descMatch = item.description?.toLowerCase().includes(lowerQuery);
    return labelMatch || idMatch || descMatch;
  });
}
