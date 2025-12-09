## Copilot Instructions for Portfolio Website

## Architecture Overview

This is a **Next.js 14 App Router** freelance portfolio site with blog functionality, using:
- **Sanity CMS** for blog content (headless CMS)
- **MongoDB** via `connect2mongodb` for contact forms, view counts, and analytics
- **Server Actions** pattern for all data mutations (`'use server'`)
- **Client Components** (`'use client'`) only for interactivity (stats animations, filters, forms)
- **Security-first approach** with extensive input validation and sanitization
- **Dynamic gradient backgrounds** across all sections for modern freelance aesthetic

## Page Structure (Freelance Focus)

Homepage section order optimized for freelance conversion:
1. **NavBar** - Navigation with project/contact CTAs
2. **IntroSection** - Hero with animated gradient background
3. **StatsSection** - Animated counters (Years, Team, Projects, Clients) with gradient cards
4. **TestimonialsLayout** - Client reviews (shows 3 by default)
5. **MyProjects** - Filterable portfolio (Client/Personal projects)
6. **SkillsSection** - Tech stack showcase
7. **ContactUsLayout** - CTA section
8. **FooterLayout** - Simple gradient footer with view tracking

## Critical Patterns

### Server vs Client Components
- **Default to Server Components** - only add `'use client'` when needed for hooks/events
- Server Actions in `/src/actions/*` and co-located with pages (e.g., `ContactAction.ts`)
- All database operations must use `'use server'` directive at file top

### Data Fetching Architecture
```typescript
// Sanity CMS queries (blog content)
const query = `*[_type == 'blog' && slug.current == $slug][0]`;
await client.fetch(query, { slug: sanitizedSlug });

// MongoDB operations (contacts, views)
await connect2MongoDB();
await ContactModel.findOneAndUpdate({...});
```

### Security Standards (REQUIRED)
Every input-accepting function **must**:
1. **Sanitize inputs** - see `sanitizeSlug()` in `src/app/article/[slug]/page.tsx`
2. **Validate data types** - see `validateAndSanitizeInput()` in `src/app/contact/ContactAction.ts`
3. **Use parameterized queries** - never string concatenation in Sanity/MongoDB queries
4. **Limit input lengths** - prevent DoS (e.g., slug max 200 chars, names max 100)

Example validation pattern:
```typescript
function sanitize(input: string): string {
    return input.trim()
        .replace(/[<>]/g, '') // XSS prevention
        .slice(0, 1000);
}
```

### Middleware Rate Limiting
- In-memory rate limiting in `src/middleware.ts`
- Different limits per route: `/contact` (5/hour), `/api` (100/min), default (200/min)
- Uses `Map<string, { count, resetTime }>` pattern

## Environment Variables

Required in `.env.local`:
```
SANITY_STUDIO_PROJECT_ID=794uha91
SANITY_STUDIO_DATASET=production
GOOGLE_ANALYTICS_MEASUREMENT_ID=...
NEXT_PUBLIC_DOMAIN_NAME_1=https://priyalraj.com
MONGODB_URI=...
```

## Styling & UI

- **Tailwind CSS** with custom config at root
- Custom breakpoints: `teeny:500px`, `laptop:1400px` 
- Custom colors: `lightblack` (#111111), `reddish` (#ff3258)
- Use `cn()` utility from `src/lib/utils.ts` for conditional classes
- Font: Montserrat (all weights 100-900) via `src/utils/Fonts.tsx`
- Reusable `<Headings>` component in `src/components/Headings.tsx`

### Dynamic Backgrounds Pattern
All major sections use animated gradient backgrounds:
```tsx
// Pattern: Gradient base + animated blur orbs + optional grid overlay
<div className="relative bg-gradient-to-br from-black via-gray-900 to-lightblack overflow-hidden">
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-0 left-0 w-96 h-96 bg-reddish rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse" 
         style={{ animationDelay: '1s' }}></div>
  </div>
  <div className="relative">{/* Content here */}</div>
</div>
```

### Stats Section (StatsSection.tsx)
- Client component with IntersectionObserver for scroll-triggered animations
- Counter animation pattern: 2-second incremental updates
- Gradient cards with hover effects
- Stats: Years Experience, Team Members, Projects, Happy Clients

## Blog System

### Structure
- **List page**: `src/app/blog/page.tsx` → fetches via `GetHomepagePost(start, limit)`
- **Article page**: `src/app/article/[slug]/page.tsx` → fetches from Sanity by slug
- **Custom rendering**: `<PortableText>` with custom `CustomCode` serializer for code blocks
- **View tracking**: `IncrementArticleViewsAction` stores counts in MongoDB

### Sanity Integration
```typescript
// Images
import { urlFor } from '@/lib/sanity';
const imageUrl = urlFor(data.coverImage).url();

// Content rendering
import { PortableText } from 'next-sanity';
<PortableText value={content} components={{ types: { code: CustomCode }}} />
```

## Key Files Reference

- `src/lib/sanity.ts` - Sanity client config, `urlFor()` helper
- `src/lib/interface.ts` - TypeScript interfaces for blog data
- `src/models/*` - Mongoose schemas (Contact, Views, BlogPostViews)
- `src/middleware.ts` - Security headers & rate limiting
- `src/utils/ENUMS.ts` - Shared enum constants (inquiry status options)
- `next.config.mjs` - Security headers, image domains, CORS policies

## Development Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint check
npm run mainVercel   # Force production deploy to Vercel
```

## Common Tasks

### Adding a New Server Action
1. Create in `/src/actions/*` or co-locate with page
2. Start with `'use server'`
3. Add input validation/sanitization
4. Connect to DB via `connect2MongoDB()`
5. Return `{ data, status }` object pattern

### Adding a New Page
1. Create route in `src/app/*`
2. Default to Server Component
3. Add metadata via `generateMetadata()` 
4. Use layout pattern from homepage (`src/app/page.tsx`)

### Working with Forms
- Client component for form (`'use client'`)
- Server action for submission (separate file)
- Use `sonner` toast for feedback
- IP tracking via `FetchUserIP()` for analytics
