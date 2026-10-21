import type { AbilityName, Character } from '@/types/character';
import { ABILITY_LABELS } from '@/data/statGlossary';

/**
 * Every field of the creator that can be validated. The ability scores use a
 * template literal so each one can be reported on its own.
 */
export type ValidationField =
  | 'name'
  | 'hp'
  | 'armorClass'
  | 'speed'
  | `ability:${AbilityName}`;

export type ValidationErrors = Partial<Record<ValidationField, string>>;

export interface CharacterValidation {
  /** One message per field the player can edit. */
  fields: ValidationErrors;
  /** Messages for fields the creator cannot edit (level, xp). */
  sheet: string[];
}

export interface ValidationOptions {
  /** Names already taken by other saved characters. */
  takenNames?: string[];
}

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 40;

export const STAT_RANGES = {
  hp: { min: 1, max: 999 },
  armorClass: { min: 1, max: 30 },
  speed: { min: 0, max: 300 },
} as const;

export const ABILITY_MIN_SCORE = 1;
export const ABILITY_MAX_SCORE = 30;

export const LEVEL_RANGE = { min: 1, max: 20 } as const;

/** Document order, so the first error we focus is also the first one seen. */
const FIELD_ORDER: ValidationField[] = [
  'name',
  'hp',
  'armorClass',
  'speed',
  'ability:FUE',
  'ability:DES',
  'ability:CON',
  'ability:INT',
  'ability:SAB',
  'ability:CAR',
];

const isIntegerInRange = (value: number, min: number, max: number): boolean =>
  Number.isInteger(value) && value >= min && value <= max;

const normalizeName = (name: string): string => name.trim().toLowerCase();

export const validateCharacter = (
  character: Character,
  options: ValidationOptions = {},
): CharacterValidation => {
  const fields: ValidationErrors = {};
  const sheet: string[] = [];
  const takenNames = options.takenNames ?? [];

  const name = character.name.trim();
  if (!name) {
    fields.name = 'Ponle un nombre a tu personaje.';
  } else if (name.length < NAME_MIN_LENGTH) {
    fields.name = `El nombre necesita al menos ${NAME_MIN_LENGTH} caracteres.`;
  } else if (name.length > NAME_MAX_LENGTH) {
    fields.name = `El nombre no puede pasar de ${NAME_MAX_LENGTH} caracteres.`;
  } else if (takenNames.some(taken => normalizeName(taken) === normalizeName(name))) {
    fields.name = 'Ya tienes una heroína con ese nombre.';
  }

  const hpRange = STAT_RANGES.hp;
  if (!isIntegerInRange(character.hp, hpRange.min, hpRange.max)) {
    fields.hp = `Los puntos de golpe deben estar entre ${hpRange.min} y ${hpRange.max}.`;
  }

  const armorRange = STAT_RANGES.armorClass;
  if (!isIntegerInRange(character.armorClass, armorRange.min, armorRange.max)) {
    fields.armorClass = `La clase de armadura debe estar entre ${armorRange.min} y ${armorRange.max}.`;
  }

  const speedRange = STAT_RANGES.speed;
  if (!isIntegerInRange(character.speed, speedRange.min, speedRange.max)) {
    fields.speed = `La velocidad debe estar entre ${speedRange.min} y ${speedRange.max}.`;
  }

  const abilities = Array.isArray(character.abilities) ? character.abilities : [];
  abilities.forEach((ability) => {
    if (!isIntegerInRange(ability.score, ABILITY_MIN_SCORE, ABILITY_MAX_SCORE)) {
      const label = ABILITY_LABELS[ability.name] ?? ability.name;
      fields[`ability:${ability.name}`] =
        `${label} (${ability.name}) debe estar entre ${ABILITY_MIN_SCORE} y ${ABILITY_MAX_SCORE}.`;
    }
  });

  // Level and XP are not editable in the creator, so they cannot be fixed here.
  if (!isIntegerInRange(character.level, LEVEL_RANGE.min, LEVEL_RANGE.max)) {
    sheet.push(`El nivel debe estar entre ${LEVEL_RANGE.min} y ${LEVEL_RANGE.max}.`);
  }
  if (!Number.isInteger(character.xp) || character.xp < 0) {
    sheet.push('La experiencia no puede ser negativa.');
  }

  return { fields, sheet };
};

export const getFirstInvalidField = (
  validation: CharacterValidation,
): ValidationField | undefined =>
  FIELD_ORDER.find((field) => Boolean(validation.fields[field]));

/** The DOM id of the input a validation field belongs to. */
export const getFieldElementId = (field: ValidationField): string =>
  field.startsWith('ability:') ? `ability-${field.slice('ability:'.length)}` : field;
