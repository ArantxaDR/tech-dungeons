import { Character } from '@/types/character';

export type DraftCharacter = Character & { role: string; imageDataUrl?: string };
export type CustomCharacter = DraftCharacter & { id: string };

const STORAGE_KEY = 'custom-characters';

export const getCustomCharacters = (): CustomCharacter[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CustomCharacter[]) : [];
  } catch {
    return [];
  }
};

export const saveCustomCharacter = (character: CustomCharacter): void => {
  const all = getCustomCharacters();
  const index = all.findIndex(c => c.id === character.id);
  if (index >= 0) {
    all[index] = character;
  } else {
    all.push(character);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
};

export const deleteCustomCharacter = (id: string): void => {
  const all = getCustomCharacters().filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
};
