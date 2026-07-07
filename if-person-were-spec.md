# Project Spec and Agent Plan: "If They Were..." Next.js Wishes Page

## 1. Project Summary

Build a polished, animated Next.js web app where visitors answer a playful prompt about one hardcoded person:

> If {PERSON_NAME} were a {THING_OR_CONCEPT}, what would he/she/they be?

The app has two public routes:

1. `/` - Landing page with the prompt, answer form, optional paragraph, image upload, sender name, submit flow, and a refresh button that swaps the thing/concept.
2. `/wishes` - A visually rich animated collage of all submitted entries fetched from a future backend GET endpoint.

The person name must be hardcoded in the codebase. Visitors do not choose the recipient. They only answer the current prompt and identify themselves in the "from" field.

The backend is not implemented in this phase. The coding agent must create clean API placeholder functions and/or placeholder Next.js route handlers for GET and POST so the backend can be plugged in later without rewriting UI logic.

## 2. Recommended Tech Stack

Use:

- Next.js with App Router and TypeScript.
- React client components for interactive form, image preview, random concept refresh, and animated UI.
- Tailwind CSS for styling.
- Motion for React for page transitions, card animations, staggered reveals, button micro-interactions, and collage motion.
- `react-hook-form` plus `zod` for form state and validation, or native React form state if the agent wants to keep dependencies minimal.
- Optional: `clsx` or `tailwind-merge` for class management.

Do not build a real database or storage layer in this phase. Keep API integration behind a thin service layer such as `src/lib/wishesApi.ts`.

## 3. Product Requirements

### 3.1 Hardcoded Person Profile

Create a single source of truth for the target person.

Suggested file:

```ts
// src/config/person.ts
export const PERSON_PROFILE = {
  name: "REPLACE_WITH_PERSON_NAME",
  pronouns: {
    subject: "they",   // he, she, they
    object: "them",    // him, her, them
    possessive: "their" // his, her, their
  }
} as const;
```

The UI should use the hardcoded `PERSON_PROFILE.name` everywhere. Do not expose an input that changes the recipient name.

### 3.2 Landing Page `/`

The landing page must include:

1. The main question:
   - `If {PERSON_NAME} were a {concept.label}, what would {subjectPronoun} be?`
   - Example: `If Maya were a season, what would she be?`

2. A primary answer input:
   - Required.
   - Can be a text input or textarea.
   - Placeholder examples:
     - `A monsoon evening after the heat breaks...`
     - `A golden retriever with old-soul eyes...`
     - `The color of sunlight on a kitchen wall...`

3. Optional paragraph field:
   - Optional textarea.
   - Label: `Add a little note for {PERSON_NAME} (optional)`.
   - Intended for a longer explanation, wish, memory, or paragraph.

4. Image upload:
   - Accept image files only.
   - Provide drag-and-drop and normal file picker support if possible.
   - Show a local preview before submission.
   - Validate file type and size on the client.
   - Suggested max size: 5 MB for now.
   - Since storage is not implemented yet, submit the image using `FormData` to the placeholder POST function.
   - In mock mode, the image does not need to persist after reload.

5. Sender name field:
   - Required.
   - Label: `From`.
   - Placeholder: `Your name`.

6. Refresh concept button:
   - Button text: `Try another prompt`, `Shuffle prompt`, or `Refresh concept`.
   - On click, select another concept from the curated concept list.
   - It should not select the same concept twice in a row unless the list has only one item.
   - Animate the prompt change using Motion for React.

7. Submit button:
   - Button text: `Send wish`, `Add to collage`, or `Make it part of the collage`.
   - Show loading, success, and error states.
   - After success, reset answer fields but keep or re-randomize the concept. Recommended: re-randomize the concept and clear the form.
   - Provide a link to `/wishes` after successful submission.

### 3.3 Wishes Collage Page `/wishes`

Create a unique route at `/wishes` that:

1. Calls the placeholder GET endpoint or service function to fetch all entries.
2. Displays entries as a collage, not a plain list.
3. Supports entries with or without images.
4. Shows at least:
   - Concept label.
   - Generated prompt or a concise prompt fragment.
   - User answer.
   - Optional paragraph/note.
   - Uploaded image if available.
   - Sender name.
   - Created date if available from API.

