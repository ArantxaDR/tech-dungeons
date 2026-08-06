---
name: testing-react
description: Convenciones para escribir tests de React con Vitest y Testing Library en flujo SDD+TDD. Usar SIEMPRE que se escriban, revisen o modifiquen tests de componentes, hooks o flujos de UI en React, aunque el usuario no mencione "testing" explícitamente (ej. "comprueba que el formulario valida").
---

# Testing React (SDD + TDD)

Filosofía central: **se testea lo que el usuario ve y hace, jamás cómo está implementado.** Un test que se rompe al refactorizar sin cambiar comportamiento es un test mal escrito.

## Trazabilidad con specs

- Todo test de feature referencia su criterio: `it('AC-003-01: <descripción>', ...)`.
- Los `describe` agrupan por spec: `describe('SPEC-003: Login form', ...)`.
- Un test sin ID de AC/EC solo es válido para utilidades puras internas.

## Qué testear y cómo

### ✅ Correcto
```tsx
it('AC-003-01: muestra error si el email es inválido', async () => {
  render(<LoginForm />)
  await userEvent.type(screen.getByLabelText(/email/i), 'no-es-email')
  await userEvent.click(screen.getByRole('button', { name: /enviar/i }))
  expect(screen.getByRole('alert')).toHaveTextContent(/email inválido/i)
})
```

### ❌ Prohibido
- Testear estado interno: `expect(result.current.count).toBe(1)` para un componente (para hooks puros con renderHook sí es válido).
- Selectores por clase CSS o estructura DOM: `container.querySelector('.btn-primary')`.
- Snapshots como test principal de comportamiento.
- `fireEvent` cuando `userEvent` es posible (userEvent simula interacción real).

## Jerarquía de selectores (en orden de preferencia)

1. `getByRole` (con `name`) — además valida accesibilidad gratis
2. `getByLabelText` — formularios
3. `getByText` — contenido visible
4. `getByTestId` — último recurso, solo si no hay semántica posible

Si necesitas `getByTestId` a menudo, el componente tiene un problema de accesibilidad: repórtalo.

## Mocks: solo fronteras

- **Sí se mockea:** red (MSW preferido sobre mock de fetch), tiempo (`vi.useFakeTimers`), navegación, APIs del navegador.
- **No se mockea:** componentes hijos propios, hooks propios, stores internos. Si un test "necesita" mockear un hijo, el test está en el nivel equivocado o el componente está mal diseñado.

## Async

- `findBy*` para elementos que aparecen tras async, nunca `waitFor` + `getBy*` si `findBy` basta.
- Jamás `waitFor` con cuerpo vacío ni `setTimeout` arbitrarios.

## Estructura de archivos

- Test junto al componente: `LoginForm.tsx` + `LoginForm.test.tsx`.
- Setup compartido en `src/test/setup.ts` (MSW handlers, matchers de jest-dom).
- E2E en `e2e/` con Playwright, también trazados a AC: `test('AC-003-04: ...')`.

## En rojo primero (contexto TDD)

Al escribir tests antes de la implementación:
- Importa desde las rutas definidas en los Contratos de la spec aunque no existan aún.
- Verifica que el test falla por la razón correcta (assertion o módulo inexistente), no por un error del propio test (typo en selector, setup roto).
- Un test nuevo que pasa sin implementación es un bug del test.
