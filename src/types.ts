// src/types.ts
import React from 'react';

export type ContextItem = {
  id: string;
  label: string;
  type: string;
  description?: string;
  icon?: React.ReactNode;
  group?: string;
  data?: Record<string, unknown>;
};

export type TriggerConfig = {
  char: string;
  label?: string;
  items: 
    | ContextItem[] 
    | ((params: { query: string; signal: AbortSignal }) => Promise<ContextItem[]>);
  onSelect?: (item: ContextItem, composer: ComposerActions) => boolean | void;
};

// The building blocks of our input state
export type TextSegment = { type: 'text'; value: string };
export type TokenSegment = { type: 'token'; trigger: string; item: ContextItem };
export type ComposerSegment = TextSegment | TokenSegment;

export type ComposerSubmitData = {
  text: string;                  // Plain text representation
  value: ComposerSegment[];      // Raw structural segments
  attachments: File[];           // File payloads
};

export type ComposerActions = {
  clear: () => void;
  focus: () => void;
  insertToken: (trigger: string, item: ContextItem) => void;
};
