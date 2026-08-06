import { describe, it, expect, beforeEach } from 'vitest';
import { getCustomCharacters, saveCustomCharacter, deleteCustomCharacter, CustomCharacter } from './customCharacters';
import { getEmptyCharacter } from './characterPresets';

const makeCharacter = (id: string, name: string): CustomCharacter => ({
  ...getEmptyCharacter(),
  id,
  name,
});

beforeEach(() => {
  localStorage.clear();
});

describe('customCharacters storage', () => {
  it('starts empty', () => {
    expect(getCustomCharacters()).toEqual([]);
  });

  it('saves a new character', () => {
    saveCustomCharacter(makeCharacter('a', 'Aria'));
    expect(getCustomCharacters()).toHaveLength(1);
    expect(getCustomCharacters()[0].name).toBe('Aria');
  });

  it('updates in place instead of duplicating on same id', () => {
    saveCustomCharacter(makeCharacter('a', 'Aria'));
    saveCustomCharacter(makeCharacter('a', 'Aria renombrada'));
    const all = getCustomCharacters();
    expect(all).toHaveLength(1);
    expect(all[0].name).toBe('Aria renombrada');
  });

  it('deletes by id without touching others', () => {
    saveCustomCharacter(makeCharacter('a', 'Aria'));
    saveCustomCharacter(makeCharacter('b', 'Boro'));
    deleteCustomCharacter('a');
    const all = getCustomCharacters();
    expect(all).toHaveLength(1);
    expect(all[0].id).toBe('b');
  });
});
