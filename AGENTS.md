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

- Entrypoints: `src/main.tsx` → `src/App.tsx` (`QueryClientProvider` + `BrowserRouter` + routes).
- Routes: Index, Flexbela, Query, Usabella, Stackia, Testina, Applia, `/crear-personaje` (CharacterCreator), `/manual`, NotFound.
- Fixed roles: each `src/pages/{role}.tsx` calls `getDefault*()` from `src/data/characterPresets.ts` and renders shared `src/components/CharacterSheet.tsx` via local `useState` (no persistence).
- Creator (`/crear-personaje`): `CharacterForm` + `CharacterPreview`; draft in `localStorage` key `character-creator`; saved characters in key `custom-characters` (`src/data/customCharacters.ts`).
- Domain model `Character` (+ `calculateModifier`, `calculateSkillTotal`) in `src/types/character.ts`. No DB/API; no migrations.
- `src/components/ui/*` are generated shadcn primitives (see `components.json`, slate base). Edit only when necessary — Lovable syncs this repo.
- Path alias `@/*` → `src/*` (vite, vitest, tsconfig).
- Icons come from `react-icons`, not lucide (removed). Alias imports to keep call sites, e.g. `import { FiTrash2 as Trash2 } from 'react-icons/fi'`. Prefer `react-icons/fi`; verify the export name exists (TS may not catch a wrong name; `pnpm build` does).
- `QueryClientProvider` exists from the Lovable scaffold but is effectively unused. Do not add `useQuery`/`useMutation` unless a spec introduces real network.
- Uploaded avatars are downscaled to 256px in `CharacterForm` to stay under the `localStorage` quota (~30KB).
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

## Optional SDD+TDD workflow

- Specs live in `specs/SPEC-NNN-slug.md` (folder created on first spec). Agents in `.claude/agents/`: spec-writer → test-writer → implementer → spec-reviewer.
- Skills in `.claude/skills/`: `spec-template`, `testing-react`, `tdd-cicle` (folder typo; skill id is `tdd-cycle`), `react-component-patterns`.
- Test-writer only writes `*.test.*`/`*.spec.*`/`__tests__`/`e2e`; implementer must not touch tests.
- One branch per spec: `spec/NNN-slug` (from updated `main`; commits per AC: `feat(SPEC-NNN): AC-01 <desc>`). Reviewer audited diff is `git diff main...HEAD`. Merge flow goes `spec/NNN-slug` → `develop` → `main` via PR.
- Spec status lifecycle: `draft` → `ready-for-tests` → `in-progress` → `done` (only spec-reviewer closes).