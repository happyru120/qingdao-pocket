# Project Context

## What this product is

Qingdao Pocket is a personal, mobile-first Qingdao travel notebook that should feel like advice from a well-prepared local friend. The first user is the repository owner, traveling for 3 nights and 4 days and usually viewing the site on a phone.

The product exists to answer practical questions quickly:

- Where can I go right now?
- Is this exact branch open today?
- What should two people order, and how much is too much?
- How long does it take from the hotel area?
- Can I open the place directly in Gaode Map?
- What Chinese sentence should I play or show to staff?
- Which souvenir should I buy, where is it likely sold, and does it need refrigeration?
- What is worth prioritizing at the 2026 Qingdao International Beer Festival?

## User context that affects the design

- Primary device: mobile browser.
- Base area: Hong Kong Middle Road / Fushansuo area. This must be a user-editable preset, not a permanent public constant.
- The user may need lower-walking routes because of a recovering calf/ankle injury. Support a `low walking` filter and show realistic walking burden.
- The user has previously over-ordered full portions at a Chinese Haidilao. Restaurant pages must prioritize portion guidance and staged ordering.
- The user values Korean-friendly recommendations but also wants a clear distinction between tourist-popular, celebrity-introduced, and genuinely local Qingdao food.
- The user wants all factual claims, especially business hours and current events, checked rather than copied from a single social post.

## Product tone

Use short, natural Korean notes. Prefer concrete guidance such as:

- `2명이면 세 메뉴까지만 먼저 주문`
- `튀김 두 개를 함께 시키면 느끼할 수 있음`
- `영업시간은 2026-07-20 기준 확인`
- `메이투안에서는 이 중국어 이름으로 검색`

Avoid startup slogans, exaggerated claims, fake precision, and generic AI prose.

## Core content groups

- Restaurants and food
- Cafes and desserts
- Attractions and night views
- Taitung Night Market
- 2026 Qingdao International Beer Festival
- Shopping and souvenirs
- Retro CCD camera shops
- Chinese survival phrases
- Itinerary and low-walking route planning
- Saved places and checklists

## Important entity-separation rule

Do not merge places just because Korean posts use similar names. Examples that require separate records and branch verification include:

- `美达尔烧烤海鲜家常菜` versus `船歌鱼水饺（美达尔店）`
- A chain brand versus one exact mall branch
- A restaurant name versus a dish name, such as `炉鱼` the brand and `鲈鱼` the fish

Every restaurant record should include the exact Chinese name, exact branch, Chinese address, coordinates or Gaode query, and verification state.

## Current product decision

The app should first become a dependable private travel tool. Public accounts, social sharing, gamification, recommendation scores, and broad multi-city expansion are explicitly later work. Do not let those ideas delay the useful core.
