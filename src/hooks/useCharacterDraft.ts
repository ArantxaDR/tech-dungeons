import { useCallback, useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import type { DraftCharacter } from '@/data/customCharacters';
import { getCustomCharacters } from '@/data/customCharacters';
import { getEmptyCharacter } from '@/data/characterPresets';
import {
  getDraftKey,
  NEW_CHARACTER_DRAFT_KEY,
  readDraft,
  removeDraft,
} from '@/lib/characterDraft';

export interface UseCharacterDraft {
  character: DraftCharacter;
  setCharacter: Dispatch<SetStateAction<DraftCharacter>>;
  /** Frees the "new character" slot once that character has been saved. */
  releaseNewCharacterSlot: () => void;
}

/** The draft of a character: its own copy of the saved one, or the saved one itself. */
const getInitialDraft = (characterId?: string): DraftCharacter => {
  const draft = readDraft(getDraftKey(characterId));
  if (draft) return draft;

  const saved = characterId
    ? getCustomCharacters().find((character) => character.id === characterId)
    : undefined;

  return saved ?? getEmptyCharacter();
};

/**
 * Keeps the character being edited in its own autosaved draft. Editing a saved
 * character no longer overwrites the draft of a brand-new one.
 */
export const useCharacterDraft = (characterId?: string): UseCharacterDraft => {
  const key = getDraftKey(characterId);

  const [state, setState] = useState<{ key: string; character: DraftCharacter }>(() => ({
    key,
    character: getInitialDraft(characterId),
  }));

  const setCharacter = useCallback<Dispatch<SetStateAction<DraftCharacter>>>((update) => {
    setState((previous) => ({
      key: previous.key,
      character:
        typeof update === 'function'
          ? (update as (previousCharacter: DraftCharacter) => DraftCharacter)(previous.character)
          : update,
    }));
  }, []);

  // Switching to another character loads that character's own draft.
  useEffect(() => {
    setState({ key, character: getInitialDraft(characterId) });
  }, [key, characterId]);

  // Autosave the draft, but only once it belongs to the current key.
  useEffect(() => {
    if (state.key !== key) return;
    try {
      localStorage.setItem(key, JSON.stringify(state.character));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, state]);

  const releaseNewCharacterSlot = useCallback(() => {
    removeDraft(NEW_CHARACTER_DRAFT_KEY);
  }, []);

  return {
    character: state.character,
    setCharacter,
    releaseNewCharacterSlot,
  };
};
