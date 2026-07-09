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

## Book Chapter Content Rules

When creating or reviewing MDX chapters in `src/data/book/{en,es}/`:

- Follow the user-level `book-chapter` skill as the source of truth for chapter conventions.
- A chapter should have book-level depth: mechanisms, numbers, examples, and consequences, not thin summaries.
- EN is the source of truth; ES is a faithful natural translation/adaptation with the same section structure, concepts, numbers, examples, pull-quotes, and image placement.
- Spanish chapter prose follows the current convention used by the newest chapters: Rioplatense voseo, no accent marks, no inverted punctuation, and no em dashes.
- `titleList[].tagId` must match the actual `rehype-slug` anchor for each `##` heading. Since current ES headings are accent-free, ES tagIds are accent-free too.
- Chapter registration is automatic: `src/app/api/pdf/route.ts` discovers chapter MDX files from `src/data/book/en` and `src/data/book/es`. Do not require manual PDF URL-list updates.
- Image assets for chapter diagrams live under `public/{topic-slug}/`; image paths in MDX must exist and captions must match the actual diagram content.

## CRITICAL RULES - NON-NEGOTIABLE

### React

- ALWAYS: `import { useState, useEffect } from "react"`
- NEVER: `import React`, `import * as React`, `import React as *`
- NEVER: `useMemo`, `useCallback` (React Compiler handles optimization)

### Types

- ALWAYS: `const X = { A: "a", B: "b" } as const; type T = typeof X[keyof typeof X]`
- NEVER: `type T = "a" | "b"`

### Interfaces

- ALWAYS: One level depth only; object property → dedicated interface (recursive)
- ALWAYS: Reuse via `extends`
- NEVER: Inline nested objects

```typescript
// ✅ CORRECT
interface UserAddress {
 street: string;
 city: string;
}
interface User {
 id: string;
 address: UserAddress;
}
interface Admin extends User {
 permissions: string[];
}

// ❌ WRONG
interface User {
 address: { street: string; city: string };
}
```

### Styling

- Single class: `className="bg-slate-800 text-white"`
- Merge multiple classes: `className={cn(BUTTON_STYLES.base, BUTTON_STYLES.active, isLoading && "opacity-50")}` (cn() handles Tailwind conflicts with twMerge)
- Conditional classes: `className={cn("base", condition && "variant")}`
- Recharts props: `fill={CHART_COLORS.text}` (use constants with var())
- Dynamic values: `style={{ width: "50%", opacity: 0.5 }}`
- CSS custom properties: `style={{ "--color": "var(--css-var)" }}` (for dynamic theming)
- NEVER: `var()` in className strings (use Tailwind semantic classes instead)
- NEVER: hex colors (use `text-white` not `text-[#fff]`)

### Scope Rule (ABSOLUTE)

- Used 2+ places → `components/shared/` or `lib/` or `types/` or `hooks/`
- Used 1 place → keep local in feature directory
- This determines ALL folder structure decisions

### Memoization

- NEVER: `useMemo`, `useCallback`
- React 19 Compiler handles automatic optimization

---

## DECISION TREES

### Component Placement

```
New feature UI? → shadcn/ui + Tailwind | Existing feature? → HeroUI
Used 1 feature? → features/{feature}/components | Used 2+? → components/shared
Needs state/hooks? → "use client" | Server component? → No directive
```

### Code Location

```
Server action → actions/{feature}/{feature}.ts
Data transform → actions/{feature}/{feature}.adapter.ts
Types (shared 2+) → types/{domain}.ts | Types (local 1) → {feature}/types.ts
Utils (shared 2+) → lib/ | Utils (local 1) → {feature}/utils/
Hooks (shared 2+) → hooks/ | Hooks (local 1) → {feature}/hooks.ts
shadcn components → components/shadcn/ | HeroUI → components/ui/
```

### Styling Decision

```
Tailwind class exists? → className | Dynamic value? → style prop
Conditional styles? → cn() | Static? → className only
Recharts? → CHART_COLORS constant + var() | Other? → Tailwind classes
```

---

