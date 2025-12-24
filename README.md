# Gentleman Programming Book

The official book for the Gentleman Programming community - a comprehensive guide to software development, clean code practices, and frontend architecture.

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **React**: 19.1.0
- **Styling**: Vanilla Extract CSS
- **Content**: MDX with syntax highlighting
- **Testing**: Vitest + Playwright
- **Language**: TypeScript 5.7

## Getting Started

### Prerequisites

- Node.js 22.x (see `.nvmrc`)
- Bun (recommended) or npm

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the book.

## Available Scripts

```bash
# Development
bun run dev              # Start dev server
bun run build            # Production build
bun run start            # Start production server

# Testing
bun run test             # Unit tests (watch mode)
bun run test:run         # Unit tests (single run)
bun run test:e2e         # E2E tests
bun run test:e2e:headed  # E2E tests with browser UI
bun run test:e2e:debug   # E2E tests in debug mode
bun run test:all         # Run all tests

# Code Quality
bun run lint             # Run ESLint
bun run lint:fix         # Fix ESLint issues
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/           # i18n routing (en, es)
│   │   ├── (book)/         # Book pages
│   │   └── (home)/         # Home page
│   ├── _components/        # App-level components
│   └── api/                # Route Handlers
├── data/
│   └── book/               # MDX chapters
│       ├── en/             # English content
│       └── es/             # Spanish content
├── lib/                    # Utilities
├── modules/                # Feature modules
│   ├── book/               # Book-specific logic
│   ├── shared/             # Shared components
│   └── theme/              # Theme configuration
└── styles/                 # Global styles
```

## Features

- **Multi-language**: English and Spanish support via URL prefix (`/en`, `/es`)
- **18 Chapters**: Covering Clean Agile, Architecture, React, TypeScript, and more
- **Dark/Light/Sepia themes**: Reader-friendly color schemes
- **PDF Generation**: Export the entire book as PDF
- **Responsive Design**: Works on all devices
- **Static Generation**: Pre-rendered for optimal performance

## API Endpoints

- `GET /api/pdf` - Generate PDF versions of the book (EN & ES)
- `GET /api/hello` - Health check endpoint

## Testing

The project follows TDD practices with comprehensive test coverage:

- **Unit Tests**: 18 tests covering components and hooks
- **E2E Tests**: 25 tests covering user journeys

See [AGENTS.md](./AGENTS.md) for detailed testing guidelines.

## Contributing

1. Read [AGENTS.md](./AGENTS.md) for development methodology
2. Follow TDD: Write tests first
3. Ensure all tests pass before committing
4. Use conventional commits

## Community

Join the Gentleman Programming community:

👉 **https://doras.to/gentleman-programming**

## License

This project is open source and available under the MIT License.
