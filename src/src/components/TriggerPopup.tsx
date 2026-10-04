// src/components/TriggerPopup.tsx
import React from 'react';
import { ContextItem } from '../types';

export type TriggerPopupProps = {
  items: ContextItem[];
  selectedIndex: number;
  onSelect: (item: ContextItem) => void;
  className?: string;
};

export function TriggerPopup({
  items,
  selectedIndex,
  onSelect,
  className = '',
}: TriggerPopupProps) {
  if (items.length === 0) {
    return (
      <div className={`brick-trigger-popup empty ${className}`}>
        <div className="brick-popup-empty">No matching items</div>
      </div>
    );
  }

  return (
    <div className={`brick-trigger-popup ${className}`}>
      {items.map((item, index) => (
        <button
          key={item.id}
          type="button"
          className={`brick-popup-item ${index === selectedIndex ? 'selected' : ''}`}
          onClick={() => onSelect(item)}
        >
          {item.icon && <span className="brick-item-icon">{item.icon}</span>}
          <span className="brick-item-label">{item.label}</span>
          {item.category && <span className="brick-item-category">{item.category}</span>}
        </button>
      ))}
    </div>
  );
}