## PATTERNS

### Server Component

```typescript
export default async function Page() {
  const data = await fetchData();
  return <ClientComponent data={data} />;
}
```

### Form + Validation

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
const form = useForm({ resolver: zodResolver(schema) });
```

### Server Action

```typescript
'use server';
export async function updateProvider(formData: FormData) {
 const validated = schema.parse(Object.fromEntries(formData));
 await updateDB(validated);
 revalidatePath('/path');
}
```

### Zod v4

- `z.email()` not `z.string().email()`
- `z.uuid()` not `z.string().uuid()`
- `z.url()` not `z.string().url()`
- `z.string().min(1)` not `z.string().nonempty()`
- `error` param not `message` param

### Zustand v5

```typescript
const useStore = create(
 persist(
  set => ({
   value: 0,
   increment: () => set(s => ({ value: s.value + 1 })),
  }),
  { name: 'key' },
 ),
);
```

### AI SDK v5

```typescript
import { useChat } from '@ai-sdk/react';
const { messages, sendMessage } = useChat({
 transport: new DefaultChatTransport({ api: '/api/chat' }),
});
const [input, setInput] = useState('');
const handleSubmit = e => {
 e.preventDefault();
 sendMessage({ text: input });
 setInput('');
};
```

### Testing (Playwright)

```typescript
export class FeaturePage extends BasePage {
 readonly submitBtn = this.page.getByRole('button', { name: 'Submit' });
 async goto() {
  await super.goto('/path');
 }
 async submit() {
  await this.submitBtn.click();
 }
}

test(
 'action works',
 { tag: ['@critical', '@feature', '@TEST-001'] },
 async ({ page }) => {
  const p = new FeaturePage(page);
  await p.goto();
  await p.submit();
  await expect(page).toHaveURL('/expected');
 },
);
```

Selector priority: `getByRole()` → `getByLabel()` → `getByText()` → other

---

## TECH STACK

Next.js 15.5.3 | React 19.1.1 | Tailwind 4.1.13 | shadcn/ui (new) | HeroUI 2.8.4 (legacy)
Zod 4.1.11 | React Hook Form 7.62.0 | Zustand 5.0.8 | NextAuth 5.0.0-beta.29 | Recharts 2.15.4

---

## PROJECT STRUCTURE

```
ui/
├── app/                  (Next.js App Router)
│   ├── (auth)/          (Auth pages)
│   └── (prowler)/       (Main app: compliance, findings, providers, scans, services, integrations)
├── components/
│   ├── shadcn/          (New shadcn/ui components)
│   ├── ui/              (HeroUI base)
│   └── {domain}/        (Domain components)
├── actions/             (Server actions)
├── types/               (Shared types)
├── hooks/               (Shared hooks)
├── lib/                 (Utilities)
├── store/               (Zustand state)
├── tests/               (Playwright E2E)
└── styles/              (Global CSS)
```

---

## COMMANDS

```
pnpm install && pnpm run dev        (Setup & start)
pnpm run typecheck                  (Type check)
pnpm run lint:fix                   (Fix linting)
pnpm run format:write               (Format)
pnpm run healthcheck                (typecheck + lint)
pnpm run test:e2e                   (E2E tests)
pnpm run test:e2e:ui                (E2E with UI)
pnpm run test:e2e:debug             (Debug E2E)
pnpm run build && pnpm start        (Build & start)
```

---

## QA CHECKLIST BEFORE COMMIT

- [ ] `npm run typecheck` passes
- [ ] `npm run lint:fix` passes
- [ ] `npm run format:write` passes
- [ ] Relevant E2E tests pass
- [ ] All UI states handled (loading, error, empty)
- [ ] No secrets in code (use `.env.local`)
- [ ] Error messages sanitized
- [ ] Server-side validation present

---

## MIGRATIONS (As of Jan 2025)

React 18 → 19.1.1 (async components, compiler)
Next.js 14 → 15.5.3
NextUI → HeroUI 2.8.4
Zod 3 → 4 (see patterns section)
AI SDK 4 → 5 (see patterns section)
