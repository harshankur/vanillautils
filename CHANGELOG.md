# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
