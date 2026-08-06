# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

D&D-style character sheet app (Spanish UI) that reimagines tech roles (frontend, backend, QA, DevOps, etc.) as D&D classes/races. Built with Lovable (lovable.dev) — changes pushed here sync back to the Lovable project, so keep commits clean and avoid editing generated `components/ui/*` primitives beyond what's needed.

## Commands

```sh
npm run dev          # start dev server (vite, port 8080)
npm run build         # production build
npm run build:dev     # dev-mode build (keeps lovable-tagger)
npm run lint           # eslint .
npm test               # vitest run (single run)
npm run test:watch     # vitest watch mode
```

Run a single test file: `npx vitest run src/test/example.test.ts`

No `typecheck` script exists; use `npx tsc --noEmit` if needed. `tsconfig` has `strict: false` / `noImplicitAny: false` / `strictNullChecks: false` (inherited from the Lovable scaffold) — ESLint is the real gate, not the compiler. New code should still avoid explicit `any`, `@ts-ignore`, `as unknown as` by convention.

## SDD+TDD workflow

For new features, this repo has an optional spec-driven workflow: `spec-writer` → `test-writer` → `implementer` → `spec-reviewer` agents, backed by the `spec-template`, `testing-react`, `tdd-cicle`, `react-component-patterns` skills (`.claude/agents/`, `.claude/skills/`). See `docs/WORKFLOW-SDD-TDD.md` for the flow and `docs/IMPLEMENTATION_PLAN.md` for the project-specific decisions it assumes (no backend, no `src/features/`, no React Query in practice). Specs live in `specs/SPEC-NNN-slug.md` (folder created on first spec).

## Architecture

**Two ways characters are produced:**

1. **Fixed characters** — six pages (`Frontella`, `Bitgrun`, `Pixaria`, `Stackia`, `Bugaria`, `Applia`), one per route in `App.tsx`. Each page loads a hardcoded default character from `src/types/character.ts` (`getDefaultFrontella()`, etc.), persists it to `localStorage` via `useLocalStorageState` under a page-specific key (e.g. `'frontella-character'`), and renders it through the shared `CharacterSheet` component.
2. **Custom creator** — `/crear-personaje` (`CharacterCreator.tsx`) lets a user pick a role/race/class and build a character from `src/data/characterPresets.ts`, which defines `ROLES`, `CLASSES`, `RACES` and a `PRESETS` array mapping race+class combos to stat blocks. `findPreset`/`findPresetByClass` look up presets; `getEmptyCharacter()` is the blank-slate default.

**Data model** (`src/types/character.ts`): a `Character` has abilities (FUE/DES/CON/INT/SAB/CAR — Spanish D&D stat names), skills, conditions (INSPIRADA/DESMORALIZADA/AGOTADA/ENVENENADA — buffs/debuffs themed around dev-life situations), and freeform text fields (`classFeatures`, `racialTraits`, `proficiencies`, `equipment`, `notes`). `calculateModifier` and `calculateSkillTotal` are the only derived-stat logic.

Note: `character.ts` (fixed characters) and `characterPresets.ts` (creator) each define their own character data independently — there's some duplication between the two (e.g. Frontella's preset vs. `getDefaultFrontella()`). When editing one archetype's stats/lore, check whether the other file needs the matching update.

**Persistence**: all character state lives in `localStorage` only (`useLocalStorageState` hook) — there is no backend. Each page/creator uses a distinct storage key, so character data survives reloads per-browser.

**UI layer**: shadcn/ui components in `src/components/ui/` (generated — see `components.json`, style "default", Tailwind CSS variables, `slate` base). Path alias `@/*` → `src/*` (configured in `vite.config.ts`, `vitest.config.ts`, and `tsconfig`). Feature components (`CharacterSheet`, `CharacterForm`, `CharacterPreview`, `AbilitiesSection`, `SkillsSection`, `ConditionsSection`, etc.) live directly under `src/components/`.
