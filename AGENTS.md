# AGENTS.md

## Project

Qingdao Pocket is a mobile-first personal travel companion for a Qingdao trip. It is not a generic tourism landing page. The product should help a traveler make a decision within a few seconds while standing in a restaurant, market, hotel lobby, taxi pickup area, or festival venue.

Read these documents before changing code:

1. `docs/PROJECT_CONTEXT.md`
2. `docs/PRODUCT_SPEC.md`
3. `docs/DESIGN_RULES.md`
4. `docs/DATA_AND_RESEARCH.md`
5. `docs/IMPLEMENTATION_PLAN.md`

## Target stack

- Next.js 16 App Router
- React 19
- TypeScript with strict mode
- Tailwind CSS 4
- shadcn/ui primitives only when useful; customize them so the app does not look like a default template
- lucide-react for interface icons
- Client-side persistence with localStorage for the first release
- Web Speech API for Chinese phrase playback
- Static-export-compatible architecture for simple GitHub-based deployment; avoid server-only dependencies in the MVP

## Product principles

- Mobile first: optimize for 360–430 px widths before desktop.
- Immediate action beats feature count.
- The first viewport of a place detail page must show the exact branch, today's hours, price range, travel time, and map action.
- Never invent business hours, prices, ratings, queue times, delivery availability, coordinates, event schedules, or celebrity endorsements.
- Similar restaurant names and branches must remain separate entities.
- Show a last-verified date and confidence state for changeable information.
- Personal hotel and trip-date settings must be configurable and stored locally, not hard-coded into public source code.
- AMap/Gaode deep links are the primary map action for China. Do not build a custom map in the MVP.
- Treat Meituan delivery and live queue information as external, changeable data. Provide exact Chinese search terms and outbound links rather than pretending the app has live access.

## Visual rules

- Do not use emoji as interface icons.
- Do not use purple/blue AI-SaaS gradients.
- Avoid left-border callout boxes, excessive pill badges, glassmorphism, card-inside-card nesting, oversized rounded corners, and generic three-column feature sections.
- Use restrained warm ivory, deep navy/ink, and amber accents.
- Prefer editorial hierarchy, real photos, plain text, and deliberate whitespace.
- Use Korean copy that sounds like a practical travel note, not generated marketing copy.

## Engineering rules

- Keep domain data separate from presentation components.
- Model verification and source metadata explicitly.
- Keep components small and accessible.
- Minimum touch target: 44 px; primary buttons should generally be 48 px high.
- Body text should normally be at least 16 px on mobile.
- Avoid unnecessary global state and premature backend work.
- Add tests for business-hours calculations, filters, and data validation once those utilities exist.
- Run lint, typecheck, tests, and production build before finishing a task.
- Do not claim a task is complete when placeholders, invented data, or broken routes remain.

## Definition of done for the initial MVP

- Home, places, place detail, itinerary, Chinese phrases, shopping, saved, and beer-festival pages work on mobile.
- Search and filters work without a server.
- Place saving and shopping checklist persist locally.
- Chinese phrases support search, copy, full-screen display, and speech playback.
- Every map action opens a valid Gaode search or POI link.
- Unverified data is visibly labeled rather than silently guessed.
- The production build passes.
