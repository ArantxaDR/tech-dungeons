import { describe, expect, it, beforeEach, vi } from 'vitest';
import { act, fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import CharacterCreator from '@/pages/CharacterCreator';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { useCharacterValidation } from '@/hooks/useCharacterValidation';
import { getCustomCharacters, saveCustomCharacter } from '@/data/customCharacters';
import { getEmptyCharacter } from '@/data/characterPresets';

const renderCreator = (initialEntries: string[] = ['/crear-personaje']) => {
  const router = createMemoryRouter(
    [
      { path: '/', element: <p>Portada</p> },
      { path: '/manual', element: <p>Manual</p> },
      { path: '/crear-personaje', element: <CharacterCreator /> },
    ],
    { initialEntries },
  );

  return {
    router,
    ...render(
      <>
        <Sonner />
        <RouterProvider router={router} />
      </>,
    ),
  };
};

const saveButton = () => screen.getByRole('button', { name: /Guardar Personaje/i });

describe('character creator guard', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('blocks the save and explains what is wrong', async () => {
    renderCreator();

    fireEvent.click(saveButton());

    expect(await screen.findByText('Ponle un nombre a tu personaje.')).toBeInTheDocument();
    expect(getCustomCharacters()).toHaveLength(0);
  });

  it('marks the invalid field for assistive tech and focuses it', async () => {
    renderCreator();

    fireEvent.click(saveButton());

    const nameInput = await screen.findByLabelText('Nombre');
    await screen.findByText('Ponle un nombre a tu personaje.');

    expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    expect(nameInput).toHaveAccessibleDescription('Ponle un nombre a tu personaje.');
    expect(nameInput).toHaveFocus();
  });

  it('saves a character once the data is valid', () => {
    renderCreator();

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Aria' } });
    fireEvent.click(saveButton());

    const saved = getCustomCharacters();
    expect(saved).toHaveLength(1);
    expect(saved[0].name).toBe('Aria');
  });

  it('rejects a name that another character already uses', async () => {
    saveCustomCharacter({ ...getEmptyCharacter(), id: 'saved-1', name: 'Aria' });
    renderCreator();

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Aria' } });
    fireEvent.blur(screen.getByLabelText('Nombre'));

    expect(await screen.findByText('Ya tienes una heroína con ese nombre.')).toBeInTheDocument();
    expect(getCustomCharacters()).toHaveLength(1);
  });

  it('rejects stats outside their range', async () => {
    renderCreator();

    const hitPoints = screen.getByLabelText('Puntos de golpe');
    fireEvent.change(hitPoints, { target: { value: '0' } });
    fireEvent.blur(hitPoints);

    expect(
      await screen.findByText('Los puntos de golpe deben estar entre 1 y 999.'),
    ).toBeInTheDocument();
  });
});

describe('avatar upload validation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('rejects a file that is not an image, with an inline message', () => {
    renderCreator();

    const file = new File(['x'], 'documento.pdf', { type: 'application/pdf' });
    fireEvent.change(screen.getByLabelText('Subir imagen de avatar'), {
      target: { files: [file] },
    });

    expect(
      screen.getByText('Ese archivo no es una imagen válida. Usa un JPG, PNG, WEBP o GIF.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Subir imagen/i })).toHaveAccessibleDescription(
      'Ese archivo no es una imagen válida. Usa un JPG, PNG, WEBP o GIF.',
    );
  });

  it('rejects a file over the size limit', () => {
    renderCreator();

    const file = new File(['x'], 'foto.jpg', { type: 'image/jpeg' });
    Object.defineProperty(file, 'size', { value: 11 * 1024 * 1024 });
    fireEvent.change(screen.getByLabelText('Subir imagen de avatar'), {
      target: { files: [file] },
    });

    expect(screen.getByText(/La imagen pesa 11 MB y el máximo es 10 MB/)).toBeInTheDocument();
  });
});

