// src/components/ComposerInput.tsx
import React, { useRef } from 'react';
import { useComposer } from './Composer';
import { getText } from '../utils/serialization';

export type ComposerInputProps = {
  placeholder?: string;
  className?: string;
  rows?: number;
};

export function ComposerInput({
  placeholder = 'Type a message or use @ to reference context...',
  className = '',
  rows = 1,
}: ComposerInputProps) {
  const { value, setValue, submit } = useComposer();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const plainText = getText(value);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    // Basic segment sync mapping text changes back to root segments
    setValue([{ type: 'text', value: newText }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className={`brick-input-container ${className}`}>
      <textarea
        ref={textareaRef}
        value={plainText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={rows}
        className="brick-textarea"
      />
    </div>
  );
}
