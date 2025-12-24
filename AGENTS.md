# AGENTS.md - Development Methodology & Guidelines

This document defines how AI agents and developers should behave when working on this project. It establishes TDD practices, testing strategies, and architectural decisions.

> **Note**: This file is also used by [Gentleman Guardian Angel (gga)](https://github.com/Gentleman-Programming/gentleman-guardian-angel) for AI-powered code review on every commit.

---

## Gentleman Guardian Angel (GGA) Integration

### What is GGA?

GGA is a provider-agnostic code review tool that validates staged files against this `AGENTS.md` on every commit. It's like having a senior developer review every line before it hits the repo.

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│   git commit    │ ──▶ │  AI Review   │ ──▶ │  ✅ Pass/Fail   │
│  (staged files) │     │  (any LLM)   │     │  (with details) │
└─────────────────┘     └──────────────┘     └─────────────────┘
```

### Installation

```bash
# Install via Homebrew
brew tap gentleman-programming/tap
brew install gga

# Initialize in project
gga init

# Install git hook
gga install
```

### Configuration (.gga)

```bash
# AI Provider
PROVIDER="claude"

# File patterns to review
FILE_PATTERNS="*.ts,*.tsx,*.js,*.jsx"

# Exclude test files from review
EXCLUDE_PATTERNS="*.test.ts,*.spec.ts,*.test.tsx,*.spec.tsx,*.d.ts"

# Rules file (this file!)
RULES_FILE="AGENTS.md"

# Fail on ambiguous AI responses
STRICT_MODE="true"
```

### Bypass Review (Emergency Only)

```bash
git commit --no-verify -m "hotfix: urgent fix"
```

---

## Core Philosophy

### TDD First - No Exceptions

**NEVER write production code before tests exist.**

```
┌─────────────────────────────────┐
│  🔴 RED → 🟢 GREEN → ♻️ REFACTOR  │
│     ↑                     ↓      │
│     └─────────────────────┘      │
└─────────────────────────────────┘
```

### The Three Laws of TDD

1. **Do NOT write production code** until you have a failing test
2. **Do NOT write more test** than necessary to fail
3. **Do NOT write more code** than necessary to pass the test

---

## Testing Stack

### Unit & Integration Tests

| Tool                | Purpose                        |
| ------------------- | ------------------------------ |
| **Vitest**          | Test runner (fast, ESM-native) |
| **Testing Library** | User-centric DOM testing       |
| **jsdom**           | Browser environment simulation |

```bash
# Run unit/integration tests
bun run test        # Watch mode
bun run test --run  # Single run
```

### E2E Tests

| Tool            | Purpose                     |
| --------------- | --------------------------- |
| **Playwright**  | Cross-browser E2E testing   |
| **Mock Server** | API isolation (when needed) |

```bash
# Run E2E tests
bun run test:e2e           # Run all E2E
bun run test:e2e --headed  # With browser UI
bun run test:e2e --debug   # Debug mode
```

---

## Testing Patterns

### 1. AAA Pattern (Arrange-Act-Assert)

```typescript
it('should add item to cart', async () => {
	// Arrange
	const user = userEvent.setup();
	render(<ProductCard product={mockProduct} />);

	// Act
	await user.click(screen.getByRole('button', { name: /add to cart/i }));

	// Assert
	expect(screen.getByText('Added to cart')).toBeVisible();
});
```

### 2. Query Priority (Testing Library)

Use queries in this order of preference:

1. 🥇 `getByRole` - Most accessible (buttons, links, headings)
2. 🥈 `getByLabelText` - For form elements with labels
3. 🥉 `getByText` - For visible text content
4. 🏃 `getByTestId` - Last resort only

```typescript
// ✅ Good - semantic query
screen.getByRole('button', { name: /submit/i });

// ❌ Bad - implementation detail
document.querySelector('.submit-btn');
```

### 3. Fake It 'Til You Make It

Start with the simplest implementation (even hardcoded):

```typescript
// 🔴 RED: Test fails
it('should calculate tax', () => {
	expect(calculateTax(100, 10)).toBe(10);
});

// 🟢 GREEN: Hardcoded is VALID here
function calculateTax() {
	return 10; // Fake it!
}

// Then add more tests to force real implementation (Triangulation)
```

### 4. Triangulation

Use multiple tests to force the correct implementation:

```typescript
// Test 1: Edge case
it('returns 0 for no items', () => {
	expect(calculateTotal([])).toBe(0);
});

// Test 2: Single item
it('calculates single item', () => {
	expect(calculateTotal([{ price: 10 }])).toBe(10);
});

// Test 3: Multiple items - forces real logic
it('calculates multiple items', () => {
	expect(calculateTotal([{ price: 10 }, { price: 20 }])).toBe(30);
});
```

---

## E2E Testing Strategy

### Page Object Model (POM)

Encapsulate page interactions in classes:

```typescript
// e2e/pages/HomePage.ts
export class HomePage {
	constructor(private page: Page) {}

	async open() {
		await this.page.goto('/');
	}

	async clickStartReading() {
		await this.page.getByRole('link', { name: /start reading/i }).click();
	}

	async selectLanguage(locale: 'en' | 'es') {
		await this.page.getByTitle('language-select').click();
		await this.page.getByRole('option', { name: locale }).click();
	}

	async shouldHaveTitle(title: string) {
		await expect(this.page.getByRole('heading', { level: 1 })).toHaveText(
			title,
		);
	}
}
```

### User Journey Tests

Test complete user flows:

```typescript
test('Complete reading journey', async ({ page }) => {
	const homePage = new HomePage(page);
	const chapterPage = new ChapterPage(page);

	// 1. Start from home
	await homePage.open();
	await homePage.shouldHaveTitle('Gentleman Programming Book');

	// 2. Navigate to first chapter
	await homePage.clickStartReading();

	// 3. Read chapter content
	await chapterPage.shouldShowChapterTitle('Clean Agile');

	// 4. Navigate to next chapter
	await chapterPage.clickNext();
	await chapterPage.shouldShowChapterTitle('Communication');
});
```

### Visual Regression Testing

```typescript
test('Visual regression - home page', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveScreenshot('home-page.png', {
		maxDiffPixels: 100,
	});
});
```

---

## Project Architecture

### Current Structure (Pages Router)

```
src/
  pages/                    ← Next.js Pages Router
    api/
    book/
      [chapterId].tsx
    _app.tsx
    _document.tsx
    index.tsx
  modules/                  ← Feature modules
    book/
      components/
      hooks/
      models/
      repository/
      schemes/
      utils/
    shared/
      components/
      services/
      store/
      utils/
    theme/
      components/
      config/
      utils/
  data/
    book/
      en/                   ← English chapters (MDX)
      es/                   ← Spanish chapters (MDX)
  styles/