Design direction:

- Use a masonry or irregular collage layout.
- Cards can look like layered paper notes, glass cards, postcards, or polaroids.
- Vary card scale, rotation, or vertical offsets subtly.
- Use animated entrance with staggered reveals.
- Add hover/tap interactions: slight lift, rotate-to-zero, glow, image zoom, or border shimmer.
- Include a top hero area: `A collage of what {PERSON_NAME} feels like to everyone`.
- Include a link back to `/`.
- Include empty state: `No wishes yet. Be the first to answer one.`
- Include loading skeleton state and error state.

## 4. Curated Concept List

Create a large curated list in code, not fetched remotely. Suggested file:

```ts
// src/data/concepts.ts
export type Concept = {
  id: string;
  label: string;
  article?: "a" | "an" | "the" | "";
  category: string;
  placeholder?: string;
  tone?: "tender" | "playful" | "poetic" | "cosmic" | "cozy" | "bold";
};
```

Use the `article` field to produce grammatically cleaner prompts:

```ts
function formatConcept(concept: Concept) {
  return [concept.article, concept.label].filter(Boolean).join(" ");
}
```

For example:

- `a color`
- `an animal`
- `the weather`
- `a secret doorway`

### 4.1 Required Seed Concepts

The list must include at minimum these categories requested by the product owner:

- Color
- Season
- Animal
- Bird

### 4.2 Full Suggested Concept List

The agent should include a large, creative list. Use at least 100 items. The following list is approved for implementation:

#### Nature and Weather

1. color
2. season
3. weather
4. cloud shape
5. type of rain
6. storm
7. breeze
8. sunrise
9. sunset
10. moon phase
11. constellation
12. planet
13. star
14. ocean
15. wave
16. tide
17. river
18. lake
19. waterfall
20. mountain
21. valley
22. forest
23. tree
24. flower
25. wildflower
26. garden
27. desert
28. island
29. beach
30. cave
31. meadow
32. snowflake
33. firefly
34. seashell
35. pebble
36. crystal
37. gemstone
38. volcano
39. rainbow
40. shadow
41. ray of light
42. echo
43. scent in the air
44. horizon
45. northern light

#### Animals, Birds, and Mythic Creatures

46. animal
47. bird
48. sea creature
49. forest creature
50. pet
51. dog breed
52. cat breed
53. horse
54. butterfly
55. bee
56. owl
57. swan
58. raven
59. hummingbird
60. peacock
61. phoenix
62. dragon
63. unicorn
64. guardian animal
65. zodiac animal
66. tiny creature
67. gentle giant
68. creature from a dream

#### Time, Memory, and Mood

69. month
70. day of the week
71. time of day
72. hour
73. memory
74. childhood object
75. keepsake
76. photograph
77. dream
78. wish
79. secret
80. promise
81. feeling
82. kind of silence
83. laugh
84. smile
85. hug
86. heartbeat
87. lucky charm
88. ritual
89. tradition
90. holiday
91. festival
92. celebration
93. goodbye
94. hello
95. beginning
96. ending

#### Art, Music, and Story

97. song
98. lyric
99. instrument
100. melody
101. rhythm
102. dance
103. painting
104. brushstroke
105. art style
106. poem
107. book genre
108. novel character
109. fairy tale
110. myth
111. legend
112. movie genre
113. scene in a movie
114. stage light
115. theater role
116. museum room
117. sculpture
118. color palette
119. font
120. handwritten note
121. postcard
122. bookmark
123. chapter title
124. plot twist
125. happy ending
126. opening line

#### Food, Drink, and Cozy Things

127. dessert
128. cake flavor
129. tea
130. coffee order
131. fruit
132. spice
133. herb
134. soup
135. breakfast
136. midnight snack
137. picnic food
138. comfort food
139. candy
140. ice cream flavor
141. candle scent
142. blanket
143. sweater
144. room in a house
145. window view
146. kitchen sound
147. favorite mug
148. bakery item
149. warm drink
150. feast
151. recipe
152. table setting

#### Places and Journeys

153. city
154. country
155. street
156. hidden alley
157. cafe
158. library
159. bookstore
160. train ride
161. airport goodbye
162. road trip
163. map
164. compass
165. doorway
166. bridge
167. lighthouse
168. harbor
169. castle room
170. rooftop
171. balcony
172. courtyard
173. secret garden
174. home
175. place to return to
176. destination
177. path
178. staircase
179. lantern-lit road
180. tiny shop

