import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { StatTooltip } from '@/components/StatTooltip';
import { STAT_GLOSSARY, type StatKey } from '@/data/statGlossary';
import { getDefaultStackia } from '@/data/characterPresets';

/** Every abbreviation the sheets show to the player. */
const SHOWN_STATS: StatKey[] = [
  'FUE',
  'DES',
  'CON',
  'INT',
  'SAB',
  'CAR',
  'HP',
  'CA',
  'INIC',
  'VEL',
  'ATR',
  'P',
  'E',
];

describe('stat abbreviation tooltips', () => {
  it('gives every abbreviation a full name and an explanation', () => {
    SHOWN_STATS.forEach((key) => {
      expect(STAT_GLOSSARY[key].label).not.toBe(key);
      expect(STAT_GLOSSARY[key].description.length).toBeGreaterThan(15);
    });
  });

  it('explains every ability a saved sheet renders', () => {
    getDefaultStackia().abilities.forEach((ability) => {
      expect(STAT_GLOSSARY[ability.name].label.length).toBeGreaterThan(2);
    });
  });

  it('links each abbreviation to its meaning for assistive tech', () => {
    render(<StatTooltip stat="FUE" />);

    expect(screen.getByRole('button', { name: 'FUE' })).toHaveAccessibleDescription(
      'Fuerza: Potencia física: golpes, carga y pruebas de atletismo.'
    );
  });

  it('shows the meaning when tapped, because touch never hovers', () => {
    render(<StatTooltip stat="HP" />);

    fireEvent.click(screen.getByRole('button', { name: 'HP' }));

    expect(screen.getByText('Puntos de golpe')).toBeInTheDocument();
  });
});
