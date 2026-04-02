# Overview

This is a minimalist developer portfolio website built as a single-page application. The portfolio showcases professional experience, projects, skills, and contact information for a Software Engineer. The design follows a clean, minimalist aesthetic with strategic use of an orange accent color (#F7931A) for CTAs and interactive elements. The portfolio is designed with senior-level signaling in mind, emphasizing problem-solving, trade-offs, and engineering principles over tools and skill levels.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**Routing**: Wouter for lightweight client-side routing. The application has a simple route structure with a home page and a 404 fallback.

**UI Component Library**: Shadcn/ui components built on Radix UI primitives. This provides accessible, unstyled components that are customized via Tailwind CSS. Components are located in `client/src/components/ui/` and include accordions, dialogs, cards, buttons, forms, and many others.

**Styling**: Tailwind CSS with a custom design system defined in `tailwind.config.ts`. The design uses CSS variables for theming, supporting both light and dark modes. Key design tokens include:
- Custom border radius values (9px, 6px, 3px)
- Color system with HSL values for backgrounds, foregrounds, borders, and semantic colors
- Special button and badge outline styles
- Elevation layers for hover/active states

**State Management**: TanStack Query (React Query) for server state management and data fetching. Configuration is in `client/src/lib/queryClient.ts` with custom query functions and error handling.

**Component Structure**: The portfolio is divided into distinct sections:
- Navigation (fixed header with theme toggle and resume download button)
- Hero (profile photo, name "Software Engineer" title, constraint-focused tagline, single primary CTA + quiet resume link)
- About (concise bio emphasizing 6+ years across fintech, e-commerce, enterprise + 3 engineering principles callout)
- Experience (domain-based experience: Fintech, E-commerce, Enterprise Internal Systems, Open-Source & Protocol Ecosystems)
- Projects (flagship projects with problem-first framing and key decisions, plus de-emphasized other work)
- Skills (categorized by usage context: Languages, Frontend Systems, Backend Systems, Infrastructure & Tooling - no self-grading levels)
- Contact (contact information, social links, enhanced footer)
- BackToTop (floating button for smooth scroll to top)

**Animations & Interactions**: 
- framer-motion for scroll animations (fade-in/slide-up effects)
- Micro-interactions on skill icons (scale on hover)
- ScrollReveal wrapper component for consistent animation timing
- Smooth scroll navigation throughout the site

## Backend Architecture

**Framework**: Express.js server with TypeScript, using ES modules.

**API Structure**: RESTful API pattern with routes prefixed with `/api`. Route registration happens in `server/routes.ts`.

**Development Setup**: Vite middleware integration for HMR (Hot Module Replacement) in development mode. The server serves the Vite dev server in development and static files in production.

**Data Storage**: Currently uses in-memory storage (`MemStorage` class in `server/storage.ts`) implementing a generic storage interface (`IStorage`). This is designed to be easily swapped with a database implementation. The storage interface includes methods for user CRUD operations.

**Build Process**: 
- Frontend: Vite builds React app to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Production runs the bundled Express server serving static frontend files

## Database Schema

**ORM**: Drizzle ORM configured for PostgreSQL with schema definitions in `shared/schema.ts`.

**Current Schema**: Defines a `users` table with:
- `id`: UUID primary key (auto-generated)
- `username`: Unique text field
- `password`: Text field for credentials

**Schema Validation**: Uses Zod schemas via `drizzle-zod` for runtime type validation. The `insertUserSchema` validates user creation inputs.

**Note**: While Drizzle is configured for PostgreSQL and a `DATABASE_URL` is expected, the current implementation uses in-memory storage. The database integration is prepared but not actively used in the current MVP.

## Design System

**Typography**: Inter and JetBrains Mono (monospace) fonts loaded from Google Fonts.

**Color Palette**: Dual-theme system (light/dark) with:
- Primary accent: Orange (#F7931A / HSL 25 96% 54%)
- Neutral backgrounds and foregrounds
- Semantic colors for destructive, muted, and accent states

**Layout System**: Container-based with max-width constraints (max-w-6xl) and consistent spacing using Tailwind's spacing scale (4, 8, 12, 16, 24).

**Component Patterns**: Cards with backdrop blur effects, hover elevation states, and consistent padding/spacing across sections.

# External Dependencies

## Third-Party UI Libraries

- **Radix UI**: Comprehensive set of unstyled, accessible component primitives (@radix-ui/react-*) for dialogs, dropdowns, tooltips, forms, and more
- **Shadcn/ui**: Component system built on top of Radix UI with Tailwind styling
- **Lucide React**: Icon library for UI elements
- **cmdk**: Command menu component for search/navigation features

## Database & ORM

- **Drizzle ORM**: Type-safe ORM for PostgreSQL with schema definitions and migrations
- **@neondatabase/serverless**: PostgreSQL driver for serverless environments
- **drizzle-kit**: CLI tool for database migrations and schema management

## State Management & Data Fetching

- **TanStack Query**: Server state management, caching, and data synchronization
- **React Hook Form**: Form state management with @hookform/resolvers for validation
- **Zod**: Schema validation library for runtime type checking

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating variant-based component APIs
- **clsx / tailwind-merge**: Utilities for conditional class names and Tailwind class merging

## Routing

- **Wouter**: Minimal client-side routing library (~1.2KB)

## Development Tools

- **Vite**: Build tool and development server
- **@vitejs/plugin-react**: React support for Vite
- **@replit/vite-plugin-***: Replit-specific development tools (runtime error overlay, cartographer, dev banner)
- **TypeScript**: Type safety across the stack
- **tsx**: TypeScript execution for the development server

## Utilities

- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation
- **embla-carousel-react**: Carousel/slider component
- **framer-motion**: Animation library for scroll animations and micro-interactions
- **react-icons**: Icon library including Simple Icons (si) for tech stack logos

# Recent Changes (January 2026)

## Senior Signaling Revamp

1. **Hero Section**: Changed title from "Full Stack Developer" to "Software Engineer". Updated tagline to focus on constraints: "Building reliable systems with a focus on correctness, maintainability, and real-world constraints". Reduced CTAs from 3 buttons to 1 primary button ("View Selected Work") + 1 subtle resume link.

2. **About Section**: Complete rewrite emphasizing 6+ years experience across fintech, high-traffic e-commerce, and enterprise environments. Opening highlights work serving "tens of thousands of employees" and "millions of daily users". Changed "censorship-resistant technologies — particularly Bitcoin" to "open, resilient systems" with focus on transparency, robustness, and long-term thinking. Added 3 engineering principles as a styled callout.

3. **Experience Section (NEW)**: Domain-based experience layout (not traditional job list):
   - Fintech Platforms: Analytics dashboards, onboarding flows, validation pipelines
   - High-Traffic E-commerce: Personalization, PDPs, search, checkout for millions of users
   - Enterprise Internal Systems: Internal tools and automation for tens of thousands of users
   - Open-Source & Protocol Ecosystems: Documentation, UI tooling, developer workflows

4. **Projects Section**: Complete reframe with problem-first approach. Split into flagship projects (Debunk The Fud + ICF Louisiana with orange border) and "Other Work" section. Changed "Highlights" to "Key Decisions" showing trade-off thinking.
   - Debunk The Fud: Updated to emphasize flip-card UI for addressing Bitcoin FUD (fear, uncertainty, doubt)
   - ICF Louisiana: Updated to highlight donation integration, Google Maps, and prayer information

5. **Skills Section**: Removed all self-grading levels (Expert/Advanced/Proficient). Restructured into categorized "How I Use These" format with 4 categories: Languages, Frontend Systems, Backend Systems, Infrastructure & Tooling. Each skill shows usage context.

6. **Currently Learning**: Removed entirely from footer.

## Previous Enhancements (November 2025)

1. **Resume Download Feature**: Added resume download in hero section and navigation. Resume PDF at `/attached_assets/resume.pdf`.

2. **Tech Stack Icons**: Integrated visual icons using react-icons/si and react-icons/fa.

3. **Scroll Animations**: framer-motion fade-in/slide-up animations with ScrollReveal wrapper.

4. **Enhanced Footer**: Quick navigation links, contact info, and copyright notice.

5. **Back-to-Top Button**: Floating button with smooth scroll and accessibility support.

6. **External Links in About**: Hyperlinked hobbies (lifting weights, reading books, playing chess, exploring complex ideas) with ExternalLink icons.

7. **SEO & Social Sharing**: Open Graph and Twitter Card meta tags.