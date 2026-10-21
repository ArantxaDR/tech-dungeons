import { describe, expect, it } from 'vitest';

import { getEmptyCharacter } from '@/data/characterPresets';
import { toExportableCharacter } from '@/lib/characterExport';
import { toFileName } from '@/lib/download';
import { toPrintableText } from '@/lib/characterPdf';

describe('file names', () => {
  it('turns a character name into a safe file name', () => {
    expect(toFileName('Aria la Querida')).toBe('aria-la-querida');
    expect(toFileName(' Ñu  Astro  ')).toBe('nu-astro');
    expect(toFileName('Boro-2')).toBe('boro-2');
  });

  it('falls back when there is nothing usable', () => {
    expect(toFileName('')).toBe('personaje');
    expect(toFileName('***')).toBe('personaje');
  });
});

describe('printable text', () => {
  it('replaces the characters the PDF fonts cannot show', () => {
    expect(toPrintableText('−2 concentraci\u00f3n')).toBe('-2 concentraci\u00f3n');
    expect(toPrintableText('guion \u2014 medio \u2013')).toBe('guion - medio -');
    expect(toPrintableText('punto \u00b7 estrella \u2605')).toBe('punto - estrella *');
  });

  it('keeps the Spanish letters and accents', () => {
    expect(toPrintableText('A\u00f1a, Ni\u00f1o, coraz\u00f3n, se\u00f1or')).toBe(
      'A\u00f1a, Ni\u00f1o, coraz\u00f3n, se\u00f1or',
    );
  });
});

describe('exportable character', () => {
  it('keeps the data of the character', () => {
    const character = { ...getEmptyCharacter(), name: 'Aria', role: 'frontend' };

    const exported = toExportableCharacter(character);

    expect(exported.name).toBe('Aria');
    expect(exported.role).toBe('frontend');
    expect(exported.hp).toBe(character.hp);
    expect(exported.abilities).toEqual(character.abilities);
  });

  it('drops the icons, which are not data', () => {
    const character = {
      ...getEmptyCharacter(),
      classFeatures: [
        { id: 'a', title: 'EXPERIENCIA', description: 'Maestria', icon: (() => null) as never },
      ],
    };

    const exported = toExportableCharacter(character);

    expect(exported.classFeatures).toEqual([
      { id: 'a', title: 'EXPERIENCIA', description: 'Maestria' },
    ]);
    expect(JSON.stringify(exported)).toContain('EXPERIENCIA');
  });
});
