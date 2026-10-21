import type { jsPDF } from 'jspdf';

import type { DraftCharacter } from '@/data/customCharacters';
import { calculateSkillTotal } from '@/types/character';

const PAGE = { width: 210, height: 297 };
const MARGIN = 13;
const CONTENT_WIDTH = PAGE.width - MARGIN * 2;
const COLUMN_GAP = 8;
const COLUMN_WIDTH = (CONTENT_WIDTH - COLUMN_GAP) / 2;
const LINE_HEIGHT = 3.4;

/** The palette of the app, in the RGB the PDF understands. */
const COLORS = {
  parchment: [251, 251, 226],
  ink: [27, 29, 14],
  gold: [115, 92, 0],
  goldBright: [160, 130, 34],
  card: [239, 239, 215],
  cardLight: [245, 245, 220],
  muted: [77, 70, 53],
  border: [141, 132, 104],
} as const;

/**
 * The standard PDF fonts only cover Latin-1, so the fancy dashes, bullets and
 * stars of the app are replaced by plain characters.
 */
export const toPrintableText = (text: string): string =>
  text
    .replace(/[\u2212\u2013\u2014]/g, '-')
    .replace(/[\u00b7\u2022]/g, '-')
    .replace(/[\u2605\u2606]/g, '*')
    .replace(/\u2026/g, '...')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[^\u0020-\u00ff]/g, '');

interface Column {
  x: number;
  y: number;
  width: number;
}

const drawBox = (
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  fill: readonly [number, number, number],
  border: readonly [number, number, number],
): void => {
  doc.setFillColor(...fill);
  doc.setDrawColor(...border);
  doc.setLineWidth(0.3);
  doc.rect(x, y, width, height, 'FD');
};

const drawPage = (doc: jsPDF): void => {
  doc.setFillColor(...COLORS.parchment);
  doc.rect(0, 0, PAGE.width, PAGE.height, 'F');

  doc.setDrawColor(...COLORS.goldBright);
  doc.setLineWidth(0.9);
  doc.rect(MARGIN - 5, MARGIN - 5, PAGE.width - (MARGIN - 5) * 2, PAGE.height - (MARGIN - 5) * 2, 'S');
  doc.setLineWidth(0.25);
  doc.setDrawColor(...COLORS.border);
  doc.rect(MARGIN - 2.5, MARGIN - 2.5, PAGE.width - (MARGIN - 2.5) * 2, PAGE.height - (MARGIN - 2.5) * 2, 'S');
};

const countLines = (doc: jsPDF, text: string, width: number): number =>
  (doc.splitTextToSize(toPrintableText(text), width) as string[]).length;

/** The ruled title of a block, like the section titles of the app. */
const drawSectionTitle = (doc: jsPDF, title: string, x: number, y: number, width: number): number => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.gold);
  doc.setCharSpace(1.4);
  doc.text(toPrintableText(title.toUpperCase()), x, y);
  doc.setCharSpace(0);

  doc.setDrawColor(...COLORS.goldBright);
  doc.setLineWidth(0.5);
  doc.line(x, y + 1.6, x + width, y + 1.6);
  doc.setLineWidth(0.15);
  doc.setDrawColor(...COLORS.border);
  doc.line(x, y + 2.4, x + width, y + 2.4);

  return y + 6;
};

const drawAvatar = (
  doc: jsPDF,
  character: DraftCharacter,
  x: number,
  y: number,
  size: number,
): void => {
  doc.setFillColor(...COLORS.card);
  doc.setDrawColor(...COLORS.gold);
  doc.setLineWidth(0.5);
  doc.rect(x, y, size, size, 'FD');

  const image = character.imageDataUrl;
  if (image) {
    try {
      doc.addImage(image, 'JPEG', x + 0.6, y + 0.6, size - 1.2, size - 1.2);
      return;
    } catch {
      // Fall back to the initials when the image cannot be embedded.
    }
  }

  const initials = (character.name.trim() || '?')
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...COLORS.gold);
  doc.text(initials, x + size / 2, y + size / 2 + 5, { align: 'center' });
};

