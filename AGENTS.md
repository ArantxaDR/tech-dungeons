# AGENTS.md

D&D-themed character sheet app (Spanish UI): tech roles as classes/races. React 18 + Vite + TS + Tailwind/shadcn. No backend; character data and settings live in `localStorage`.

## Commands

- Package manager is **pnpm** (`packageManager: pnpm@11.9.0`). A stray `bun.lockb` also exists from Lovable sync — ignore it, never use `bun`.
- `pnpm dev` — Vite dev server on port 8080 (`host ::`).
- `pnpm build` — production build. `pnpm build:dev` keeps the dev-only `lovable-tagger`.
- `pnpm lint` — `eslint .` (real gate).
- `pnpm test` — `vitest run`. `pnpm test:watch` for watch mode.
- Single file: `pnpm exec vitest run src/test/example.test.ts` (any path matching `src/**/*.{test,spec}.{ts,tsx}`).
- No `typecheck` script: `pnpm exec tsc --noEmit` (runs app `tsconfig.app.json`). `strict: false`/`noImplicitAny: false`/`strictNullChecks: false`, so tsc is informational; ESLint is the gate.
- `pnpm preview` for local preview of `dist/`.

## Architecture

- Entrypoints: `src/main.tsx` → `src/App.tsx` (data router: `createBrowserRouter` + `RouterProvider` — needed by `useBlocker`, the unsaved-changes guard).
- Routes: Index, Flexbela, Query, Usabella, Stackia, Testina, Applia, `/crear-personaje` (CharacterCreator), `/manual`, NotFound.
- Fixed roles: role pages are generated in `src/App.tsx` via `createRolePage(getDefault*, avatar)` (`src/pages/createRolePage.tsx`), calling `getDefault*()` from `src/data/characterPresets.ts` and rendering shared `src/components/CharacterSheet.tsx` via local `useState` (no persistence).
- Creator (`/crear-personaje`): `CharacterForm` + `CharacterPreview`; each character keeps its own draft (`character-creator` for a new one, `character-creator:<id>` when editing) — see `src/hooks/useCharacterDraft.ts` and `src/lib/characterDraft.ts`; saved characters in key `custom-characters` (`src/data/customCharacters.ts`).
- Creator validation: rules in `src/lib/characterValidation.ts` (pure), state in `src/hooks/useCharacterValidation.ts`, errors rendered by `src/components/FieldError.tsx`.
- Export: `src/lib/characterPdf.ts` draws the A4 sheet with **jspdf** (lazy-loaded, own chunk), `src/lib/characterExport.ts` builds the JSON backup, `src/hooks/useCharacterExport.ts` wires both to the UI.
- Domain model `Character` (+ `calculateModifier`, `calculateSkillTotal`) in `src/types/character.ts`. No DB/API; no migrations.
- `src/components/ui/*` are generated shadcn primitives (see `components.json`, slate base). Edit only when necessary — Lovable syncs this repo.
- Path alias `@/*` → `src/*` (vite, vitest, tsconfig).
- Icons come from `react-icons`, not lucide (removed). Alias imports to keep call sites, e.g. `import { FiTrash2 as Trash2 } from 'react-icons/fi'`. Prefer `react-icons/fi`; verify the export name exists (TS may not catch a wrong name; `pnpm build` does).
- No React Query: `@tanstack/react-query` was removed. Do not add `useQuery`/`useMutation` unless a spec introduces real network.
- Uploaded avatars are validated (type, max 10 MB) and cropped to a centred 256×256 JPEG to stay under the `localStorage` quota (~30KB). Rules live in `src/lib/avatarImage.ts`.
- Ask before introducing `src/features/`, Context/Zustand, or global state — none exist today (app stays flat: pages/components/hooks/types/data/lib).

## Conventions

- UI strings and specs are in Spanish; keep that.
- Mobile-first/responsive; accessibility non-negotiable (semantic elements, labels, focus, keyboard).
- Component code should avoid explicit `any`, `@ts-ignore`, `as unknown as` even though tsconfig doesn't enforce it. ESLint and react-hooks rules are enforced.
- Keep components under ~150 lines / 3 `useEffect`, then extract hooks.

## Testing

- Vitest + Testing Library + jest-dom, jsdom env, globals on, setup at `src/test/setup.ts`.
- No MSW, no E2E, no real network. Tests run against `localStorage` and static preset data.
- Use Testing Library selectors in priority order: `getByRole` → `getByLabelText` → `getByText` → `getByTestId`. Prefer `userEvent` over `fireEvent`.