describe('character creator drafts', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('keeps the draft of a new character apart from the one being edited', async () => {
    saveCustomCharacter({ ...getEmptyCharacter(), id: 'saved-1', name: 'Aria' });
    const { unmount } = renderCreator(['/crear-personaje?id=saved-1']);

    expect(await screen.findByDisplayValue('Aria')).toBeInTheDocument();
    unmount();

    // A brand-new character starts from scratch, not from the edited one.
    renderCreator();
    expect(await screen.findByLabelText('Nombre')).toHaveValue('');
  });

  it('loads the saved character when it is edited', async () => {
    saveCustomCharacter({ ...getEmptyCharacter(), id: 'saved-1', name: 'Aria' });

    renderCreator(['/crear-personaje?id=saved-1']);

    expect(await screen.findByDisplayValue('Aria')).toBeInTheDocument();
  });

  it('keeps the edits of a character in a draft of its own', async () => {
    saveCustomCharacter({ ...getEmptyCharacter(), id: 'saved-1', name: 'Aria' });
    const { unmount } = renderCreator(['/crear-personaje?id=saved-1']);

    const nameInput = await screen.findByDisplayValue('Aria');
    fireEvent.change(nameInput, { target: { value: 'Aria II' } });
    unmount();

    expect(JSON.parse(localStorage.getItem('character-creator:saved-1') ?? '{}').name).toBe(
      'Aria II',
    );
    // The new-character slot was never touched.
    expect(localStorage.getItem('character-creator')).toBeNull();
  });

  it('frees the new-character slot once the character is saved', async () => {
    renderCreator();

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Aria' } });
    fireEvent.click(saveButton());

    await waitFor(() => expect(getCustomCharacters()).toHaveLength(1));
    const id = getCustomCharacters()[0].id;

    await waitFor(() =>
      expect(localStorage.getItem(`character-creator:${id}`)).not.toBeNull(),
    );
    expect(localStorage.getItem('character-creator')).toBeNull();
  });
});

describe('character creator unsaved changes guard', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('warns before leaving with changes that are not saved', async () => {
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false);
    renderCreator();

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Aria' } });
    fireEvent.click(screen.getByRole('link', { name: /Volver/i }));

    expect(confirm).toHaveBeenCalled();
    expect(screen.queryByText('Portada')).not.toBeInTheDocument();
  });

  it('leaves when the player confirms', async () => {
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(true);
    renderCreator();

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Aria' } });
    fireEvent.click(screen.getByRole('link', { name: /Volver/i }));

    expect(confirm).toHaveBeenCalled();
    expect(await screen.findByText('Portada')).toBeInTheDocument();
  });

  it('does not warn when there is nothing to lose', () => {
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(true);
    renderCreator();

    fireEvent.click(screen.getByRole('link', { name: /Volver/i }));

    expect(confirm).not.toHaveBeenCalled();
  });
});

describe('useCharacterValidation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('keeps quiet about a field the player has not touched yet', () => {
    const { result } = renderHook(() => useCharacterValidation(getEmptyCharacter()));

    expect(result.current.errors.name).toBeDefined();
    expect(result.current.visibleErrors.name).toBeUndefined();
  });

  it('shows the error of a field once the player leaves it', () => {
    const { result } = renderHook(() => useCharacterValidation(getEmptyCharacter()));

    act(() => {
      result.current.markTouched('name');
    });

    expect(result.current.visibleErrors.name).toBe('Ponle un nombre a tu personaje.');
  });

  it('reveals every error when a save was attempted', () => {
    const { result } = renderHook(() => useCharacterValidation(getEmptyCharacter()));

    act(() => {
      result.current.revealAll();
    });

    expect(result.current.visibleErrors.name).toBeDefined();
    expect(result.current.firstInvalidField).toBe('name');
  });

  it('does not consider the character being edited a duplicate of itself', () => {
    saveCustomCharacter({ ...getEmptyCharacter(), id: 'saved-1', name: 'Aria' });

    const { result } = renderHook(() => useCharacterValidation(
      { ...getEmptyCharacter(), name: 'Aria' },
      'saved-1',
    ));

    expect(result.current.errors.name).toBeUndefined();
    expect(result.current.isValid).toBe(true);
  });
});
