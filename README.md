# Binance Orderbook Viewer

Real-time orderbook viewer for Binance trading pairs.

## What does this project do?

A web application that displays the orderbook of different Binance cryptocurrencies in real-time. You can select a trading pair (BTC, ETH, BNB, SOL, XRP, ADA, DOGE) and view the top 10 buy and sell orders with:

- Bid and ask prices
- Available quantities at each level
- Spread visualization (difference between best bid and ask)
- Automatic updates every 1.5 seconds
- Depth bars to visualize relative volume

## How to run the project

### Setup environment variables

Before running the project, configure your environment variables:

```bash
# Copy the example env file
cp .env.local.example .env.local
```

The `.env.local` file should contain:

```bash
NEXT_PUBLIC_BINANCE_API_URL=https://api.binance.com/api/v3
```

**Note:** The Binance API URL is public and doesn't require authentication. You can use the default value or modify it if needed.

### Option 1: With Docker (recommended)

```bash
docker build -t orderbook-challenge .
docker run -p 3000:3000 orderbook-challenge
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Local development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other available commands

```bash
npm run build        # Production build
npm start           # Production server
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint errors automatically
npm run format      # Format code with Prettier
npm test            # Run tests
```

## Technologies used

### Main dependencies

- **Next.js 14.2.3** - React framework with App Router
- **React 18.2.0** - UI library with hooks
- **TypeScript 5.4.5** - Static typing
- **Axios 1.6.8** - HTTP client for API calls
- **@tanstack/react-query 5.90.18** - Server state management and caching
- **Tailwind CSS 3.4.3** - Utility-first CSS framework
- **UUID 13.0.0** - Unique ID generation

### Development tools

- **ESLint** - Linter to maintain consistent code
  - `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` - TypeScript support
  - `eslint-config-next` - Next.js configuration
  - `eslint-config-prettier` - Prettier integration
  - `eslint-plugin-react` and `eslint-plugin-react-hooks` - React rules

- **Prettier 3.2.5** - Code formatter

- **Husky 9.1.7** - Git hooks to automate tasks
  - Runs ESLint and Prettier before each commit
  - Configured with `lint-staged` to check only modified files

- **Jest 30.2.0** - Testing framework
  - `@testing-library/react` - React component testing
  - `@testing-library/jest-dom` - Additional testing matchers
  - `jest-environment-jsdom` - DOM environment for tests

- **PostCSS** and **Autoprefixer** - CSS processing

## Configuration

### ESLint

ESLint configuration includes:

- Next.js rules
- Strict TypeScript rules
- React and React Hooks rules
- Prettier integration to avoid conflicts

### Husky

Husky is configured to run automatically before each commit:

1. ESLint on `.ts`, `.tsx`, `.js`, `.jsx` files and fix errors automatically
2. Prettier to format code
3. Only checks modified files (thanks to `lint-staged`)

### TypeScript

TypeScript is configured in strict mode (`strict: true`) for better type safety.

## Project structure

```
├── app/                    # Next.js pages and layouts
├── components/             # Reusable React components
├── services/               # Services (API calls)
├── types/                  # TypeScript type definitions
├── hooks/                  # Custom React hooks
├── helpers/                # Helper functions
├── constants/              # Application constants
└── public/                 # Static files
```
