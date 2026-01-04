## [Unreleased]

### Added

- Refactored income model and UI to use Gross Amount and Net Amount throughout all features.
- Net Amount is now auto-calculated via the tax calculator popup in the Add/Edit Income modal.
- Updated income list/table, modal, and test data to reflect new terminology and logic.
- Removed all references to Expected/Actual Amount in favor of Gross/Net.
- Tax withholding calculations (federal, state, custom deductions) for each income source, with interactive calculator and net income display. UI supports dark/light themes and is accessible. Test data updated for realistic ~$60k/year household.
- Income sources CRUD (add/edit/delete) page with modal forms, validation, and error handling
- Redux slice for income sources
- Test data for ~$60k/year household income sources in `src/assets/testdata_income.json`
- Sidebar navigation link to Income page
- Accessibility improvements: navigation roles, aria-labels, skip-to-content link, visible focus states, improved color contrast, and screen reader support for onboarding wizard.

# Changelog

## [Unreleased]

- Added guided onboarding wizard for new users with step-by-step setup for household, income, and budget.
- Added onboarding test data for a ~$60k/year household in `src/assets/testdata_onboarding.json`.
- Added button styles for primary and secondary actions in onboarding wizard.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-12-30

### Added

- Initial project setup with modular folder structure
- Next.js with TypeScript, SSR/SSG, and routing
- ESLint, Prettier, and lint-staged configuration
- Static asset handling and public folder
- Automated deployment with Vercel
- CI/CD with GitHub Actions (build, test, deploy)
