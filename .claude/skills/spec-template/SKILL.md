---
name: spec-template
description: Plantilla y proceso para escribir specs de features en flujo SDD+TDD. Usar SIEMPRE que el usuario pida crear una spec, especificar una feature, empezar una nueva funcionalidad, escribir criterios de aceptación, o antes de escribir cualquier test o código de una feature nueva. Si no existe spec para la feature en curso, este skill debe activarse primero.
---

# Spec Template (SDD + TDD)

Genera specs que sirven como **contrato trazable** entre requisitos, tests e implementación. Cada criterio de aceptación tiene un ID único que los tests referenciarán y que el spec-reviewer usará para validar.

## Reglas fundamentales

1. **Una spec por feature**, en `specs/SPEC-<número>-<slug>.md` (ej: `specs/SPEC-003-login-form.md`).
2. **Cada criterio de aceptación tiene ID único** con formato `AC-<spec>-<número>` (ej: `AC-003-01`). Los tests DEBEN referenciar estos IDs en su nombre o descripción.
3. **La spec NO contiene código** de implementación. Puede contener contratos (interfaces, tipos, shape de API) pero jamás lógica.
4. **La spec se cierra antes de escribir tests.** Si durante los tests o la implementación surge una ambigüedad, se vuelve a la spec, se actualiza, y se registra en el Changelog de la spec.
5. **Una rama de git por spec**, con nombre `spec/<NNN>-<slug>` (ej: `spec/003-login-form`). La spec en `draft` puede vivir en main; la rama se crea al pasar a `ready-for-tests` y TODO el trabajo de tests e implementación ocurre en ella. Se mergea solo cuando el spec-reviewer marca la spec como `done`.
6. **Ningún criterio sin caso límite considerado.** Si un criterio no tiene edge cases, hay que preguntarse explícitamente por qué y anotarlo.

## Proceso al crear una spec

1. Entrevistar al usuario si faltan datos: propósito, usuarios afectados, restricciones.
2. Redactar borrador con la plantilla de abajo.
3. Revisar el checklist de completitud (sección final).
4. Solo cuando el checklist pasa, la spec queda en estado `ready-for-tests`.

## Plantilla

```markdown
# SPEC-<NNN>: <Título de la feature>

**Estado:** draft | ready-for-tests | in-progress | done
**Rama:** spec/<NNN>-<slug>
**Fecha:** YYYY-MM-DD
**Relacionadas:** SPEC-XXX (si depende de otras)

## 1. Contexto y objetivo
<Por qué existe esta feature. Qué problema resuelve. 2-4 frases.>

## 2. Alcance
### Incluye
- <Qué SÍ cubre esta spec>
### Excluye
- <Qué queda explícitamente fuera (evita scope creep)>

## 3. Criterios de aceptación
Formato Given/When/Then. Cada uno con ID único.

### AC-<NNN>-01: <Nombre corto>
- **Given:** <estado inicial>
- **When:** <acción del usuario/sistema>
- **Then:** <resultado observable>

### AC-<NNN>-02: ...

## 4. Casos límite y errores
| ID | Escenario | Comportamiento esperado |
|----|-----------|------------------------|
| EC-<NNN>-01 | <input vacío, red caída, etc.> | <qué debe pasar> |

## 5. Contratos
<Interfaces, tipos, shape de request/response de API. Sin lógica.>

## 6. Requisitos no funcionales
- Accesibilidad: <navegable por teclado, roles ARIA, etc.>
- Performance: <si aplica: tiempos, tamaños>
- i18n: <si aplica>

## 7. Fuera de decisión / preguntas abiertas
- [ ] <Dudas pendientes. La spec no pasa a ready-for-tests con ítems abiertos.>

## 8. Changelog
| Fecha | Cambio | Motivo |
|-------|--------|--------|
```

## Checklist de completitud (obligatorio antes de ready-for-tests)

- [ ] Todos los AC tienen ID único y formato Given/When/Then
- [ ] Cada AC describe un resultado **observable por el usuario o sistema externo** (no detalles internos de implementación)
- [ ] Hay al menos un caso límite por flujo principal (o justificación de por qué no)
- [ ] Los contratos están definidos si la feature toca API/tipos compartidos
- [ ] La sección "Excluye" no está vacía (siempre hay algo fuera de alcance)
- [ ] No quedan preguntas abiertas sin resolver
- [ ] Los AC son testeables: si no puedes imaginar el test, el AC está mal escrito

## Anti-patrones a rechazar

- ❌ "El componente debe usar useState" → detalle de implementación, no criterio
- ✅ "Al pulsar el botón, el contador visible incrementa en 1"
- ❌ "El sistema debe ser rápido" → no medible
- ✅ "La lista renderiza en <200ms con 1000 ítems"
- ❌ Criterios sin ID → rompe la trazabilidad con los tests
