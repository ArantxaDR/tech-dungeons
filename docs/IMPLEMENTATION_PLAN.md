# IMPLEMENTATION_PLAN.md

Decisiones técnicas de **frontella-s-dossier**. El proyecto ya existe (no es Fase 0 desde cero): este documento fija cómo encaja el flujo SDD+TDD sobre la arquitectura actual, generada originalmente por Lovable.

## Arquitectura

Estructura real (no por features — app pequeña, sin necesidad de esa capa):

```
src/
├── pages/        # una página por ruta (App.tsx). Frontella/Bitgrun/Pixaria/Stackia/Bugaria/Applia = personajes fijos; CharacterCreator = creador; Index, NotFound
├── components/    # componentes de feature (CharacterSheet, CharacterForm, AbilitiesSection, ...) + components/ui (shadcn, generado)
├── data/          # characterPresets.ts: ROLES, CLASSES, RACES, PRESETS del creador
├── hooks/         # useLocalStorageState + hooks generados (use-toast, use-mobile)
├── types/         # character.ts: tipo Character, calculateModifier, calculateSkillTotal, getDefaultFrontella() etc.
├── test/          # setup de vitest
├── lib/           # utils puras (cn, etc.)
├── App.tsx        # QueryClientProvider + BrowserRouter + rutas
└── main.tsx
```

- Nada de `src/features/`: la app no tiene dominios lo bastante grandes o desacoplados para justificarlo. Si una spec nueva crece mucho, se reevalúa entonces (no antes).
- Componentes = renderizado y wiring; lógica no trivial va a un hook (`useLocalStorageState` es el ejemplo existente).
- `character.ts` (personajes fijos) y `characterPresets.ts` (creador) duplican datos por diseño (ver CLAUDE.md). Cualquier spec que toque el modelo de un arquetipo debe actualizar ambos ficheros o documentar por qué no.

## Modelo de datos

No hay base de datos ni API: todo vive en el tipo `Character` (`src/types/character.ts`) y se persiste en `localStorage`.

- `Character`: abilities (FUE/DES/CON/INT/SAB/CAR), skills, conditions (INSPIRADA/DESMORALIZADA/AGOTADA/ENVENENADA), campos de texto libre (`classFeatures`, `racialTraits`, `proficiencies`, `equipment`, `notes`).
- Sin tablas, sin FKs, sin constraints server-side — cualquier validación de datos (rangos de stats, campos requeridos) vive en el cliente, en el propio componente/hook.
- Cambios al modelo de `Character` son cambios de tipo TypeScript, no migraciones.

## Capa de datos y estado

- **`localStorage`** vía `useLocalStorageState` (`src/hooks/useLocalStorageState.ts`) — cada página/creador usa su propia clave (`'frontella-character'`, etc.). No hay estado de servidor real.
- `QueryClientProvider`/`@tanstack/react-query` está cableado en `App.tsx` porque viene del scaffold de Lovable, pero **no se usa** para nada hoy (no hay red). No añadir `useQuery`/`useMutation` a menos que una spec introduzca de verdad una llamada de red; si eso no ocurre, se puede evaluar quitar la dependencia en vez de arrastrarla sin uso.
- Estado local (`useState`) por defecto para todo lo demás. Nada de Context/Zustand salvo que una spec concreta lo justifique explícitamente.

## Testing

- Vitest + Testing Library + jest-dom, ya configurados (`vitest.config.ts`, `environment: jsdom`, `setupFiles: src/test/setup.ts`).
- Se testea comportamiento (`getByRole`/`getByLabelText`), no implementación.
- No hay red que mockear: los tests de UI trabajan contra `localStorage` real (o un mock de `localStorage` si el test lo necesita aislado) y contra los datos de `characterPresets.ts`.
- Sin MSW, sin E2E por ahora — no hay superficie de red ni flujos multi-página lo bastante críticos para justificarlo. Se reevalúa si el alcance del proyecto crece.

## Lint y tipos

- **ESLint** (`eslint.config.js`), no `oxlint` — ya configurado con `typescript-eslint`, `react-hooks`, `react-refresh`. `npm run lint`.
- `tsconfig` actual tiene `strict: false`, `noImplicitAny: false`, `strictNullChecks: false` (heredado del scaffold Lovable). El flujo SDD+TDD no exige subir esto a `strict: true` de golpe: código nuevo debe evitar `any` explícito y `as unknown as` por convención, pero no hay gate de compilador que lo fuerce hoy. Si se decide endurecer `tsconfig`, es una spec/decisión aparte (afecta a todo el código existente).
- No hay script `typecheck` en `package.json`; usar `npx tsc --noEmit` si hace falta comprobar tipos fuera del build.

## Despliegue

Gestionado por Lovable (lovable.dev): los cambios en este repo se sincronizan con el proyecto Lovable y viceversa. Sin backend, sin variables de entorno de servidor. `npm run build` genera `dist/` si se necesita build local o preview fuera de Lovable.

## Riesgos

- Los datos de personaje viven solo en `localStorage` del navegador: borrar datos del sitio o cambiar de navegador/dispositivo pierde el personaje. No hay backup ni sincronización — se documenta como limitación conocida, no se resuelve sin backend.
- Duplicación `character.ts` / `characterPresets.ts`: una spec que cambie stats/lore de un arquetipo fijo y olvide el otro fichero introduce inconsistencias silenciosas (sin tipo/test que lo detecte hoy).
- Cambios en `components/ui/*` (generados por shadcn/Lovable) pueden desincronizarse con el proyecto Lovable si se editan a mano más allá de lo necesario (ver CLAUDE.md).

## Requisitos transversales

Mobile-first y responsive; accesibilidad no negociable (elementos semánticos, labels, foco gestionado, navegación por teclado) — reforzado por los skills `react-component-patterns` y `testing-react`. UI en español (idioma de la app), igual que el resto del código y specs.
