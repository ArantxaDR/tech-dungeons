import { useCallback, useMemo, useState } from 'react';

import type { Character } from '@/types/character';
import { getCustomCharacters } from '@/data/customCharacters';
import {
  getFirstInvalidField,
  validateCharacter,
  type CharacterValidation,
  type ValidationErrors,
  type ValidationField,
} from '@/lib/characterValidation';

export interface UseCharacterValidation {
  /** Every current error, whether or not the player has touched the field. */
  errors: ValidationErrors;
  /** Errors worth showing: the touched ones, or all of them after a save attempt. */
  visibleErrors: ValidationErrors;
  /** Errors of fields the creator cannot edit. */
  sheetErrors: string[];
  /** True once the player tried to save and the guard stopped them. */
  revealed: boolean;
  isValid: boolean;
  firstInvalidField: ValidationField | undefined;
  markTouched: (field: ValidationField) => void;
  revealAll: () => void;
  reset: () => void;
}

/**
 * Keeps the validation state of the creator: which fields the player has
 * already touched and whether the guard has revealed every error yet.
 */
export const useCharacterValidation = (
  character: Character,
  currentId?: string,
): UseCharacterValidation => {
  const [touched, setTouched] = useState<Partial<Record<ValidationField, boolean>>>({});
  const [revealed, setRevealed] = useState(false);

  // The character being edited never clashes with itself.
  const takenNames = useMemo(
    () => getCustomCharacters().filter((saved) => saved.id !== currentId).map((saved) => saved.name),
    [currentId],
  );

  const validation: CharacterValidation = useMemo(
    () => validateCharacter(character, { takenNames }),
    [character, takenNames],
  );

  const markTouched = useCallback((field: ValidationField) => {
    setTouched((previous) => (previous[field] ? previous : { ...previous, [field]: true }));
  }, []);

  const revealAll = useCallback(() => setRevealed(true), []);

  const reset = useCallback(() => {
    setTouched({});
    setRevealed(false);
  }, []);

  const visibleErrors = useMemo<ValidationErrors>(() => {
    if (revealed) return validation.fields;

    const visible: ValidationErrors = {};
    (Object.keys(validation.fields) as ValidationField[]).forEach((field) => {
      const message = validation.fields[field];
      if (message && touched[field]) visible[field] = message;
    });
    return visible;
  }, [validation.fields, touched, revealed]);

  return {
    errors: validation.fields,
    visibleErrors,
    sheetErrors: validation.sheet,
    revealed,
    isValid: Object.keys(validation.fields).length === 0 && validation.sheet.length === 0,
    firstInvalidField: getFirstInvalidField(validation),
    markTouched,
    revealAll,
    reset,
  };
};
