# The Becoming

Marketing site for The Becoming, a South African coaching/wellness practice: a landing page (`/`), a Moments & Experiences gallery (`/moments`), and a consultation booking form that emails the practice. Vite + React 19 SPA deployed on Vercel. pnpm only.

## Skills

- **Explaining or asking questions**: load the `layman-it` skill first, and write every explanation and question to the user in its plain language.
- **Writing or changing code**: load `react-best-practices`, `code-engineering`, and `typescript-best-practices` before the first edit, and follow all three.

## Verify

`pnpm build` (runs `tsc -b`, then the Vite build) and `pnpm lint` are the only checks; there are no tests. Run both before calling a change done. The `only-export-components` warnings in `src/components/ui/` already existed and are expected.

## Two runtimes

- **Browser**: everything in `src/` except the server folders. Import with the `@/` alias, no file extensions.
- **Node**: `api/`, `src/server/`, `src/email/`, `src/config/`. These use relative imports ending in `.js` (`../config/index.js`), because `tsconfig.node.json` uses `nodenext`. Keep `@/` and browser-only APIs out of them.

## Booking flow

- There is one handler, `src/server/consultation-request.ts`. It runs in two places: as Vite dev middleware (`vite.config.ts`) and as a Vercel function (`api/consultation-request.ts`, a thin wrapper). Make changes in the handler.
- The form fields are checked twice: in the browser (`src/hooks/use-booking.ts`) and on the server (in the handler). Any change to a field or rule goes in both places, plus the `BookingDetails` type in `src/components/landing/content.ts` and the email template in `src/email/EmailTemplate.ts`.
- To send mail locally, run `docker compose up -d` (Mailpit: SMTP on 1025, inbox at <http://localhost:8025>), then copy `.env.example` to `.env`.
- The site has no database. Leave out features that need to store data (event reservations, "notify me" signups) and point people to the consultation booking form instead.

## Pages and routing

- Routing is a small hand-written router in `src/lib/router.ts`. To add a page: add it to `Page` and `pagePaths`, render it in `App.tsx`, and add a rewrite to `vercel.json`. Without the rewrite, the page returns a 404 on Vercel when someone opens or refreshes it directly.
- Use `Link` from `src/components/link.tsx` for links between pages, so the page switches without a full reload.

## Content and UI

- Site text lives in `content.ts` files (`src/components/landing/`, `src/components/moments/`); the components only render it. Edit the text there. Write in British/South African English ("organisation", "colour"). Phone numbers are 10-digit South African numbers.
- `src/components/ui/` holds generated shadcn components (base-ui, `base-sera` style). Add new ones with `pnpm dlx shadcn add <name>` instead of writing them by hand.
- React Compiler is on, so leave out manual `useMemo`/`useCallback`/`memo` in new code.
- Brand palette: warm neutrals (`#fbf6ef`, `#eadfd3`, `#a98961`, `#4a3e39`, `#2a2421`). Fonts: Playfair Display for headings (`font-heading`), Noto Sans for body text.

## Commits

Conventional prefixes: `feat:`, `fix:`, `refactor:`.