#### Magic, Cosmic, and Abstract

181. spell
182. potion
183. magical object
184. superpower
185. element
186. aura
187. universe
188. galaxy
189. portal
190. dream world
191. parallel universe
192. miracle
193. omen
194. prophecy
195. treasure
196. key
197. crown
198. shield
199. sword made of light
200. invisible thread
201. golden hour
202. soul color
203. love language
204. kind of magic
205. invisible gift
206. safe place
207. compass point
208. spark
209. flame
210. lighthouse beam

#### Modern, Playful, and Unexpected

211. app icon
212. playlist
213. group chat name
214. meme format
215. emoji
216. sticker
217. notification sound
218. keyboard shortcut
219. video game character class
220. board game
221. arcade game
222. website aesthetic
223. design system
224. room decor style
225. outfit
226. shoe type
227. accessory
228. fictional job
229. tiny business
230. headline
231. slogan
232. password hint
233. inside joke
234. nickname
235. supervillain weakness
236. side quest
237. achievement badge
238. collectible card
239. treasure map clue
240. loading screen tip

#### Personality and Symbolic Objects

241. candle
242. lantern
243. mirror
244. necklace
245. ring
246. notebook
247. pen
248. envelope
249. letter
250. keychain
251. doorbell sound
252. chair by a window
253. umbrella
254. pair of glasses
255. pair of shoes
256. scarf
257. suitcase
258. clock
259. hourglass
260. bell
261. teacup
262. vase
263. music box
264. snow globe
265. kite
266. balloon
267. ribbon
268. button
269. puzzle piece
270. tiny lamp

The agent can add more concepts, but should not reduce the list below 100 concepts.

## 5. UX and Visual Design Requirements

The app must feel polished, expressive, and intentionally animated.

### 5.1 Visual Theme

Recommended style:

- Dreamy gradient background with layered radial gradients.
- Soft glassmorphism panels.
- Subtle grain/noise texture overlay.
- Floating decorative shapes based on the current concept category.
- Large expressive typography for the question.
- Warm, celebratory, personal tone.

Potential design directions:

1. "Cosmic scrapbook" - stars, paper notes, gradients, floating cards.
2. "Garden of wishes" - soft greens, floral shapes, handwritten-feeling cards.
3. "Polaroid collage" - images and answers as pinned cards.
4. "Museum of little truths" - each answer framed like an exhibit.

Choose one cohesive direction and execute it consistently.

### 5.2 Animation Requirements

Use Motion for React for:

- Initial page hero reveal.
- Prompt shuffle transition using `AnimatePresence`.
- Form card entrance.
- Button hover/tap states.
- Image preview entrance.
- Submit success animation.
- `/wishes` collage staggered card reveal.
- Card hover lift/rotation correction.
- Optional floating background elements.

Respect reduced-motion preferences:

- Use `useReducedMotion()` or CSS media query `prefers-reduced-motion`.
- Reduce large motion, infinite floating, and rotation for users who prefer reduced motion.

### 5.3 Responsive Behavior

- Mobile first.
- Landing page should be one column on mobile.
- On tablet/desktop, use a two-column hero/form layout if it improves the design.
- Collage should adapt:
  - Mobile: single column or two compact columns.
  - Tablet: two to three columns.
  - Desktop: three to five columns/masonry.

## 6. Data Model

Define a frontend type even before backend exists.

```ts
export type WishEntry = {
  id: string;
  targetName: string;
  conceptId: string;
  conceptLabel: string;
  prompt: string;
  answer: string;
  note?: string;
  fromName: string;
  imageUrl?: string;
  imageAlt?: string;
  createdAt: string;
};
```

For POST, use a form payload:

```ts
export type CreateWishInput = {
  targetName: string;
  conceptId: string;
  conceptLabel: string;
  prompt: string;
  answer: string;
  note?: string;
  fromName: string;
  image?: File;
};
```

If using `FormData`, include fields:

- `targetName`
- `conceptId`
- `conceptLabel`
- `prompt`
- `answer`
- `note`
- `fromName`
- `image`

