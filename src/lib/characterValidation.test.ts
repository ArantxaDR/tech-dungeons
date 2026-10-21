import { describe, expect, it } from 'vitest';

import { getEmptyCharacter } from '@/data/characterPresets';
import {
  getFieldElementId,
  getFirstInvalidField,
  validateCharacter,
} from '@/lib/characterValidation';
import type { Character } from '@/types/character';

const characterWith = (overrides: Partial<Character> = {}): Character => ({
  ...getEmptyCharacter(),
  name: 'Aria',
  ...overrides,
});

const withAbility = (character: Character, name: string, score: number): Character => ({
  ...character,
  abilities: character.abilities.map((ability) =>
    ability.name === name ? { ...ability, score } : ability,
  ),
});

describe('character name validation', () => {
  it('asks for a name when it is empty', () => {
    expect(validateCharacter(characterWith({ name: '' })).fields.name).toBe(
      'Ponle un nombre a tu personaje.',
    );
  });

  it('asks for a name when it is only whitespace', () => {
    expect(validateCharacter(characterWith({ name: '   ' })).fields.name).toBe(
      'Ponle un nombre a tu personaje.',
    );
  });

  it('rejects a name that is too short', () => {
    expect(validateCharacter(characterWith({ name: 'A' })).fields.name).toBe(
      'El nombre necesita al menos 2 caracteres.',
    );
  });

  it('rejects a name that is too long', () => {
    expect(validateCharacter(characterWith({ name: 'a'.repeat(41) })).fields.name).toBe(
      'El nombre no puede pasar de 40 caracteres.',
    );
  });

  it('accepts a name at the length boundaries', () => {
    expect(validateCharacter(characterWith({ name: 'Ab' })).fields.name).toBeUndefined();
    expect(validateCharacter(characterWith({ name: 'a'.repeat(40) })).fields.name).toBeUndefined();
  });

  it('rejects a name already taken by another character', () => {
    const result = validateCharacter(characterWith({ name: 'Aria' }), {
      takenNames: ['Boro', 'Aria'],
    });

    expect(result.fields.name).toBe('Ya tienes una heroína con ese nombre.');
  });

  it('ignores case and surrounding spaces when comparing names', () => {
    const result = validateCharacter(characterWith({ name: ' aria ' }), {
      takenNames: ['Aria'],
    });

    expect(result.fields.name).toBe('Ya tienes una heroína con ese nombre.');
  });

  it('accepts a name that is only similar to a taken one', () => {
    const result = validateCharacter(characterWith({ name: 'Arianna' }), {
      takenNames: ['Aria'],
    });

    expect(result.fields.name).toBeUndefined();
  });
});

describe('character stats validation', () => {
  it('rejects hit points outside 1-999', () => {
    expect(validateCharacter(characterWith({ hp: 0 })).fields.hp).toBe(
      'Los puntos de golpe deben estar entre 1 y 999.',
    );
    expect(validateCharacter(characterWith({ hp: 1000 })).fields.hp).toBeDefined();
    expect(validateCharacter(characterWith({ hp: 8 })).fields.hp).toBeUndefined();
    expect(validateCharacter(characterWith({ hp: 999 })).fields.hp).toBeUndefined();
  });

  it('rejects fractional hit points', () => {
    expect(validateCharacter(characterWith({ hp: 8.5 })).fields.hp).toBeDefined();
  });

  it('rejects armor class outside 1-30', () => {
    expect(validateCharacter(characterWith({ armorClass: 0 })).fields.armorClass).toBe(
      'La clase de armadura debe estar entre 1 y 30.',
    );
    expect(validateCharacter(characterWith({ armorClass: 31 })).fields.armorClass).toBeDefined();
    expect(validateCharacter(characterWith({ armorClass: 15 })).fields.armorClass).toBeUndefined();
  });

  it('rejects speed outside 0-300', () => {
    expect(validateCharacter(characterWith({ speed: -1 })).fields.speed).toBe(
      'La velocidad debe estar entre 0 y 300.',
    );
    expect(validateCharacter(characterWith({ speed: 301 })).fields.speed).toBeDefined();
    expect(validateCharacter(characterWith({ speed: 0 })).fields.speed).toBeUndefined();
    expect(validateCharacter(characterWith({ speed: 30 })).fields.speed).toBeUndefined();
  });

  it('rejects ability scores outside the 5e range', () => {
    const character = withAbility(characterWith(), 'FUE', 31);
    const result = validateCharacter(character);

    expect(result.fields['ability:FUE']).toBe('Fuerza (FUE) debe estar entre 1 y 30.');
    expect(result.fields['ability:DES']).toBeUndefined();
  });

  it('accepts ability scores at the range boundaries', () => {
    expect(validateCharacter(withAbility(characterWith(), 'DES', 1)).fields['ability:DES'])
      .toBeUndefined();
    expect(validateCharacter(withAbility(characterWith(), 'DES', 30)).fields['ability:DES'])
      .toBeUndefined();
  });

  it('reports level and xp as sheet errors because the creator cannot edit them', () => {
    const result = validateCharacter(characterWith({ level: 0, xp: -5 }));

    expect(result.sheet).toContain('El nivel debe estar entre 1 y 20.');
    expect(result.sheet).toContain('La experiencia no puede ser negativa.');
  });

  it('passes a complete character', () => {
    const result = validateCharacter(characterWith());

    expect(result.fields).toEqual({});
    expect(result.sheet).toEqual([]);
  });
});

describe('validation focus order', () => {
  it('points at the first field in document order', () => {
    const character = withAbility(characterWith({ hp: 0, name: '' }), 'DES', 99);
    const result = validateCharacter(character);

    expect(getFirstInvalidField(result)).toBe('name');
  });

  it('points at the stat before the abilities', () => {
    const character = withAbility(characterWith({ armorClass: 0 }), 'FUE', 99);
    const result = validateCharacter(character);

    expect(getFirstInvalidField(result)).toBe('armorClass');
  });

  it('maps a field to the id of its input', () => {
    expect(getFieldElementId('name')).toBe('name');
    expect(getFieldElementId('ability:DES')).toBe('ability-DES');
  });
});
