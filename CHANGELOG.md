# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2026-01-20

### Breaking Changes
-   **`fetchRequest`**: Now supports multiple response types (`json`, `text`, `blob`, `arrayBuffer`, `auto`). Default behavior changed to auto-detect based on Content-Type header instead of always parsing as JSON.
-   **`debounce`**: Now accepts optional third parameter `options` with `immediate` flag for leading-edge execution.
-   Version bumped to 2.0.0 due to potential breaking changes in `fetchRequest` error handling.

### Added
-   **String Utilities** (7 new functions):
    -   `camelCase` - Convert strings to camelCase
    -   `snakeCase` - Convert strings to snake_case
    -   `kebabCase` - Convert strings to kebab-case
    -   `escapeHtml` - Escape HTML special characters (XSS prevention)
    -   `unescapeHtml` - Unescape HTML entities
    -   `stripHtml` - Remove all HTML tags from strings
    -   `pad` - Pad strings to specified length with customizable direction
-   **Number Utilities** (3 new functions):
    -   `randomInt` - Generate random integers in a range
    -   `round` - Round numbers to specific decimal places
    -   `formatNumber` - Format numbers with locale-specific separators
-   **Array Utilities** (7 new functions):
    -   `unique` - Remove duplicate values from arrays
    -   `uniqueBy` - Remove duplicates based on key function
    -   `chunk` - Split arrays into chunks of specified size
    -   `flatten` - Flatten nested arrays to specified depth
    -   `flattenDeep` - Recursively flatten all nested arrays
    -   `shuffle` - Randomly shuffle arrays (Fisher-Yates algorithm)
    -   `partition` - Split arrays into two groups based on predicate
-   **Object Utilities** (5 new functions):
    -   `deepClone` - Create deep copies of objects/arrays
    -   `pick` - Create object with only specified keys
    -   `omit` - Create object without specified keys
    -   `deepMerge` - Deep merge multiple objects
    -   `isEmpty` - Check if value is empty (objects, arrays, strings, etc.)
-   **Async Utilities** (4 new functions):
    -   `throttle` - Rate-limit function execution (complement to debounce)
    -   `sleep` - Promise-based delay utility
    -   `retry` - Retry failed async operations with configurable attempts/delay
    -   `timeout` - Add timeout to promises
-   **DOM Utilities** (3 new functions):
    -   `ready` - Execute function when DOM is fully loaded
    -   `getQueryParams` - Parse URL query parameters to object
    -   `buildQueryString` - Build query string from object
-   **Storage Utilities** (6 new functions):
    -   `setLocalStorage` / `getLocalStorage` / `removeLocalStorage` - localStorage helpers with JSON serialization
    -   `setSessionStorage` / `getSessionStorage` / `removeSessionStorage` - sessionStorage helpers with JSON serialization
-   **Enhanced MIME Type Detection**: Added 20+ new file signatures including video (MP4, WebM, AVI), audio (MP3, WAV, FLAC, OGG), documents (DOCX, XLSX, PPTX), and archives (RAR, TAR)
-   **Source Maps**: Minified build now includes source maps for easier debugging
-   **Comprehensive Test Suite**: Added 260+ lines of tests covering all new functions with edge cases

### Changed
-   Updated package description to reflect 60+ utility functions
-   Enhanced keywords in package.json for better discoverability
-   Organized public API exports into logical categories
-   Improved JSDoc comments with more examples and edge case documentation

### Fixed
-   `fetchRequest` no longer fails on non-JSON responses
-   `snakeCase` and `kebabCase` now correctly handle consecutive uppercase letters and spaces

## [1.0.0] - 2026-01-08

### Added
-   Complete UMD module support (CommonJS and Browser).
-   **Strings**: `capitalize`, `truncate`, `slugify`.
-   **Numbers**: `clamp`, `formatCurrency`.
-   **Validation**: `isValidEmail`, `isValidUrl`.
-   **DOM**: `createElement` now fully documented and tested.
-   **Array**: Standalone `sum`, `max`, `min`, `groupBy` (in addition to prototype extensions).
-   TypeScript definitions (`.d.ts`) for all new features.
-   Comprehensive Jest test suite.
-   GitHub Actions CI workflow.
-   Community files (CONTRIBUTING, CODE_OF_CONDUCT).

### Changed
-   Refactored `vanillaUtils.js` to use UMD pattern.
-   Updated build process to use `terser` for safe UMD minification.
-   Improved documentation generation pipeline.

### Removed
-   Redundant DOM helpers: `addClass`, `removeClass`, `toggleClass`.