## 7. Placeholder API Contract

Backend work will happen later. The agent must still create a clean API boundary now.

### 7.1 Suggested Routes

Use these endpoints:

- `GET /api/wishes` - returns all wishes.
- `POST /api/wishes` - accepts one wish entry and optional image.

### 7.2 Placeholder Implementation Options

Preferred approach:

- Create `src/lib/wishesApi.ts` with `getWishes()` and `createWish()`.
- The UI calls only these functions.
- For now, these functions call `/api/wishes`.
- Implement `src/app/api/wishes/route.ts` as a mock placeholder that returns sample data for GET and a mocked success response for POST.
- Add clear TODO comments where real backend integration should replace the placeholder.

Example service layer:

```ts
// src/lib/wishesApi.ts
import type { CreateWishInput, WishEntry } from "@/types/wish";

export async function getWishes(): Promise<WishEntry[]> {
  // TODO: Replace this fetch with the real backend GET endpoint when available.
  const response = await fetch("/api/wishes", { method: "GET", cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch wishes");
  return response.json();
}

export async function createWish(input: CreateWishInput): Promise<WishEntry> {
  // TODO: Replace this placeholder POST with the real backend endpoint when available.
  const formData = new FormData();
  formData.append("targetName", input.targetName);
  formData.append("conceptId", input.conceptId);
  formData.append("conceptLabel", input.conceptLabel);
  formData.append("prompt", input.prompt);
  formData.append("answer", input.answer);
  formData.append("fromName", input.fromName);
  if (input.note) formData.append("note", input.note);
  if (input.image) formData.append("image", input.image);

  const response = await fetch("/api/wishes", {
    method: "POST",
    body: formData
  });

  if (!response.ok) throw new Error("Failed to create wish");
  return response.json();
}
```

Example placeholder route handler:

```ts
// src/app/api/wishes/route.ts
import { NextResponse } from "next/server";
import { PERSON_PROFILE } from "@/config/person";
import type { WishEntry } from "@/types/wish";

const mockWishes: WishEntry[] = [
  {
    id: "mock-1",
    targetName: PERSON_PROFILE.name,
    conceptId: "season",
    conceptLabel: "season",
    prompt: `If ${PERSON_PROFILE.name} were a season, what would ${PERSON_PROFILE.pronouns.subject} be?`,
    answer: "Spring after a long winter",
    note: "The kind that makes everything feel possible again.",
    fromName: "A friend",
    imageUrl: "",
    createdAt: new Date().toISOString()
  }
];

export async function GET() {
  // TODO: Replace with real database fetch.
  return NextResponse.json(mockWishes);
}

export async function POST(request: Request) {
  // TODO: Replace with real multipart parsing, validation, image storage, and database insert.
  const formData = await request.formData();

  const entry: WishEntry = {
    id: crypto.randomUUID(),
    targetName: String(formData.get("targetName") ?? PERSON_PROFILE.name),
    conceptId: String(formData.get("conceptId") ?? "unknown"),
    conceptLabel: String(formData.get("conceptLabel") ?? "thing"),
    prompt: String(formData.get("prompt") ?? ""),
    answer: String(formData.get("answer") ?? ""),
    note: String(formData.get("note") ?? "") || undefined,
    fromName: String(formData.get("fromName") ?? "Anonymous"),
    imageUrl: "",
    createdAt: new Date().toISOString()
  };

  return NextResponse.json(entry, { status: 201 });
}
```

Important limitation: this placeholder POST does not persist data. The UI should still be wired as if it does, so later backend integration only changes `wishesApi.ts` and `route.ts`.

## 8. Recommended File Structure

```txt
src/
  app/
    api/
      wishes/
        route.ts
    wishes/
      page.tsx
      loading.tsx
      error.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
    BackgroundOrnaments.tsx
    ConceptPrompt.tsx
    ImageUpload.tsx
    SubmitState.tsx
    WishForm.tsx
    WishCard.tsx
    WishesCollage.tsx
    ui/
      Button.tsx
      Card.tsx
      Textarea.tsx
      Input.tsx
  config/
    person.ts
  data/
    concepts.ts
  lib/
    concepts.ts
    wishesApi.ts
    cn.ts
  types/
    wish.ts
```

## 9. Core Component Behavior

