# Product Specification

## Navigation

Use five persistent mobile destinations:

1. Home
2. Places
3. Itinerary
4. Chinese
5. Saved

Shopping and the beer festival are promoted from Home and also discoverable through Places or Saved. Do not overload the bottom navigation.

## Home

The home screen should prioritize immediate actions rather than decorative summaries.

Required sections:

- User-editable trip day and hotel-area preset
- Today's itinerary
- Open now
- Food near the hotel area
- Low-walking suggestions
- Emergency Chinese
- Shopping checklist
- 2026 beer-festival shortcut

Do not show fabricated weather, live queues, or live delivery rankings.

## Places list

### Search

Search across Korean name, Chinese name, branch, dish, region, and tags.

### Filters

- Region
- Food/category
- Open now
- Price range
- Low walking
- Delivery candidate
- Local Qingdao food
- Korean-friendly
- Celebrity/broadcast introduction
- Verified recently

### Food categories

- Shandong and Qingdao cuisine
- Seafood
- Dumplings and dim sum
- Skewers and barbecue
- Hotpot and grilled fish
- Rice and noodles
- Cafe and dessert
- Night market food

### Place card

Show only the information needed to decide whether to open the detail page:

- Photo
- Exact Korean and Chinese branch name
- Today's hours or `hours need recheck`
- Category and region
- Price range
- Travel time from selected base area
- One concise reason it was saved
- Save action
- Gaode action

Avoid badge clutter.

## Place detail

The first viewport must include:

- Exact branch name
- Today's business state
- Today's hours
- Last verified date
- Price range
- Estimated stay
- Travel time from selected base area
- Gaode Map button
- Save button
- Add-to-itinerary button
- Chinese-help button

Then show, in this order:

1. Why it is on the list
2. Must-order menu
3. Two-person order plan
4. Three-to-four-person order plan when available
5. Portion and ordering warnings
6. Peak-time notes, clearly labeled as approximate
7. Evidence and sources
8. Useful Chinese phrases for this place
9. Nearby places

## Evidence display

Do not use an arbitrary `Q Score` in the MVP. Show transparent evidence instead:

- Official or business listing verified
- Recent Chinese-platform reviews found
- Korean traveler reviews found
- Broadcast/chef introduction verified
- Local specialty relevance
- Hours recently checked

Evidence may be expanded to show source and checked date.

## Chinese phrasebook

### Core behavior

- Korean keyword search
- Category filters
- Chinese sentence
- Pinyin
- Natural Korean pronunciation aid only when helpful
- Copy
- Web Speech API playback with `zh-CN`
- Full-screen staff display
- Recently used and favorites stored locally

### Categories

- Restaurant
- Portion and ordering
- Spice and ingredients
- Taxi and Didi
- Hotel
- Shopping
- Payment
- Directions
- Emergency
- Beer festival

Essential phrases include asking whether a dish is large, requesting half portions, ordering a small amount first, removing cilantro, packing leftovers, finding an entrance, and confirming refrigeration.

## Shopping and souvenirs

Organize by product, not by supermarket.

Each product should show:

- Photo
- Exact Chinese product name
- Product type and flavor
- Typical price range when verified
- Likely stores, labeled as likelihood rather than guaranteed stock
- Refrigeration requirement
- Carry-on or checked-baggage notes
- Suitability for bringing to Korea
- Recommended quantity
- Personal or sourced one-line review
- Purchased checkbox
- Chinese-name copy action

Initial product themes:

- Peach and mango fruit yogurt
- Qingdao bottled yogurt
- Caramel sea-salt dried bread snack
- Duck tongue
- Sweet-spicy duck neck

## Taitung Night Market

Treat this as a district guide rather than a normal place card.

Include:

- Recommended arrival time
- Estimated visit length
- Entrance or station reference
- Food list with approximate price and risk notes
- Shopping section
- Restroom and return-taxi notes when verified
- Short first-visit route

Do not rank novelty food solely because it photographs well.

## 2026 Qingdao International Beer Festival

Use a separate event page. Separate `officially confirmed`, `field report`, and `needs recheck` information.

The page should include:

- Event dates and venue
- Admission policy
- Accurate numbered tent list
- Recommended first-visit route
- Food
- Performances and drone/fireworks schedule with update timestamp
- Return transportation
- Weather and schedule-change warning

Known 2026 tent names that must not be reordered or relabeled without verification:

1. 青西金啤大篷
2. 金花奖精酿大篷
3. 青岛啤酒1903大篷
4. 德国沃斯坦啤酒大篷
5. 荷兰喜力啤酒大篷
6. 青岛啤酒大排档大篷
7. 丹麦嘉士伯啤酒大篷
8. 未来啤酒工厂大篷
9. 开整酒仓大篷

Do not use generated tent photos as factual venue photos.

## Itinerary

MVP requirements:

- Day-based list
- Add, remove, and reorder places
- Show estimated travel and stay time
- Warn when a place is likely closed at arrival
- Walking-load indicator
- `low walking` mode
- Keep one main district per half-day where practical

Full optimization is later. Start with understandable deterministic rules.

## Saved

Combine:

- Saved places
- Purchased souvenirs
- Favorite phrases

Keep the screen simple and locally persisted.

## Non-goals for the initial release

- User accounts
- Public reviews
- Social feed
- Live Meituan ranking
- Live queue times
- Custom turn-by-turn map
- Gamified completion percentage
- AI-generated recommendation scores
- Multi-city architecture
- Backend CMS
