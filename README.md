# Theming (Light/Dark Mode)

This app supports light and dark themes using Tailwind CSS. A theme switcher is available in the header to toggle between modes. The selected theme is saved in localStorage and respects system preferences by default.

**How it works:**

- Uses Tailwind's `darkMode: 'class'` strategy.
- The `ThemeSwitcher` component toggles the `dark` class on `<html>`.
- Custom CSS variables in `globals.css` provide background/foreground color support.

**To add theme support to new components:**

- Use `bg-background` and `text-foreground` for backgrounds and text.
- Use `dark:` variants for Tailwind classes as needed.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Modular Design & Folder Structure

This project follows a modular, scalable architecture to ensure maintainability, separation of concerns, and ease of feature development. Each major feature or concern is isolated in its own directory, and code is organized for clarity and reusability.

### Top-Level Structure

- `src/app/` – Next.js app directory for routing, layouts, and pages. Each route is a folder, supporting nested layouts and server/client components.
- `src/components/` – Reusable React components, organized by domain (e.g., `layout/`, `onboarding/`). Each component is a single file with one export.
- `src/features/` – Feature modules (Redux slices, business logic, feature-specific state). Each feature has its own folder (e.g., `example/`).
- `src/hooks/` – Custom React hooks for data fetching, state, or logic reuse. Hooks are colocated by domain when possible.
- `src/api/` – API client modules and data-fetching logic, using a global Axios instance for consistency and error handling.
- `src/utils/` – Utility functions and helpers, shared across the app.
- `src/config/` – Configuration files, constants, and environment-specific settings.
- `src/assets/` – Static assets (images, fonts, test data). Test data for a ~$60k/year household is provided for development and testing.
- `src/styles/` – Global and modular stylesheets, including Tailwind CSS configuration and custom CSS variables.
- `src/mocks/` – Mock Service Worker (MSW) setup for API mocking in development and tests.
- `public/` – Public static files (served at root URL).

### Architectural Patterns

- **Single Export per File:** Each component, hook, or utility exports only one symbol (default or named) to avoid confusion and circular dependencies.
- **No Code Duplication:** Shared logic is abstracted into hooks or utilities. Components are reused and never duplicated.
- **Hooks Usage:** React hooks are only called inside function components or custom hooks, never in regular functions or outside React context.
- **State Management:** Uses Redux Toolkit for global state, colocated slices in `src/features/`, and React Query for data fetching/caching.
- **API Layer:** All API calls go through a global Axios client (`src/utils/apiClient.ts`) with global error handling and interceptors.
- **Testing & Mocking:** MSW is used for API mocking. Test data is realistic and based on a ~$60k/year household (see `src/assets/testdata_onboarding.json`).
- **Theming:** Light/dark mode is supported via Tailwind CSS and a `ThemeSwitcher` component. All UI respects theme variables.
- **Accessibility & Responsiveness:** All components are accessible (WCAG), keyboard navigable, and mobile responsive.

### Adding New Features

- Place new features in the most logical folder (e.g., a new slice in `src/features/`, a new page in `src/app/`, or a new component in `src/components/`).
- Update or add test data in `src/assets/` as needed.
- Follow the roadmap and quality standards for code style, documentation, and testing.

For more details, see the [Financial Assistant Roadmap](FINANCIAL_ASSISTANT_ROADMAP.md) and [CHANGELOG.md].

## Environment Variables

This project uses a `.env.local` file for environment variables. Example variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_VERCEL_ENV=development
NEXT_PUBLIC_FEATURE_FLAG=true
```

- `NEXT_PUBLIC_API_URL`: Base URL for API requests (update for production)
- `NEXT_PUBLIC_VERCEL_ENV`: Current environment (development, preview, production)
- `NEXT_PUBLIC_FEATURE_FLAG`: Example feature flag for conditional features

**How to use:**

- Place your `.env.local` file in the project root.
- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser and can be accessed in your code via `process.env.NEXT_PUBLIC_*`.
- Do not commit `.env.local` to version control; it is ignored by default.

See [Next.js Environment Variables documentation](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables) for more details.

## Setup & Deployment

Follow these steps to set up and deploy the Financial Assistant app:

### 1. Prerequisites

- **Node.js**: Install the latest LTS version (see `package.json` for supported versions)
- **npm**: Comes with Node.js, or use `yarn`, `pnpm`, or `bun` if preferred
- **Git**: For version control and cloning the repository

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/finance_app.git
cd finance_app
```

### 3. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 4. Configure Environment Variables

- Copy `.env.local.example` to `.env.local` (create one if not present)
- Update values as needed for your environment

### 5. Run the Development Server

```bash
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) in your browser

### 6. Lint, Format, and Test

- Lint: `npm run lint`
- Format: `npm run format`
- Test: `npm test` (add tests as the project grows)

### 7. Build for Production

```bash
npm run build
npm start
```

### 8. Deployment

- **Vercel**: This project is pre-configured for Vercel. Connect your repo and set the required environment variables in the Vercel dashboard.
- **Manual**: Deploy the `.next` build output to your preferred host. See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for options.

### 9. CI/CD

- Automated workflows for build, test, and deploy are set up in `.github/workflows/`.
- See the roadmap and `CHANGELOG.md` for release/versioning workflow.

---

For more details, see the [Financial Assistant Roadmap](FINANCIAL_ASSISTANT_ROADMAP.md) and [CHANGELOG.md].
