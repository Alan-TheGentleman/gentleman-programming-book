# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multilingual programming book built with Next.js that generates both web and PDF versions. The book content is stored as MDX files and supports English and Spanish languages.

## Development Commands

```bash
# Development - uses bun as package manager
bun install
bun run dev          # Start development server on localhost:3000

# Building and Deployment
bun run build        # Build production version
bun run start        # Start production server

# Code Quality
bun run lint         # Run Next.js linter
bun run lint:fix     # Auto-fix linting issues across TypeScript files
bun run test         # Run tests with Vitest in watch mode

# PDF Generation
curl -X GET "http://localhost:3000/api/getPdf"  # Generate PDFs for both languages
```

## Architecture

### Module Structure
The codebase follows a modular architecture with path aliases:
- `@/book` → `src/modules/book` - Book content management
- `@/theme` → `src/modules/theme` - Styling system with Vanilla Extract
- `@/shared` → `src/modules/shared` - Shared components and utilities

### Book Content System
- **Content Location**: `src/data/book/{locale}/ChapterXX_Name.mdx`
- **Supported Locales**: `en` (English), `es` (Spanish)
- **Chapter Format**: Each MDX file requires frontmatter with `id`, `order`, `name`, and `titleList` with `tagId` mappings for sidebar navigation

### Chapter Metadata Schema
```typescript
{
  id: string,
  name: string, 
  order: number,
  titleList: Array<{
    tagId: string,    // Must match heading anchors for sidebar links
    name: string
  }>
}
```

### PDF Generation
The `/api/getPdf` endpoint uses Playwright to:
1. Render all book pages (including both language versions)
2. Convert to PDF with custom styling
3. Merge into final documents: `public/gentleman-programming-book.pdf` and `public/es/gentleman-programming-book-es.pdf`

## Important Implementation Details

### Adding New Chapters
1. Create MDX files in both `src/data/book/en/` and `src/data/book/es/`
2. Update the URL lists in `src/pages/api/getPdf.ts` to include the new chapter
3. Ensure `tagId` values in frontmatter match the actual heading anchor IDs generated from markdown headers

#### Chapter Generation Rules
When creating new chapters, follow these strict formatting and naming conventions:

**Frontmatter Structure:**
```yaml
---
id: 'chapter-url-slug'
order: 15  # Sequential chapter number
name: 'Chapter Display Name'
titleList:
  [
    { name: 'Section Name', tagId: 'section-anchor-id' },
    # More sections...
  ]
---
```

**TagId Generation Rules:**
- Convert section names to lowercase
- Replace spaces with hyphens
- Include connecting words like "de", "y", "and", etc. in Spanish/English
- For titles with dashes/hyphens, use triple dashes (---) in tagId
- Preserve accents in Spanish tagIds (e.g., `instalación-y-configuración`)
- Examples:
  - "Installation and Setup" → `installation-and-setup`
  - "Practical Project - TaskFlow" → `practical-project---taskflow`  
  - "Instalación y Configuración" → `instalación-y-configuración`
  - "Proyecto Práctico - TaskFlow" → `proyecto-práctico---taskflow`

**Content Structure Requirements:**
- Main chapter title as `# Chapter Name`
- Section headers as `## Section Name` (must match titleList names exactly)
- Subsections as `### Subsection` or lower
- Code blocks with language specification: ```bash, ```typescript, etc.
- Consistent formatting between English and Spanish versions

**Language-Specific Guidelines:**
- **Spanish**: Maintain all accent marks in both content and tagIds
- **English**: Use standard American English spelling and terminology
- **Both**: Ensure technical terms and code examples remain consistent
- **Both**: Keep the same structure and number of sections across languages

**File Naming:**
- Format: `ChapterXX_Descriptive-Name.mdx` where XX is zero-padded order number
- Example: `Chapter15_IA-Driven-Development.mdx`
- Use same descriptive name for both languages when possible

### Styling System
Uses Vanilla Extract CSS-in-JS with:
- Theme system supporting multiple color modes
- Component-level CSS colocation
- TypeScript integration for type-safe styling

### Testing
- Vitest with jsdom environment
- React Testing Library integration
- Path aliases configured for test imports

## Commit Guidelines

Use conventional commits format. Never mention Claude Code or AI collaboration in commit messages.