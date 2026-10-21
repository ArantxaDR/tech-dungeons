import type { CustomCharacter, DraftCharacter } from '@/data/customCharacters';
import { getEmptyCharacter } from '@/data/characterPresets';

/** Slot of the character that is being created from scratch. */
export const NEW_CHARACTER_DRAFT_KEY = 'character-creator';

/** Every saved character keeps its own draft, so editing one never touches another. */
export const getDraftKey = (characterId?: string): string =>
  characterId ? `${NEW_CHARACTER_DRAFT_KEY}:${characterId}` : NEW_CHARACTER_DRAFT_KEY;

export const readDraft = (key: string): DraftCharacter | null => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as DraftCharacter;
  } catch {
    return null;
  }
};

export const removeDraft = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

/**
 * Snapshot of a character without its id and with a fixed key order, so two
 * versions can be compared without caring about how they were stored.
 */
export const getCharacterSnapshot = (character: DraftCharacter): string =>
  JSON.stringify({
    name: character.name,
    race: character.race,
    className: character.className,
    role: character.role,
    level: character.level,
    background: character.background,
    alignment: character.alignment,
    xp: character.xp,
    hp: character.hp,
    hitDie: character.hitDie,
    armorClass: character.armorClass,
    initiative: character.initiative,
    proficiencyBonus: character.proficiencyBonus,
    speed: character.speed,
    abilities: character.abilities,
    skills: character.skills,
    classFeatures: character.classFeatures,
    racialTraits: character.racialTraits,
    proficiencies: character.proficiencies,
    equipment: character.equipment,
    conditions: character.conditions,
    notes: character.notes,
    imageDataUrl: character.imageDataUrl ?? null,
  });

/**
 * True when the working copy differs from the one in the list: either a
 * character that was never saved, or a saved one with local edits.
 */
export const isCharacterDirty = (
  character: DraftCharacter,
  saved?: CustomCharacter,
): boolean =>
  getCharacterSnapshot(character) !== getCharacterSnapshot(saved ?? getEmptyCharacter());
