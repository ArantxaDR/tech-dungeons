import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const bordersDir = join(__dirname, '..', 'assets', 'borders');
const files = readdirSync(bordersDir).filter(f => f.endsWith('.svg'));

describe('decorative border SVGs', () => {
  it('found the expected files', () => {
    expect(files.length).toBeGreaterThanOrEqual(6);
  });

  files.forEach(file => {
    it(`${file} is well-formed XML with a viewBox`, () => {
      const src = readFileSync(join(bordersDir, file), 'utf8');
      const doc = new DOMParser().parseFromString(src, 'image/svg+xml');
      expect(doc.querySelector('parsererror')).toBeNull();
      const svg = doc.querySelector('svg');
      expect(svg?.getAttribute('viewBox')).toBeTruthy();
    });
  });
});
