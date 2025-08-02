# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses **pnpm** as the package manager (configured in package.json with packageManager field).

```bash
pnpm run dev          # Start development server with Turbopack
pnpm run build        # Build for production
pnpm run start        # Start production server  
pnpm run lint         # Run ESLint
pnpm run typegen      # Generate Sanity types (runs before dev/build)
```

The `typegen` command extracts Sanity schema and generates TypeScript types - it runs automatically before `dev` and `build` via predev/prebuild hooks.

## Architecture Overview

This is a **Next.js 13+ blog application** using the App Router with Sanity CMS integration:

### Key Technologies
- **Next.js 15.3.4** with App Router (`app/` directory)
- **Sanity CMS** for content management with live preview
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Vercel Analytics** for tracking

### Directory Structure

```
app/
├── (main)/              # Main site layout group
│   ├── layout.tsx       # Root layout with navigation/footer
│   ├── page.tsx         # Homepage
│   ├── posts/           # Blog posts
│   └── components/      # Shared components
├── api/draft/           # Draft mode API route
├── studio/              # Sanity Studio at /studio
└── globals.css          # Global styles

sanity-lib/              # Sanity configuration
├── lib/client.ts        # Sanity client setup
├── schemaTypes/         # Content schemas
└── env.ts               # Environment variables

utils/                   # Utility functions
├── sanity.client.ts     # Sanity queries and client helpers
└── github-graphql.ts    # GitHub API integration
```

### Content Management
- Blog posts are managed via **Sanity Studio** accessible at `/studio`
- **Draft mode** for previewing unpublished content via `/api/draft`
- **Portable Text** for rich content with custom components (images, code blocks)
- Content schema defined in `sanity-lib/schemaTypes/post.ts`

### Key Features
- **GitHub Activity integration** on homepage
- **Syntax highlighting** for code blocks via react-syntax-highlighter
- **Comments system** using Utterances
- **Dark mode** support via Tailwind CSS
- **Custom fonts**: Roboto (body) and Monoton (display)

### Environment Variables Required
```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET  
NEXT_PUBLIC_SANITY_API_VERSION
NEXT_PUBLIC_SANITY_SECRET_TOKEN
SANITY_API_READ_TOKEN
```

### Important Patterns
- Uses Next.js App Router with route groups `(main)/`
- Sanity queries use GROQ and are type-safe via generated types
- Image optimization configured for Sanity CDN and Gravatar
- Portable Text components in `portableTextComponents.tsx` handle rich content rendering