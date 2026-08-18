---
name: tdd-cycle
description: Ritual rojo-verde-refactor para implementar código contra tests existentes. Usar SIEMPRE que haya tests en rojo que implementar, cuando el usuario pida "hacer pasar los tests", "implementar la spec", o durante cualquier fase de implementación del flujo SDD+TDD.
---

# Ciclo TDD: Rojo → Verde → Refactor

Se implementa **un test (o grupo cohesivo de un mismo AC) a la vez**. Nunca todos de golpe.

## Comandos base

```bash
pnpm test                    # suite completa (vitest run)
pnpm test:watch              # watch durante el ciclo
pnpm exec vitest run <archivo>  # un archivo concreto
pnpm exec tsc --noEmit       # no hay script "typecheck" en package.json
pnpm lint                     # eslint . (strict:false en tsconfig — lint es el gate real, no tsc)
```

## Fase 1: ROJO

1. Ejecuta el test objetivo. **Lee el mensaje de fallo completo.**
2. Confirma que falla por la razón esperada:
   - Módulo inexistente → toca crear el módulo según los Contratos de la spec.
   - Assertion fallida → toca implementar el comportamiento.
   - Error de setup/typo → el test está roto: NO lo arregles tú, repórtalo al test-writer.
3. Si el test ya pasa sin haber escrito nada, algo va mal: o el test es vacío o el comportamiento ya existía. Investiga antes de continuar.

## Fase 2: VERDE

1. Escribe el código **mínimo** que hace pasar el test. Mínimo significa:
   - Sin parámetros de configuración que ningún test pide.
   - Sin manejar errores que ningún EC exige (aún).
   - Sin abstracciones "por si acaso".
2. Ejecuta el test objetivo → verde. Ejecuta la suite completa → sin regresiones.
3. `pnpm exec tsc --noEmit` limpio. Prohibido `any`, `@ts-ignore`, `as unknown as` para forzar el verde (aunque `strict: false` no lo bloquee).

## Fase 3: REFACTOR

Solo con la suite en verde:
1. Elimina duplicación introducida en la fase verde.
2. Aplica las convenciones de componentes del proyecto (extraer hooks, nombrar bien, dividir componentes grandes).
3. Tras CADA cambio de refactor, suite en verde. Si se rompe, revierte el paso, no parchees.
4. El refactor NO añade comportamiento. Si descubres comportamiento que falta, es el siguiente ciclo (o un hueco en la spec: repórtalo).

## Orden de implementación recomendado

1. AC del flujo feliz principal (dan la estructura).
2. Resto de AC.
3. EC (casos límite y errores) — suelen añadir ramas al código ya estructurado.

## Señales de alarma (parar y reportar)

- Dos tests del mismo AC se contradicen → spec ambigua, vuelve al spec-writer.
- Un test exige acoplamiento a detalles internos → test mal escrito, vuelve al test-writer.
- Necesitas más de ~3 ciclos para un solo test → el AC es demasiado grande, propón dividirlo en la spec.
