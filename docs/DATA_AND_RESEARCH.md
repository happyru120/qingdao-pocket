# Data and Research Policy

## Why this exists

Qingdao business listings, social posts, event schedules, prices, and delivery availability change quickly. The app must expose uncertainty instead of turning partial information into confident facts.

## Verification states

Use only these states in the MVP:

- `verified`: confirmed from a reliable recent source or multiple consistent sources
- `variable`: likely correct but may change by branch, date, inventory, or operating conditions
- `recheck`: missing, conflicting, stale, or not yet confirmed

Every changeable field should support `lastVerifiedAt` and, where helpful, a field-level confidence state.

## Source types

Suggested source priority:

1. Official event, government, venue, brand, or store source
2. Gaode/AMap business listing and exact POI data
3. Dianping and Meituan listing/reviews
4. Xiaohongshu posts, especially recent local posts
5. Korean travel reviews and broadcast clips
6. General web articles

One source is not automatically enough. For hours, branch names, celebrity introductions, current festival information, and permanent closure status, cross-check whenever possible.

## Data rules

- Store the exact Chinese name and branch.
- Keep Chinese address and coordinates separate from display labels.
- Never copy a Korean nickname into `nameZh`.
- Do not merge a dish, chain, mall branch, and neighborhood into one record.
- Store a source for every meaningful claim.
- Do not convert social praise into a numeric rating.
- Treat prices as ranges and include the date checked.
- Treat stock availability as probability, not a guarantee.
- Treat delivery availability as `candidate` unless checked at the actual hotel address and current time.
- Do not show live queue estimates without a real live source.

## Suggested core types

```ts
export type VerificationState = "verified" | "variable" | "recheck";

export type SourceType =
  | "official"
  | "gaode"
  | "dianping"
  | "meituan"
  | "xiaohongshu"
  | "broadcast"
  | "korean-review"
  | "local-review"
  | "other";

export interface SourceReference {
  id: string;
  type: SourceType;
  title: string;
  url?: string;
  checkedAt: string;
  supports: string[];
  confidence: "high" | "medium" | "low";
}

export interface VerifiedField<T> {
  value?: T;
  state: VerificationState;
  lastVerifiedAt?: string;
  sourceIds: string[];
  note?: string;
}
```

## Place fields

At minimum:

- `id`
- `slug`
- `nameKo`
- `nameZh`
- `branchKo`
- `branchZh`
- `type`
- `categories`
- `region`
- `addressZh`
- `coordinates`
- `gaodeQuery` or verified POI link
- `hours`
- `closedDays`
- `priceRange`
- `stayMinutes`
- `travelFromBase`
- `walkingLoad`
- `deliveryCandidate`
- `recommendedMenus`
- `orderPlans`
- `tips`
- `warnings`
- `evidence`
- `sourceIds`
- `lastVerifiedAt`

## Initial research backlog

Create separate records and verify exact branches for these themes:

### Restaurants and chains

- 美达尔烧烤海鲜家常菜, especially the Zhongshan Road branch
- 船歌鱼水饺（美达尔店） as a separate entity
- 一屋一壶·北京烤鸭
- 大红门烤肉
- 铭家点心（万象城店）
- 鲁味
- 双合园
- 炉鱼, with the exact MixC branch
- 鱼酷
- 海底捞
- 王姐烧烤
- 劈柴院内被韩国内容称为“유향거”的店: verify the exact Chinese name before publishing
- 万和春排骨米饭, including the exact AEON branch mentioned by travelers
- 杨家烧烤
- 大哈福海鲜烧烤
- 天和烧烤私房菜
- 山东大包
- 众品老方子锅贴甜沫
- 洪晟泰炉包店
- 福来顺

### Qingdao foods

- 辣炒蛤蜊
- 海鲜水饺, including 鲅鱼水饺 where appropriate
- 风味茄子
- 海肠捞饭
- 袋装鲜啤 or other local fresh-beer formats
- 烤鱼 fish and flavor choices, clearly separating brand names from fish species

### Cafes and shops

- 如期而至中古相机店
- Wind Bakery 稳得面包
- 然而咖啡
- sof cafe
- fufuland生乳舒芙蕾
- 海边的猫和咖啡馆
- 罗纳咖啡
- Dear House 叁盘两碗
- TIKI MORE

### Areas and attractions

- 台东夜市
- 中山路
- 栈桥
- 圣弥厄尔教堂
- 小鱼山
- 大学路
- 青岛啤酒博物馆
- 五四广场 and Olympic Sailing Center area
- 小麦岛
- 青岛丝路千古情景区

### Shopping products

- Peach-mango fruit yogurt: verify brand and exact Chinese product name from packaging
- Qingdao bottled yogurt: verify brand and storage life
- Caramel sea-salt dried bread snack: verify brand and flavor text
- 久久丫 or other brand duck tongue/duck neck shown in user-provided photos: verify exact package and chain

## 2026 beer-festival accuracy rule

The previous generated poster contained mismatched tent photos and labels. Never infer a factual tent photo from brand colors. Use verified official or on-site imagery only, or use text-only cards.

The tent numbering currently recorded in `docs/PRODUCT_SPEC.md` must remain unchanged unless a newer authoritative source proves otherwise.
