# The Becoming

Marketing site for The Becoming, a South African coaching/wellness practice: a landing page (`/`), a Moments & Experiences gallery (`/moments`), a testimonials page (`/testimonials`, with a preview on `/`), and a consultation booking form that emails the practice. Testimonials are saved in PostgreSQL. Vite + React 19 SPA deployed on Vercel. pnpm only.

## Skills

- **Explaining or asking questions**: load the `layman-it` skill first, and write every explanation and question to the user in its plain language.
- **Writing or changing code**: load `react-best-practices`, `code-engineering`, and `typescript-best-practices` before the first edit, and follow all three.

## Verify

`pnpm build` (runs `tsc -b`, then the Vite build) and `pnpm lint` are the only checks; there are no tests. Run both before calling a change done. The `only-export-components` warnings in `src/components/ui/` already existed and are expected.

## Two runtimes

- **Browser**: everything in `src/` except the server folders. Import with the `@/` alias, no file extensions.
- **Node**: `api/`, `src/server/`, `drizzle/schema/`, `src/email/`, `src/config/`. These use relative imports ending in `.js` (`../config/index.js`), because `tsconfig.node.json` uses `nodenext`. Keep `@/` and browser-only APIs out of them.
- **Both**: `src/validation/` holds the Zod schemas. The browser imports them with `@/validation/...` and the server with relative `.js` paths, so files there use relative imports ending in `.js` and nothing browser- or Node-specific.
- Outside data is checked with Zod where it enters: request bodies (schemas in `src/validation/`), server settings (`src/config/index.ts`), and API replies in the browser (`readApiResponse` / `readApiError` in `src/lib/api.ts`). Add new settings and new API calls through these.

## Booking flow

- There is one handler, `src/server/consultation-request.ts`. It runs in two places: as Vite dev middleware (`vite.config.ts`) and as a Vercel function (`api/consultation-request.ts`, a thin wrapper). Make changes in the handler.
- Validation is written once, as Zod schemas in `src/validation/`. The browser hooks and the server handlers both run the same schema. When a field or rule changes, edit the schema, the `BookingDetails` type in `src/components/landing/content.ts`, and the email template in `src/email/EmailTemplate.ts`.
- To send mail locally, run `docker compose up -d` (Mailpit: SMTP on 1025, inbox at <http://localhost:8025>), then copy `.env.example` to `.env`.

## Database

- PostgreSQL through Drizzle ORM. Tables live in `drizzle/schema/schema.ts`; get the connection with `getDb()` from `drizzle/schema/index.ts`. It connects on first use, so the dev server still starts without `DATABASE_URL`.
- Locally: `docker compose up -d`, then `pnpm db:migrate`. Production uses Neon: set `DATABASE_URL` in Vercel, and run `pnpm db:migrate` against it before deploying a schema change.
- To change a table: edit `schema.ts`, run `pnpm db:generate --name <what_changed>`, and commit the new migration file in `drizzle/`. Leave existing migration files as they are.
- Testimonials follow the booking pattern: one handler (`src/server/testimonials.ts`) behind both the Vite middleware and `api/testimonials.ts`. Its length limits live in `src/validation/testimonial.ts`, and the table reads them from there. The list is sorted featured first, then newest, and paged with a cursor (`?limit=&service=&cursor=`) rather than page numbers. `created_at` is stored to the millisecond so cursors match it exactly. Each list reply also carries `summary`, the counts for the filter buttons. Testimonials are published as soon as they are submitted, with no approval step. `featured` has no admin screen: switch it on in `pnpm db:studio`.
- Service names live in `src/validation/services.ts`. The service cards in `src/components/landing/content.ts` are typed against that list, and testimonials can only be tagged with a name from it.
- Event reservations and "notify me" signups are still not built. Ask before adding them; until then, point people to the consultation booking form.

## Pages and routing

- Routing is a small hand-written router in `src/lib/router.ts`. To add a page: add it to `Page` and `pagePaths`, render it in `App.tsx`, and add a rewrite to `vercel.json`. Without the rewrite, the page returns a 404 on Vercel when someone opens or refreshes it directly.
- Use `Link` from `src/components/link.tsx` for links between pages, so the page switches without a full reload.
- In dev, Vite serves a root-level `<name>.html` file at `/<name>` before the app gets the request. Keep design prototypes out of the project root, or they hide the real page of the same name.

## Content and UI

- Site text lives in `content.ts` files (`src/components/landing/`, `src/components/moments/`, `src/components/testimonials/`); the components only render it. Edit the text there. Write in British/South African English ("organisation", "colour"). Phone numbers are 10-digit South African numbers.
- `src/components/ui/` holds generated shadcn components (base-ui, `base-sera` style). Add new ones with `pnpm dlx shadcn add <name>` instead of writing them by hand.
- React Compiler is on, so leave out manual `useMemo`/`useCallback`/`memo` in new code.
- Brand palette: warm neutrals (`#fbf6ef`, `#eadfd3`, `#a98961`, `#4a3e39`, `#2a2421`). The testimonial cards use named Tailwind tokens for these (`text-ink`, `bg-cream`, `border-line`, `shadow-card`, `rounded-card` and others), defined in the `@theme` block in `src/index.css`. Fonts: Playfair Display for headings (`font-heading`), Noto Sans for body text.

## Commits

Conventional prefixes: `feat:`, `fix:`, `refactor:`.
