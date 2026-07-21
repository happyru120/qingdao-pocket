# Implementation Plan

## Current repository state

The repository currently contains requirements and handoff documentation. Treat the previous Vite prototype as a content and interaction reference only. The production target is the stack defined in `AGENTS.md` and the existing README: Next.js 16, React 19, TypeScript, Tailwind CSS, and customized shadcn/ui primitives.

Do not attempt to build every idea at once.

## Phase 0 — Foundation

1. Scaffold a Next.js 16 App Router project in the repository root.
2. Enable strict TypeScript.
3. Configure Tailwind CSS 4 and design tokens.
4. Add lucide-react.
5. Configure static export and base-path handling suitable for a GitHub repository deployment.
6. Add lint, typecheck, and build scripts.
7. Create a mobile shell and five-item bottom navigation.
8. Add a small test setup for pure utilities.

Deliverable: a clean production build with placeholder routes and no template-looking marketing page.

## Phase 1 — Data foundation and places

1. Implement the source, verification, place, menu, order-plan, phrase, and shopping types.
2. Add validation for required exact-name and verification fields.
3. Seed 8–10 places with only data already verified or clearly labeled `recheck`.
4. Build Places search and filters.
5. Build Place detail with Gaode actions.
6. Add local save state.
7. Test business-hours and filter utilities.

Recommended seed entities:

- 美达尔烧烤海鲜家常菜（中山路店）
- 王姐烧烤, exact branch to verify
- 双合园, exact branch to verify
- 炉鱼（万象城店）
- 万和春排骨米饭, exact branch to verify
- 海底捞, exact branch to verify
- 台东夜市
- 如期而至中古相机店

Do not block the UI on unverified research. Display `재확인 필요`.

## Phase 2 — Chinese phrasebook

1. Implement Korean keyword search and category filters.
2. Add Chinese, pinyin, optional Korean pronunciation aid, and aliases.
3. Implement copy, Web Speech API playback, favorite, recent use, and full-screen staff view.
4. Add restaurant-specific phrase links from Place detail.
5. Handle browsers without a Chinese voice gracefully.

## Phase 3 — Shopping and itinerary

1. Build product-centered souvenir cards and checklist persistence.
2. Implement day-based itinerary add/remove/reorder.
3. Show estimated stay, travel, walking load, and business-hours conflicts.
4. Add the `low walking` mode.
5. Keep optimization deterministic and understandable.

## Phase 4 — Event and district guides

1. Build the 2026 Beer Festival event page from structured data.
2. Keep official, field-report, and recheck items visibly separate.
3. Build the Taitung Night Market district page.
4. Use text cards and verified images only.

## Phase 5 — Content expansion

Research and add the remaining restaurants, cafes, attractions, and products from `docs/DATA_AND_RESEARCH.md`.

For each addition:

- Verify exact entity and branch.
- Add source references.
- Add last-verified date.
- Add portion guidance only when supported.
- Add a Gaode action.
- Check mobile layout.

## Deferred work

Do not implement until the MVP is proven useful:

- Backend and accounts
- AI itinerary generation
- Live Meituan or queue integrations
- Custom interactive map
- Q Score
- Public reviews
- Gamification
- Multi-city system

## First Codex task

Use this task after the repository is connected to Codex:

> Read `AGENTS.md` and every document in `docs/`. Scaffold Phase 0 only. Build a mobile-first Next.js 16 App Router foundation with Tailwind CSS 4, strict TypeScript, customized design tokens, lucide-react icons, five-route bottom navigation, static-export-compatible configuration, and placeholder screens for Home, Places, Itinerary, Chinese, and Saved. Do not add fake travel data, gradients, emoji UI, generic hero marketing copy, or unnecessary card grids. Add lint/typecheck/build scripts, run them, and report the exact results.

## Parallel-agent split after Phase 0

When using multiple Codex tasks, keep file ownership clear:

- Agent A: domain types, seed validation, business-hours utilities, tests
- Agent B: Places list and filter UI
- Agent C: Place detail and Gaode actions
- Agent D: Chinese phrasebook
- Agent E: design-system review and accessibility audit

Integrate only after each task passes the repository checks.
