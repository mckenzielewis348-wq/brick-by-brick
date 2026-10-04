// src/components/Composer.tsx
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { ComposerSegment, ComposerSubmitData, ComposerActions, ContextItem } from '../types';

type ComposerContextType = {
  value: ComposerSegment[];
  setValue: React.Dispatch<React.SetStateAction<ComposerSegment[]>>;
  attachments: File[];
  setAttachments: React.Dispatch<React.SetStateAction<File[]>>;
  clear: () => void;
  insertToken: (trigger: string, item: ContextItem) => void;
  submit: () => void;
  acceptFiles?: string;
};

const ComposerContext = createContext<ComposerContextType | null>(null);

export function useComposer() {
  const context = useContext(ComposerContext);
  if (!context) {
    throw new Error('Composer sub-components must be rendered within a <Composer> root.');
  }
  return context;
}

export type ComposerProps = {
  children: React.ReactNode;
  value?: ComposerSegment[];
  defaultValue?: ComposerSegment[];
  onValueChange?: (value: ComposerSegment[]) => void;
  onSubmit?: (data: ComposerSubmitData) => void;
  acceptFiles?: string;
  className?: string;
};

export function Composer({
  children,
  value: externalValue,
  defaultValue = [{ type: 'text', value: '' }],
  onValueChange,
  onSubmit,
  acceptFiles,
  className = '',
}: ComposerProps) {
  const [internalValue, setInternalValue] = useState<ComposerSegment[]>(defaultValue);
  const [attachments, setAttachments] = useState<File[]>([]);

  const value = externalValue !== undefined ? externalValue : internalValue;

  const updateValue = useCallback(
    (newValue: ComposerSegment[] | ((prev: ComposerSegment[]) => ComposerSegment[])) => {
      const resolved = typeof newValue === 'function' ? newValue(value) : newValue;
      if (externalValue === undefined) {
        setInternalValue(resolved);
      }
      onValueChange?.(resolved);
    },
    [externalValue, value, onValueChange]
  );

  const clear = useCallback(() => {
    updateValue([{ type: 'text', value: '' }]);
    setAttachments([]);
  }, [updateValue]);

  const insertToken = useCallback((trigger: string, item: ContextItem) => {
    updateValue(prev => [
      ...prev,
      { type: 'token', trigger, item },
      { type: 'text', value: '' }
    ]);
  }, [updateValue]);

  const submit = useCallback(() => {
    if (!onSubmit) return;
    
    const text = value
      .map(seg => (seg.type === 'text' ? seg.value : `${seg.trigger}${seg.item.label}`))
      .join('');

    onSubmit({
      text,
      value,
      attachments,
    });
  }, [onSubmit, value, attachments]);

  const contextValue = useMemo(
    () => ({
      value,
      setValue: updateValue,
      attachments,
      setAttachments,
      clear,
      insertToken,
      submit,
      acceptFiles,
    }),
    [value, updateValue, attachments, clear, insertToken, submit, acceptFiles]
  );

  return (
    <ComposerContext.Provider value={contextValue}>
      <div className={`brick-composer ${className}`} data-dragging={false}>
        {children}
      </div>
    </ComposerContext.Provider>
  );
}
