// src/components/TokenChip.tsx
import React from 'react';
import { TokenSegment } from '../types';

export type TokenChipProps = {
  segment: TokenSegment;
  onRemove?: (id: string) => void;
  className?: string;
};

export function TokenChip({
  segment,
  onRemove,
  className = '',
}: TokenChipProps) {
  const { item } = segment;

  return (
    <span className={`brick-token-chip ${className}`}>
      {item.icon && <span className="brick-chip-icon">{item.icon}</span>}
      <span className="brick-chip-label">{item.label}</span>
      {onRemove && (
        <button
          type="button"
          className="brick-chip-remove"
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.label}`}
        >
          ×
        </button>
      )}
    </span>
  );
}