```

### Target Structure (App Router - Future)

```
src/
  app/                      ← Next.js App Router
    (home)/
      page.tsx
      _components/
      layout.tsx
    (book)/
      [chapterId]/
        page.tsx
        loading.tsx
        error.tsx
      layout.tsx
      _actions/
    api/
      pdf/
        route.ts
    layout.tsx
    globals.css
  shared/                   ← Components used by 2+ features
    components/
      ui/
    hooks/
    types/
  lib/                      ← Utilities
```

---

## Technology Stack

### Core

| Technology | Version       | Purpose         |
| ---------- | ------------- | --------------- |
| Next.js    | 13.3.4 → 15.x | React framework |
| React      | 18.2.0 → 19.x | UI library      |
| TypeScript | 5.7.2         | Type safety     |
| Node.js    | 22.x          | Runtime         |

### Styling

| Technology      | Purpose                     |
| --------------- | --------------------------- |
| Vanilla Extract | CSS-in-TS with zero runtime |
| Radix UI        | Accessible primitives       |
| Framer Motion   | Animations                  |

### Content

| Technology        | Purpose                     |
| ----------------- | --------------------------- |
| MDX               | Markdown + JSX for chapters |
| next-mdx-remote   | MDX rendering               |
| gray-matter       | Frontmatter parsing         |
| rehype-prism-plus | Code syntax highlighting    |
| rehype-slug       | Heading anchors             |

### Testing

| Technology      | Purpose                |
| --------------- | ---------------------- |
| Vitest          | Unit/Integration tests |
| Testing Library | User-centric testing   |
| Playwright      | E2E tests              |

### Build & Quality

| Technology | Purpose                   |
| ---------- | ------------------------- |
| Bun        | Package manager & runtime |
| ESLint     | Linting                   |
| Prettier   | Code formatting           |
| Zod        | Schema validation         |

### PDF Generation

| Technology | Purpose        |
| ---------- | -------------- |
| Playwright | Page rendering |
| pdf-lib    | PDF merging    |

---

## Development Workflow

### Before Any Code Change

1. **Understand the requirement**
2. **Write failing tests first** (RED)
3. **Implement minimum code** (GREEN)
4. **Refactor with confidence** (REFACTOR)
5. **Run all tests** before commit

### Commit Strategy

```bash
# After each meaningful change
git add <files>
git commit -m "type: description"

