import { describe, expect, it } from 'vitest';

import { getEmptyCharacter } from '@/data/characterPresets';
import {
  getCharacterSnapshot,
  getDraftKey,
  isCharacterDirty,
  NEW_CHARACTER_DRAFT_KEY,
} from '@/lib/characterDraft';

describe('draft keys', () => {
  it('gives every saved character a draft of its own', () => {
    expect(getDraftKey()).toBe(NEW_CHARACTER_DRAFT_KEY);
    expect(getDraftKey('abc')).toBe(`${NEW_CHARACTER_DRAFT_KEY}:abc`);
  });
});

describe('character snapshot', () => {
  it('ignores the id, so the same character always gives the same snapshot', () => {
    const character = { ...getEmptyCharacter(), name: 'Aria' };

    expect(getCharacterSnapshot({ ...character, id: 'abc' } as never)).toBe(
      getCharacterSnapshot(character),
    );
  });
});

describe('dirty characters', () => {
  it('is not dirty when nothing was filled in', () => {
    expect(isCharacterDirty(getEmptyCharacter())).toBe(false);
  });

  it('is dirty as soon as a name is written', () => {
    expect(isCharacterDirty({ ...getEmptyCharacter(), name: 'Aria' })).toBe(true);
  });

  it('is dirty when the stats were changed', () => {
    expect(isCharacterDirty({ ...getEmptyCharacter(), hp: 12 })).toBe(true);
  });

  it('is not dirty when the character matches the saved one', () => {
    const saved = { ...getEmptyCharacter(), name: 'Aria', id: 'abc' };

    expect(isCharacterDirty({ ...saved, id: undefined } as never, saved)).toBe(false);
  });

  it('is dirty when a saved character was edited', () => {
    const saved = { ...getEmptyCharacter(), name: 'Aria', id: 'abc' };

    expect(isCharacterDirty({ ...saved, name: 'Aria II', id: undefined } as never, saved)).toBe(true);
  });

  it('does not care about the order of the fields', () => {
    const saved = { ...getEmptyCharacter(), name: 'Aria', id: 'abc' };
    const reordered = { name: 'Aria', id: undefined, ...getEmptyCharacter(), name: 'Aria' } as never;

    expect(isCharacterDirty(reordered, saved)).toBe(false);
  });
});
