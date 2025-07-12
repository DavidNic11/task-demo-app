# Copilot Instructions for JIRA Timeline Report

## Tech Stack

- **Frontend**: React 18.3.1 with TypeScript, migrating from CanJS legacy framework
- **Build System**: Vite 5.4.8 with multi-entry point configuration for main app, OAuth callback, and Atlassian Connect
- **Styling**: TailwindCSS 3.4.13 with custom Atlaskit design system integration
- **State Management**: TanStack React Query 5.59.16 for server state, React context for UI state
- **Testing**: Playwright for E2E testing, Vitest for unit tests with jsdom environment
- **Backend**: Node.js/Express server with OAuth 2.0 authentication
- **API Integration**: Extensive JIRA REST API integration with custom request helpers
- **Deployment**: Docker containerization with development and production configurations

## Architectural Overview

- **ui**: React components organized by feature domains with shared component library using Atlaskit and custom components
- **routing**: Factory pattern implementation with environment-specific link builders and query parameter handling
- **state-management**: React Query for server state caching, React context for UI state, no external state library
- **data-layer**: Custom data processors with pipeline architecture for transforming JIRA issue data
- **auth**: OAuth 2.0 implementation with token management and OIDC helpers for JIRA authentication
- **business-logic**: Domain-specific logic for timeline calculations, auto-scheduling, and report generation
- **build-system**: Vite-based build with TypeScript, multi-entry points, and environment-specific configurations
- **testing**: Playwright for authenticated user flows, Vitest for component and utility testing
- **jira-integration**: Comprehensive JIRA API integration with rate limiting, caching, and error handling
- **reporting-engine**: Complex report generation with Gantt charts, scatter plots, and timeline visualizations
- **theming**: TailwindCSS with custom design tokens matching Atlaskit design system
- **configuration-management**: Environment-based configuration with feature flags and team-specific settings

## Conventions by Category

### React Components

- Use TypeScript functional components with explicit typing: `const Component: React.FC<Props> = ({ prop }) => {}`
- Import React types separately: `import type { ReactNode } from 'react'`
- Use destructured props in function parameters
- Organize imports: types first, then React imports, then external libraries, then local imports
- Use context providers for shared state: `<Context.Provider value={contextValue}>`
- Export components as named exports, not default exports
- Use fragment syntax `<>` for multiple elements without wrapper

### React Hooks

- Use TypeScript function declarations with explicit generic types: `export function useHook<T>(value: T): T`
- Alternative arrow function pattern for complex hooks with default generics: `export const useHook = <TData = string>(...)`
- Always return cleanup functions from useEffect: `return () => { clearTimeout(handler); }`
- Use lazy initialization for complex initial state: `useState(() => deserialize(value))`
- Type state setters with React's Dispatch type: `const set: Dispatch<SetStateAction<TData>>`
- Handle errors with try-catch and console warnings for user-facing issues

### Utility Functions

- Use named exports with explicit typing: `export function unique<TItem, TKey extends string | number | symbol>`
- Provide specialized versions for common use cases: `uniqueKeys`, `uniqueIds`
- Use Map for efficient deduplication and lookups
- Use Record types for dynamic object structures: `Record<string, string>`
- Organize utilities by functional domain: `utils/array/`, `utils/date/`, `utils/object/`
- Use const for immutable references, let for reassignable values
- Return new objects/arrays rather than mutating inputs

### Types & Interfaces

- Export interfaces with descriptive names: `export interface CanObservable<TData>`
- Use descriptive generic parameter names: `TData`, `TValues`, `TIssues` over single letters
- Provide default generic types: `<TValues = any[], TIssues = OidcJiraIssue[] | JiraIssue[]>`
- Use explicit null unions: `hash: string | null`
- Define callback functions with parameter and return types: `on(handler: () => void): void`
- Use Record type for string-indexed objects: `Record<string, string>`
- Organize related types in domain-specific files

### Build System

- Configure multi-entry points in Vite: `input: { main: resolve(__dirname, '/index.html'), oauth: '...', connect: '...' }`
- Integrate testing configuration directly in build config with jsdom environment
- Use ES module imports in build scripts: `import { defineConfig } from 'vite'`
- Use CommonJS exports for tooling configuration: `module.exports = { ... }`
- Configure TailwindCSS with content scanning: `content: ['./src/**/*.{js,tsx,ts}', './**.html']`
- Extend theme with custom design tokens matching Atlaskit colors
- Use safelist for dynamic classes: `safelist: ['pl-2', 'pl-4', 'pl-6', 'pl-8']`

### Routing System

- Use factory pattern for environment-specific implementations: `export type LinkBuilderFactory = (appKey?: string) => (...) => string`
- Augment global types for external APIs: `declare global { interface AP { ... } }`
- Handle query parameters with URLSearchParams API and support array values
- Use discriminated unions for different state types: `type HistoryStateType = 'all' | 'hash'`
- Properly decode URL components: `decodeURIComponent(value)`
- Return null/undefined safe operations with early returns

## Behavioral Summary for Copilot

- Use React Query's `useQuery` and `useMutation` hooks for all server state management
- Use Atlaskit components when available, particularly `@atlaskit/button`, `@atlaskit/select`, `@atlaskit/modal-dialog`
- Use TailwindCSS classes with custom color palette (blue-300: '#0065FF', neutral-800: '#172B4D')
- Use `clsx` for conditional class names and dynamic styling
- Import CanJS components from `'can'` when working with legacy parts of the codebase
- Use TypeScript strict mode patterns with explicit typing for all function parameters and returns
- Organize imports in order: type imports, React imports, external libraries, relative imports
- Use `src/request-helpers/` utilities for JIRA API calls with built-in error handling and rate limiting
- Use `src/utils/` utilities for data transformation (unique, date formatting, object manipulation)
- Follow the existing component directory structure with feature-based organization
- Use React context providers for UI state that needs to be shared across components
- Use environment variables through the `JtrEnv` type for configuration
- Write Playwright tests for user flows and Vitest tests for utilities and components
- Use the existing error handling patterns with try-catch blocks and user-friendly error messages
- Follow the existing data processing pipeline patterns for transforming JIRA issue data
- Use the established OAuth flow and token management patterns for authentication
