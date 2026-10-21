import { describe, expect, it } from 'vitest';

import { getEmptyCharacter } from '@/data/characterPresets';
import { buildCharacterPdf } from '@/lib/characterPdf';

describe('character PDF', () => {
  it('builds a PDF file', async () => {
    const blob = await buildCharacterPdf({ ...getEmptyCharacter(), name: 'Aria' });

    expect(blob.type).toBe('application/pdf');
    expect(blob.size).toBeGreaterThan(1000);
  });

  it('builds a PDF of a character with every section filled', async () => {
    const character = {
      ...getEmptyCharacter(),
      name: 'Aria la Querida',
      role: 'frontend',
      race: 'Elfa',
      className: 'P\u00edcara (Rogue)',
      notes: 'Siempre lista para una revisi\u00f3n de c\u00f3digo.',
      classFeatures: [
        { id: 'a', title: 'EXPERIENCIA', description: 'Dominio doble en 2 habilidades.' },
      ],
      skills: [
        {
          id: 'percepcion',
          name: 'Percepci\u00f3n',
          ability: 'SAB' as const,
          baseModifier: 2,
          proficient: true,
          expertise: true,
        },
      ],
    };

    const blob = await buildCharacterPdf(character);

    expect(blob.size).toBeGreaterThan(1000);
  });
});
