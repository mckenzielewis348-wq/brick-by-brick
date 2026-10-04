// src/index.ts

// Export core components
export { Composer, useComposer, type ComposerProps } from './components/Composer';

// Export types and contracts
export type {
  ContextItem,
  TriggerConfig,
  TextSegment,
  TokenSegment,
  ComposerSegment,
  ComposerSubmitData,
  ComposerActions
} from './types';

// Export utilities
export { getText, getTokens, isEmpty } from './utils/serialization';
export { fuzzyFilter } from './utils/fuzzySearch';