# Types: feat, fix, refactor, test, docs, chore
```

### Test Verification Commands

```bash
# TypeScript compilation
bunx tsc --noEmit

# Unit/Integration tests
bun run test --run

# E2E tests
bun run test:e2e

# Build verification
bun run build
```

---

## Migration Safety Rules

When migrating/upgrading dependencies:

1. **Tests MUST pass before migration**
2. **Migrate one thing at a time**
3. **Test after each migration step**
4. **Commit after each successful step**
5. **Never push broken code**

```bash
# Safe migration workflow
bun run test --run          # ✅ All green
# Make change
bunx tsc --noEmit           # ✅ No TS errors
bun run test --run          # ✅ All green
bun run build               # ✅ Builds
git commit -m "..."         # Commit
# Repeat
```

---

## Code Quality Standards

### Component Guidelines

- **Server Components by default** (when using App Router)
- **Client Components only when needed** (interactivity, hooks)
- **Pure functions preferred** - easier to test
- **Props over global state** - explicit dependencies

### Testing Coverage Goals

| Type              | Target                           |
| ----------------- | -------------------------------- |
| Unit Tests        | 90%+ for utilities and hooks     |
| Integration Tests | 85%+ for components              |
| E2E Tests         | Critical user flows (5-10 tests) |

### What to Test

✅ **DO test:**

- User interactions
- Business logic
- Edge cases
- Error states
- Accessibility (via getByRole)

❌ **DON'T test:**

- Implementation details
- Third-party libraries
- CSS styles (use visual regression)
- Constants/static data

---

## CI/CD Integration

### GitHub Actions (Future)

```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run test --run
      - run: bun run build

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bunx playwright install --with-deps
      - run: bun run test:e2e
```

### Pre-commit Checks

```bash
# Must pass before commit
bunx tsc --noEmit && bun run test --run
```

---

## Debugging Tips

### Vitest

```typescript
// Debug single test
it.only('should...', () => { ... })

// Skip test temporarily
it.skip('should...', () => { ... })

// Console output
console.log(screen.debug())  // Print DOM
```

### Playwright

```bash
# Debug mode with inspector
bun run test:e2e --debug

# Generate tests interactively
bunx playwright codegen localhost:3000

# View trace
bunx playwright show-trace trace.zip
```

---

## Common Patterns

### Mocking in Vitest

```typescript
import { vi } from 'vitest'

// Mock module
vi.mock('@/book/repository', () => ({
  BookRepository: vi.fn(() => ({
    findAllChapters: vi.fn().mockReturnValue([...])
  }))
}))

// Mock function
const mockFn = vi.fn()
mockFn.mockReturnValue('value')
mockFn.mockResolvedValue('async value')
```

### Testing Async Operations

```typescript
// Wait for element to appear
await screen.findByText('Loaded');

// Wait for condition
await waitFor(() => {
	expect(screen.getByText('Done')).toBeInTheDocument();
});

// Wait for element to disappear
await waitForElementToBeRemoved(() => screen.queryByText('Loading'));
```

### Testing with Providers

```typescript
const renderWithProviders = (ui: React.ReactElement) => {
	return render(
		<ThemeProvider>
			<RouterProvider>{ui}</RouterProvider>
		</ThemeProvider>,
	);
};
```

---

## References

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Playwright](https://playwright.dev/)
- [Next.js Testing](https://nextjs.org/docs/testing)
- [Kent C. Dodds - Testing JavaScript](https://testingjavascript.com/)