const drawHeader = (
  doc: jsPDF,
  character: DraftCharacter,
  x: number,
  y: number,
  width: number,
): number => {
  const avatarSize = 34;
  drawAvatar(doc, character, x, y, avatarSize);

  const textX = x + avatarSize + 8;
  const textWidth = width - avatarSize - 8;
  let cursor = y + 8;

  const name = character.name.trim() || 'Sin nombre';
  doc.setFont('helvetica', 'bold');
  let nameSize = 20;
  doc.setFontSize(nameSize);
  while (doc.getTextWidth(toPrintableText(name)) > textWidth && nameSize > 10) {
    nameSize -= 1;
    doc.setFontSize(nameSize);
  }
  doc.setTextColor(...COLORS.ink);
  doc.text(toPrintableText(name), textX, cursor);
  cursor += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.gold);
  const headline = [character.role, character.className].filter(Boolean).join('  ·  ');
  if (headline) {
    doc.text(toPrintableText(headline), textX, cursor);
    cursor += 5;
  }

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.muted);
  const details = [character.race, `Nivel ${character.level}`, character.alignment]
    .filter(Boolean)
    .join('  ·  ');
  if (details) {
    doc.text(toPrintableText(details), textX, cursor);
    cursor += 5;
  }

  if (character.background) {
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.muted);
    doc.text(toPrintableText(`Fondo: ${character.background}`), textX, cursor);
    cursor += 4;
  }

  return Math.max(cursor, y + avatarSize) + 4;
};

const drawStats = (
  doc: jsPDF,
  character: DraftCharacter,
  x: number,
  y: number,
  width: number,
): number => {
  const stats: [string, string][] = [
    ['HP', String(character.hp)],
    ['CA', String(character.armorClass)],
    ['INIC', `${character.initiative >= 0 ? '+' : ''}${character.initiative}`],
    ['VEL', String(character.speed)],
  ];

  const gap = 4;
  const boxWidth = (width - gap * (stats.length - 1)) / stats.length;
  const boxHeight = 19;

  stats.forEach(([label, value], index) => {
    const boxX = x + index * (boxWidth + gap);
    drawBox(doc, boxX, y, boxWidth, boxHeight, COLORS.cardLight, COLORS.goldBright);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.muted);
    doc.setCharSpace(1);
    doc.text(label, boxX + boxWidth / 2, y + 6, { align: 'center' });
    doc.setCharSpace(0);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(...COLORS.ink);
    doc.text(toPrintableText(value), boxX + boxWidth / 2, y + 15, { align: 'center' });
  });

  return y + boxHeight + 6;
};

const drawAbilities = (
  doc: jsPDF,
  character: DraftCharacter,
  x: number,
  y: number,
  width: number,
): number => {
  const abilities = character.abilities ?? [];
  const gap = 3;
  const boxWidth = (width - gap * (abilities.length - 1)) / Math.max(abilities.length, 1);
  const boxHeight = 19;

  abilities.forEach((ability, index) => {
    const boxX = x + index * (boxWidth + gap);
    drawBox(doc, boxX, y, boxWidth, boxHeight, COLORS.card, COLORS.border);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...COLORS.gold);
    doc.text(ability.name, boxX + boxWidth / 2, y + 6, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...COLORS.ink);
    const modifier = ability.modifier >= 0 ? `+${ability.modifier}` : String(ability.modifier);
    doc.text(modifier, boxX + boxWidth / 2, y + 14, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.muted);
    doc.text(String(ability.score), boxX + boxWidth / 2, y + 17.5, { align: 'center' });
  });

  return y + boxHeight + 6;
};

const measureSkills = (doc: jsPDF, character: DraftCharacter): number => {
  const skills = character.skills ?? [];
  if (skills.length === 0) return 0;
  return 6 + skills.length * 5;
};

const drawSkills = (
  doc: jsPDF,
  character: DraftCharacter,
  column: Column,
): number => {
  const skills = character.skills ?? [];
  if (skills.length === 0) return column.y;

  let cursor = drawSectionTitle(doc, 'Habilidades', column.x, column.y, column.width);

  skills.forEach((skill) => {
    const total = calculateSkillTotal(
      skill.baseModifier,
      skill.proficient,
      skill.expertise,
      character.proficiencyBonus,
    );
    const marks = skill.expertise ? '**' : skill.proficient ? '*' : '';

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...COLORS.ink);
    doc.text(toPrintableText(skill.name), column.x, cursor);

    doc.setTextColor(...COLORS.muted);
    doc.text(skill.ability, column.x + column.width * 0.55, cursor, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.gold);
    const value = `${total >= 0 ? '+' : ''}${total}${marks ? ` ${marks}` : ''}`;
    doc.text(value, column.x + column.width, cursor, { align: 'right' });

    cursor += 5;
  });

  return cursor + 3;
};

