# Design Guidelines: Minimalist Developer Portfolio

## Design Approach
**Selected Approach:** Minimalist with Strategic Accent
- Clean, uncluttered layouts prioritizing readability and content
- Strategic use of orange accent (#F7931A) for CTAs and interactive elements
- Professional aesthetic suitable for developer portfolio
- Inspired by: Linear (typography clarity), GitHub (developer-focused simplicity), Stripe (color restraint)

## Core Design Elements

### Color Palette
**Light Mode:**
- Background: 0 0% 100% (pure white)
- Foreground: 0 0% 0% (pure black)
- Accent: 25 96% 54% (#F7931A orange)
- Muted backgrounds: 0 0% 96%
- Border: 0 0% 90%

**Dark Mode:**
- Background: 0 0% 3.9%
- Foreground: 0 0% 98%
- Accent: 25 96% 54% (same orange)
- Muted backgrounds: 0 0% 14.9%
- Border: 0 0% 27.9%

### Typography
- **Headings:** Inter or Geist (600-700 weight), tight leading
- **Body:** Inter or Geist (400 weight), comfortable line-height (1.7)
- **Code/Tech labels:** Monospace font (JetBrains Mono or Fira Code)
- **Scale:** Hero (3xl-5xl), Section headings (2xl-3xl), Body (base-lg)

### Layout System
**Spacing Primitives:** Use units of 4, 8, 12, 16, 24
- Section padding: py-24 (desktop), py-16 (mobile)
- Component spacing: gap-8, gap-12
- Container: max-w-6xl mx-auto px-6

## Component Specifications

### Hero Section
- Clean layout with profile photo (circular, 200-250px) positioned left or centered
- Name in large, bold typography (text-5xl)
- Title/tagline below (text-xl, muted color)
- Orange accent on CTA button ("View Projects" or "Contact Me")
- Minimal padding, breathing room around elements

### About Me Section
- Single column, max-w-3xl for optimal readability
- 2-3 paragraph limit for MVP
- Clean typography hierarchy
- Subtle background differentiation (muted bg)

### Projects Section
- Card-based grid layout (2 columns on desktop, 1 on mobile)
- Each card contains:
  - Project name (text-xl, font-semibold)
  - Tech stack as pills/badges with muted backgrounds and monospace font
  - GitHub link icon (external link with orange hover state)
- Consistent card padding (p-6), subtle borders
- Hover state: subtle shadow and border color change to orange

### Skills Section (Report Card Design)
- Table-like layout mimicking a report card
- Column structure: Skill Name | Grade
- Monospace font for grades with color coding:
  - A+/A: Orange accent color
  - A-/B+/B: Default foreground
  - B-/C+: Muted foreground
- Alternating row backgrounds for readability
- Section header styled as "Skills Report Card" with decorative underline

### Contact Section
- Centered layout with clear hierarchy
- Email, LinkedIn, GitHub links with icons
- Orange accent on hover states
- Simple form option or direct links approach
- Footer with copyright and minimal social links

## Images
- **Hero Image:** Placeholder circular profile photo (250px diameter), clean border
- No other images required for MVP; focus on typography and layout clarity

## Interaction Patterns
- Smooth scroll navigation between sections
- Hover states: subtle color shifts to orange accent
- Button interactions: scale on hover (transform: scale(1.02)), orange background
- Link underlines appear on hover in orange
- No complex animations—maintain minimalist feel

## Accessibility & Dark Mode
- Ensure WCAG AA contrast ratios in both modes
- Orange accent (#F7931A) maintains sufficient contrast on both backgrounds
- Form inputs styled consistently with dark mode support
- Focus states use orange accent with visible outlines

## Key Principles
1. **Content First:** Typography and hierarchy prioritize readability
2. **Strategic Color:** Orange only for CTAs, links, and key interactions
3. **Clean Spacing:** Generous whitespace, consistent rhythm
4. **Developer Aesthetic:** Monospace touches, GitHub-inspired simplicity
5. **Mobile Priority:** Responsive breakpoints ensure mobile excellence