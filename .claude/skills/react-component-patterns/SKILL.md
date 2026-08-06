---
name: react-component-patterns
description: Convenciones de arquitectura y patrones de componentes React del proyecto. Usar SIEMPRE que se cree o refactorice cualquier componente, hook o módulo de React, aunque el usuario no mencione "patrones" o "arquitectura" explícitamente.
---

# React Component Patterns

Convenciones para la fase de implementación y refactor. Análogo a Clean Architecture en móvil: separación de responsabilidades por capas.

Decisiones fijadas para este proyecto (ver `docs/IMPLEMENTATION_PLAN.md`): sin backend, sin `src/features/`, sin React Query real, `tsconfig` con `strict: false`.

## Estructura (sin features)

```
src/
├── pages/        # una página por ruta, cableadas en App.tsx
├── components/   # componentes de UI y feature, sin capa features/ (app pequeña)
├── data/         # datos estáticos (characterPresets.ts)
├── hooks/        # hooks compartidos (useLocalStorageState, etc.)
├── types/        # tipos de dominio (character.ts)
└── lib/          # utilidades puras
```

- No se introduce `src/features/` salvo que una spec meta un dominio grande y desacoplado; si eso pasa, se decide entonces, no por adelantado.
- Los Contratos de la sección 5 de una spec van en `src/types/` (o junto al componente si son locales), alineados con el tipo `Character` cuando aplique.

## Separación UI / lógica

- Componentes: renderizado y wiring de eventos. La lógica no trivial va a un custom hook.
- Regla práctica: si un componente supera ~150 líneas o tiene 3+ `useEffect`, extrae hooks o divide.
- Hooks propios testables de forma aislada solo si son lógica pura; si orquestan UI, se testean a través del componente.

## Estado

1. Estado local (`useState`) por defecto — la opción más simple que funcione.
2. Estado persistido de usuario (personajes) → `useLocalStorageState`, nunca `localStorage` a mano en el componente.
3. Sin backend: no hay estado de servidor real. `QueryClientProvider` existe en `App.tsx` por herencia del scaffold pero no se usa — no añadir `useQuery`/`useMutation` sin que una spec introduzca red de verdad.
4. Prohibido estado global "por comodidad" (Context/Zustand): cada elevación de estado se justifica explícitamente en la spec.

## Datos y efectos

- Sin capa `api/`: los datos son estáticos (`src/data/characterPresets.ts`) o vienen de `localStorage`. Componentes no acceden a `localStorage` directamente, pasan por el hook.
- `useEffect` es último recurso: la mayoría de "necesito un effect" son estado derivado (calcúlalo en render) o handlers de evento.

## Accesibilidad (no negociable)

- Elementos interactivos = elementos semánticos (`button`, `a`, `label`+`input`). Nunca `div onClick`.
- Todo input con label asociado. Errores de formulario con `role="alert"` o `aria-describedby`.
- Foco gestionado en modales/navegación. Navegable por teclado siempre.
- Esto no es opcional porque los tests (getByRole/getByLabelText) lo asumen: código inaccesible = tests imposibles de escribir bien.

## TypeScript

- `tsconfig` real tiene `strict: false` (heredado del scaffold Lovable) — no hay gate de compilador. Aun así, código nuevo evita `any` explícito, `@ts-ignore` y `as unknown as` por convención.
- Props tipadas con interface/type exportado si otro módulo las necesita.
- Tipos de dominio en `src/types/character.ts` (o junto al componente si son locales), alineados con los Contratos de la spec — si divergen, se actualiza la spec (Changelog), no se ignora.