interface Feature {
  title: string;
  description: string;
}

const measureFeatures = (doc: jsPDF, features: Feature[], width: number): number => {
  if (features.length === 0) return 0;

  return features.reduce((height, feature) => {
    const titleLines = countLines(doc, feature.title, width);
    const descriptionLines = countLines(doc, feature.description, width);
    return height + titleLines * LINE_HEIGHT + descriptionLines * 3.2 + 2;
  }, 6);
};

const drawFeatures = (
  doc: jsPDF,
  title: string,
  features: Feature[],
  column: Column,
): number => {
  if (features.length === 0) return column.y;

  let cursor = drawSectionTitle(doc, title, column.x, column.y, column.width);

  features.forEach((feature) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.gold);
    const titleLines = doc.splitTextToSize(toPrintableText(feature.title), column.width) as string[];
    doc.text(titleLines, column.x, cursor);
    cursor += titleLines.length * LINE_HEIGHT;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...COLORS.ink);
    const descriptionLines = doc.splitTextToSize(
      toPrintableText(feature.description),
      column.width,
    ) as string[];
    doc.text(descriptionLines, column.x, cursor + 1);
    cursor += descriptionLines.length * 3.2 + 2;
  });

  return cursor;
};

const drawNotes = (doc: jsPDF, character: DraftCharacter, column: Column): number => {
  if (!character.notes?.trim()) return column.y;

  let cursor = drawSectionTitle(doc, 'Notas', column.x, column.y, column.width);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.ink);
  const lines = doc.splitTextToSize(toPrintableText(character.notes), column.width) as string[];
  doc.text(lines, column.x, cursor);
  cursor += lines.length * 3.4;

  return cursor;
};

const toFeatures = (features?: { title: string; description: string }[]): Feature[] =>
  (features ?? []).map(({ title, description }) => ({ title, description }));

/** Builds the sheet of a character as a PDF file. */
export const buildCharacterPdf = async (character: DraftCharacter): Promise<Blob> => {
  const { jsPDF: JsPdf } = await import('jspdf');
  const doc = new JsPdf({ unit: 'mm', format: 'a4', orientation: 'portrait' });

  drawPage(doc);

  const left: Column = { x: MARGIN, y: MARGIN + 4, width: COLUMN_WIDTH };
  const right: Column = { x: MARGIN + COLUMN_WIDTH + COLUMN_GAP, y: MARGIN + 4, width: COLUMN_WIDTH };

  let y = drawHeader(doc, character, MARGIN, MARGIN + 4, CONTENT_WIDTH);
  y = drawStats(doc, character, MARGIN, y, CONTENT_WIDTH);
  y = drawAbilities(doc, character, MARGIN, y, CONTENT_WIDTH);
  left.y = y;
  right.y = y;

  const classFeatures = toFeatures(character.classFeatures);
  const racialTraits = toFeatures(character.racialTraits);
  const proficiencies = toFeatures(character.proficiencies);
  const equipment = toFeatures(character.equipment);

  const sections: { column: Column; measure: () => number; draw: () => number }[] = [
    {
      column: left,
      measure: () => measureSkills(doc, character),
      draw: () => drawSkills(doc, character, left),
    },
    {
      column: right,
      measure: () => measureFeatures(doc, classFeatures, right.width),
      draw: () => drawFeatures(doc, 'Rasgos de clase', classFeatures, right),
    },
    {
      column: left,
      measure: () => measureFeatures(doc, racialTraits, left.width),
      draw: () => drawFeatures(doc, 'Rasgos raciales', racialTraits, left),
    },
    {
      column: right,
      measure: () => measureFeatures(doc, proficiencies, right.width),
      draw: () => drawFeatures(doc, 'Competencias', proficiencies, right),
    },
    {
      column: left,
      measure: () => measureFeatures(doc, equipment, left.width),
      draw: () => drawFeatures(doc, 'Equipo', equipment, left),
    },
    {
      column: right,
      measure: () =>
        character.notes?.trim()
          ? 6 + countLines(doc, character.notes, right.width) * 3.4
          : 0,
      draw: () => drawNotes(doc, character, right),
    },
  ];

  sections.forEach((section) => {
    const height = section.measure();
    if (height === 0) return;

    if (section.column.y + height > PAGE.height - MARGIN) {
      doc.addPage();
      drawPage(doc);
      left.y = MARGIN + 4;
      right.y = MARGIN + 4;
    }

    section.column.y = section.draw();
  });

  return doc.output('blob');
};