### 9.1 `ConceptPrompt`

Responsibilities:

- Receive selected concept and person profile.
- Render animated question text.
- Use `AnimatePresence` keyed by `concept.id` so the prompt exits and enters when shuffled.
- Optionally render a small category pill.

### 9.2 `WishForm`

Responsibilities:

- Own form state.
- Own selected concept state or receive it from page state.
- Validate required answer and from name.
- Pass uploaded image file to `createWish()`.
- Show image preview.
- Show submit success/error.
- Call `onSubmitted(entry)` after successful POST.

Validation rules:

- `answer`: required, min length 2, max length 280 or 500.
- `note`: optional, max length 1200.
- `fromName`: required, min length 1, max length 80.
- `image`: optional, image MIME only, max 5 MB.

### 9.3 `ImageUpload`

Responsibilities:

- Accept drag/drop and click-to-upload.
- Show preview with remove button.
- Expose selected `File` to parent.
- Validate file type and size.
- Use accessible label and keyboard support.

### 9.4 `WishesCollage`

Responsibilities:

- Render fetched entries in a collage/masonry layout.
- Animate cards in with stagger.
- Use subtle deterministic visual variation per card based on index:
  - rotation: e.g. `[-3, 2, -1, 3, 1]`
  - card width/height classes
  - background accent classes
- Avoid excessive random layout shift on every render. Use deterministic variation from `index` or `entry.id`.

### 9.5 `WishCard`

Responsibilities:

- Render image when present.
- Render concept and answer prominently.
- Render note if present.
- Render `From {fromName}`.
- Animate on hover/tap.
- Use semantic text and accessible image alt.

## 10. State and Interaction Flow

### 10.1 Landing Page Flow

1. On initial load, select a random concept from `concepts.ts`.
2. Render prompt.
3. User may click refresh to select a different concept.
4. User enters answer, optional note, optional image, and from name.
5. User submits.
6. UI calls `createWish()`.
7. While posting, disable submit button and show loading text.
8. On success:
   - Show success message.
   - Clear fields.
   - Clear image preview.
   - Select a new concept.
   - Offer link to `/wishes`.
9. On error:
   - Keep user input.
   - Show clear error message.
   - Allow retry.

### 10.2 Wishes Page Flow

1. On route load, fetch entries via `getWishes()`.
2. Show skeleton while loading.
3. Show collage if entries exist.
4. Show empty state if no entries.
5. Show error state with retry guidance if fetch fails.

## 11. Accessibility Requirements

- All inputs must have labels.
- Error messages should be associated with inputs where practical.
- Buttons must have descriptive text.
- Image upload must work with keyboard and screen readers.
- Do not rely on color alone for validation or status.
- Ensure sufficient contrast.
- Respect reduced motion.
- The collage must remain readable, not only decorative.

## 12. Performance Requirements

- Keep animations transform/opacity based whenever possible.
- Optimize uploaded preview with object URLs and revoke object URLs on cleanup.
- Use Next.js image optimization for remote persisted image URLs later; for local object URLs, use normal `img` or handle carefully.
- Avoid large client bundles where possible.
- Keep the concept list static and tree-shakeable.
- Use `cache: "no-store"` for GET wishes if the data should always be fresh.

## 13. Content and Microcopy

Use warm, playful, polished copy.

Potential hero eyebrow:

- `A tiny personality ritual`
- `A collage for {PERSON_NAME}`
- `One person, infinite metaphors`

Potential landing title:

- `What does {PERSON_NAME} feel like?`
- `Turn {PERSON_NAME} into a little metaphor.`
- `If {PERSON_NAME} were anything in the universe...`

Potential helper text:

- `Answer the prompt that appears, add a note if you want, and sign it from you.`
- `Shuffle until the prompt feels right.`

Success message:

- `Added to the collage.`
- `Your little metaphor made it in.`
- `Saved for {PERSON_NAME}.`

Empty state on `/wishes`:

- `No wishes yet. Start the collage with the first answer.`

## 14. Implementation Plan for Coding Agent

### Phase 1: Scaffold and Baseline

1. Create a Next.js App Router project with TypeScript and Tailwind CSS.
2. Add Motion for React.
3. Create base layout, metadata, global styles, and theme tokens.
4. Add `PERSON_PROFILE` config.
5. Add concept data and utility functions.

