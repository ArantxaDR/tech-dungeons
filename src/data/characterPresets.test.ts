import { describe, it, expect } from 'vitest';
import { generateCharacter } from './characterPresets';

describe('generateCharacter', () => {
  it('applies the chosen race bonus, not just the class (regression: race used to be ignored)', () => {
    const elfa = generateCharacter('Elfa', 'Pícara');
    const enana = generateCharacter('Enana', 'Pícara');

    expect(elfa.abilities.find(a => a.name === 'DES')?.score).toBe(16); // 10 + 4 primary + 2 race
    expect(enana.abilities.find(a => a.name === 'DES')?.score).toBe(14); // 10 + 4 primary, no DES bonus for Enana
    expect(elfa.speed).toBe(30);
    expect(enana.speed).toBe(25);
  });

  it('flags the class saving throws as proficient', () => {
    const character = generateCharacter('Humana', 'Bárbara');
    const fue = character.abilities.find(a => a.name === 'FUE');
    const con = character.abilities.find(a => a.name === 'CON');
    const sab = character.abilities.find(a => a.name === 'SAB');

    expect(fue?.savingThrowProficient).toBe(true);
    expect(con?.savingThrowProficient).toBe(true);
    expect(sab?.savingThrowProficient).toBe(false);
  });

  it('derives hp, armor class and initiative from the resulting ability scores', () => {
    const character = generateCharacter('Enana', 'Bárbara'); // hitDie d12, primary FUE, saves FUE+CON, Enana +2 CON
    const conMod = character.abilities.find(a => a.name === 'CON')!.modifier;
    const desMod = character.abilities.find(a => a.name === 'DES')!.modifier;

    expect(character.hp).toBe(12 + conMod);
    expect(character.armorClass).toBe(10 + desMod);
    expect(character.initiative).toBe(desMod);
  });

  it('populates skills from the selected role, scoped to the generated abilities', () => {
    const character = generateCharacter('Elfa', 'Pícara', 'frontend');
    expect(character.skills.map(s => s.name)).toEqual(['Percepción', 'Destreza manual', 'Sigilo']);
    expect(character.skills.every(s => s.proficient)).toBe(true);
  });

  it('borrows flavor text from the matching named preset when the pairing is canonical', () => {
    const character = generateCharacter('Elfa', 'Pícara');
    expect(character.classFeatures.map((f) => f.title)).toContain('SNEAK ATTACK (1d6)');
  });

  it('leaves flavor text blank for a race+class combo with no canonical preset', () => {
    const character = generateCharacter('Enana', 'Pícara');
    expect(character.classFeatures).toEqual([]);
    expect(character.racialTraits).not.toEqual([]);
  });
});
