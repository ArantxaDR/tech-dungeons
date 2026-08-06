# Flujo SDD + TDD para Claude Code (React)

Sistema de 4 agentes + 4 skills interconectados por IDs de trazabilidad (`AC-<spec>-<num>`).

Ya instalado en este repo (`frontella-s-dossier`):

```
.claude/
├── agents/
│   ├── spec-writer.md
│   ├── test-writer.md
│   ├── implementer.md
│   └── spec-reviewer.md
└── skills/
    ├── spec-template/SKILL.md
    ├── testing-react/SKILL.md
    ├── tdd-cicle/SKILL.md              # nombre real de la carpeta (typo heredado), el skill se llama "tdd-cycle" por dentro
    └── react-component-patterns/SKILL.md
```

`specs/` todavía no existe en el repo — se crea con la primera spec (`specs/SPEC-001-<slug>.md`).

## El flujo

```
Usuario describe feature
        │
        ▼
┌───────────────┐  skill: spec-template
│  spec-writer  │  → specs/SPEC-NNN-slug.md (draft)
└───────┬───────┘
        │ usuario aprueba → ready-for-tests
        ▼
┌───────────────┐  skill: testing-react
│  test-writer  │  → crea rama spec/NNN-slug desde main
└───────┬───────┘  → tests en ROJO, uno por AC/EC
        │            solo puede escribir *.test.* / __tests__/
        │ spec → in-progress
        ▼
┌───────────────┐  skills: tdd-cycle + react-component-patterns
│  implementer  │  → código mínimo, rojo-verde-refactor
└───────┬───────┘  PROHIBIDO tocar tests
        │
        ▼
┌───────────────┐  sin skills (revisor independiente)
│ spec-reviewer │  → revisa git diff main...HEAD
└───────┬───────┘  → AC↔test↔código verificado
        │            único que marca la spec como done
        ▼
  Usuario mergea spec/NNN-slug → develop → main (PR)
```

## Qué hace que el sistema sea efectivo

1. **IDs trazables**: cada `AC-003-01` de la spec aparece en el nombre de un test y el reviewer lo verifica con Grep. Nada se pierde.
2. **Separación de poderes**: el test-writer no ve implementación; el implementer no puede tocar tests; el reviewer no edita nada. Cada agente tiene un conflicto de interés eliminado por permisos.
3. **Devoluciones explícitas**: cuando algo falla, el veredicto del reviewer indica a qué agente vuelve el trabajo (spec ambigua → spec-writer; test débil → test-writer; código incompleto → implementer).
4. **Skills precargadas por rol**: cada agente arranca con su "cómo" inyectado, sin depender de que se acuerde de consultarlo.
5. **Una rama por spec** (`spec/NNN-slug`): la rama se crea al empezar los tests, cada AC en verde es un commit, y el reviewer audita el `git diff main...HEAD` completo. El merge a main es la decisión final del usuario, tras el APROBADO.

## Uso típico

```
> Usa el agente spec-writer para especificar un formulario de login con validación de email
# ... revisas la spec, la apruebas ...
> Usa test-writer con SPEC-001
# ... tests en rojo ...
> Usa implementer con SPEC-001
# ... verde ...
> Usa spec-reviewer con SPEC-001
```

Con el tiempo, Claude delegará automáticamente a estos agentes por sus descriptions sin invocación explícita.

## Ya personalizado para este proyecto

Ver `docs/IMPLEMENTATION_PLAN.md` para el detalle: sin backend, todo en `localStorage`, sin `src/features/` (app pequeña), ESLint (no oxlint), `strict: false` en tsconfig, sin MSW/E2E por ahora.

Pendiente solo si el alcance del proyecto crece:
- Reevaluar estructura por features si una spec introduce un dominio grande y desacoplado.
- Añadir E2E (Playwright) si aparecen flujos multi-página críticos.