### Phase 2: Landing Page

1. Build the landing page layout.
2. Add animated background and hero copy.
3. Build concept selection and refresh behavior.
4. Build `ConceptPrompt` with animated prompt transitions.
5. Build `WishForm` with answer, optional note, image upload, and from name.
6. Add validation and user feedback states.
7. Connect submit flow to `createWish()` placeholder.

### Phase 3: Placeholder API Boundary

1. Create `types/wish.ts`.
2. Create `lib/wishesApi.ts` with `getWishes()` and `createWish()`.
3. Create `app/api/wishes/route.ts` with placeholder GET and POST handlers.
4. Add comments marking future backend integration points.
5. Ensure all UI code calls the service layer rather than hardcoding endpoint details in components.

### Phase 4: Wishes Collage Page

1. Create `/wishes/page.tsx`.
2. Fetch wishes from `getWishes()`.
3. Add loading, empty, and error states.
4. Build `WishesCollage` and `WishCard`.
5. Implement animated masonry/collage layout.
6. Add route links between `/` and `/wishes`.

### Phase 5: Polish

1. Add page transitions or route-level reveal animations.
2. Add hover/tap micro-interactions.
3. Add responsive tuning for mobile, tablet, and desktop.
4. Add reduced-motion behavior.
5. Improve image upload preview and removal UX.
6. Add final visual details: texture overlay, decorative gradients, category pills, card accents.

### Phase 6: QA and Handoff

1. Test form validation.
2. Test prompt refresh does not repeat immediately.
3. Test submit success and error states.
4. Test `/wishes` loading, empty, populated, and error states.
5. Test image upload validation.
6. Test mobile responsiveness.
7. Test keyboard navigation.
8. Add a short README explaining how to replace placeholder API logic with real backend calls.

## 15. Acceptance Criteria

The implementation is complete when:

- The target person name is hardcoded in code.
- `/` displays the animated question using a concept from the curated list.
- `/` includes required answer input, optional note field, image upload, and required from name field.
- `/` includes a refresh/shuffle button that changes the concept.
- Submit calls a POST placeholder through a clean API abstraction.
- `/wishes` calls a GET placeholder through a clean API abstraction.
- `/wishes` displays entries as an animated collage.
- The app has polished visual styling and motion, not default unstyled components.
- Loading, success, error, and empty states exist.
- The UI is responsive and accessible.
- Backend TODO points are clearly marked for future integration.

## 16. Non-Goals for This Phase

Do not implement:

- Real database persistence.
- Real image storage.
- Authentication.
- Admin moderation.
- Recipient selection by visitors.
- Multiple hardcoded recipients.
- Payments or email notifications.

These may be future enhancements, but they are out of scope now.

## 17. Future Backend Notes

When backend work begins, replace the placeholder implementation with:

- Database table or collection for wishes.
- Image storage provider such as S3, Cloudinary, UploadThing, or similar.
- Server-side validation of multipart payloads.
- Rate limiting or basic spam prevention.
- Optional moderation field such as `status: "pending" | "approved" | "hidden"`.
- Optional pagination for `/wishes` if entries become numerous.

Potential future persisted schema:

```ts
type PersistedWish = {
  id: string;
  targetName: string;
  conceptId: string;
  conceptLabel: string;
  prompt: string;
  answer: string;
  note: string | null;
  fromName: string;
  imageUrl: string | null;
  imageAlt: string | null;
  status: "approved" | "pending" | "hidden";
  createdAt: string;
  updatedAt: string;
};
```

## 18. Suggested README Note for Backend Placeholder

Add this note to the project README:

> The app currently uses placeholder API handlers at `/api/wishes`. These handlers are intentionally mocked for frontend development. To connect a real backend, update `src/app/api/wishes/route.ts` or replace the calls in `src/lib/wishesApi.ts` with the production endpoint. The UI should not require structural changes.

## 19. Reference Documentation for Agent

- Next.js App Router documentation: https://nextjs.org/docs/app
- Next.js project structure and file conventions: https://nextjs.org/docs/app/getting-started/project-structure
- Next.js Route Handlers documentation: https://nextjs.org/docs/app/getting-started/route-handlers
- Motion for React documentation: https://motion.dev/docs/react
