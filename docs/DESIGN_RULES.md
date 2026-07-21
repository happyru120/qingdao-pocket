# Design Rules

## Design intent

The app should look like a carefully edited personal city guide, not an AI-generated SaaS dashboard and not a tourism-board brochure.

The user will mainly view it on a phone while walking, ordering food, shopping, or showing Chinese text to staff. Legibility and fast actions matter more than decorative novelty.

## Mobile baseline

- Design first at 390 px width and verify 360–430 px.
- Body text: generally 16 px or larger.
- Secondary metadata: do not go below 13 px.
- Touch targets: at least 44 × 44 px.
- Primary action height: generally 48 px.
- Keep important actions reachable with one thumb.
- Use sticky bottom actions carefully; never cover content or browser controls.

## Iconography

- Use `lucide-react` consistently.
- Default icon sizes: 18 or 20 px.
- Keep stroke widths consistent.
- Do not use emoji as UI icons.
- Emoji may appear only when they are part of user-authored content or a rare editorial accent, not navigation or status UI.

## Color direction

Create tokens before composing pages.

Suggested direction:

- Background: warm ivory rather than pure cold white
- Surface: white or a slightly warmer neutral
- Primary text: near-black ink or deep navy
- Secondary text: muted slate
- Primary action: deep sea navy
- Accent: restrained amber inspired by beer labels
- Warning: muted coral, used only when action is required
- Success/open state: subdued teal or plain text, not fluorescent green

Do not use the common blue-purple AI gradient.

## Layout and surfaces

- Prefer editorial sections, dividers, image crops, and clear type hierarchy.
- Do not put every paragraph inside a card.
- Avoid card-inside-card nesting.
- Avoid a left colored border with text as the default callout pattern.
- Avoid making every chip a rounded pill.
- Avoid excessive `rounded-2xl` or `rounded-3xl`; use a restrained radius scale.
- Use shadows sparingly. Borders and spacing should do most of the structural work.
- Avoid glassmorphism and translucent blur panels.

## Status and badges

Do not default to `colored dot + rounded pill + status text` for every state.

Preferred examples:

- `오늘 11:00–22:30`
- `영업 중 · 22:30까지`
- `27분 뒤 주문 마감`
- `영업시간 재확인 필요`

Use a badge only when it improves scanning. A status may instead be plain text, an icon with text, a small corner label, or a line of metadata.

## Copywriting

Write like an experienced friend taking notes:

- Specific
- Short
- Honest about uncertainty
- Action-oriented

Good:

- `2명이면 가지튀김·꿔바로우·볶음밥까지만 먼저 주문`
- `이 지점 영업시간은 2026-07-20 기준 확인`
- `카라멜 씨솔트 맛은 지점별 재고 차이 있음`

Avoid:

- `완벽한 여행을 위한 스마트한 선택`
- `AI가 엄선한 최고의 맛집`
- `현지 감성을 경험해 보세요`

## Photos

- Use real user-provided or properly sourced place and product photos.
- Generated imagery may be used as decorative illustration only, never as factual evidence of a venue, booth, dish, storefront, or map.
- Maintain consistent crop ratios per component.
- Add alt text that identifies the place or item rather than using generic descriptions.

## Reference usage

It is fine to study Figma Community, well-made travel tools, and the referenced Qingdao guide site for hierarchy and interaction ideas. Do not copy a full visual system or screen. Extract the useful behavior, then adapt it to this product's content density and mobile use.

## Accessibility

- Maintain readable contrast.
- Support keyboard focus and visible focus styles.
- Do not communicate verification or open/closed state by color alone.
- Respect reduced motion.
- Avoid autoplay audio.
- Chinese audio must play only after a user action.
