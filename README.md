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

## Project Structure

The project uses a modular folder structure for maintainability and scalability:

- `src/app/` – Next.js app directory (routing, pages, layouts)
- `src/components/` – Reusable React components
- `src/utils/` – Utility functions and helpers
- `src/config/` – Configuration files and constants
- `src/assets/` – Static assets (images, fonts, etc.)
- `src/styles/` – Global and modular stylesheets
- `public/` – Public static files (served at root URL)

Each folder is organized to separate concerns and promote code reuse. Add new modules or features in the most logical location. See the roadmap for further modularization guidance.

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
