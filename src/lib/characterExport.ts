import type { DraftCharacter } from '@/data/customCharacters';
import { buildCharacterPdf } from '@/lib/characterPdf';
import { downloadBlob, toFileName } from '@/lib/download';

/** The character without the React icons, ready to be stored in a file. */
export interface ExportedCharacter {
  name: string;
  race: string;
  className: string;
  role: string;
  level: number;
  background: string;
  alignment: string;
  xp: number;
  hp: number;
  hitDie: string;
  armorClass: number;
  initiative: number;
  proficiencyBonus: number;
  speed: number;
  abilities: DraftCharacter['abilities'];
  skills: DraftCharacter['skills'];
  classFeatures: { id: string; title: string; description: string }[];
  racialTraits: { id: string; title: string; description: string }[];
  proficiencies: { id: string; title: string; description: string }[];
  equipment: { id: string; title: string; description: string }[];
  conditions: DraftCharacter['conditions'];
  notes: string;
  imageDataUrl?: string;
}

const toPlainFeatures = (features: DraftCharacter['classFeatures']) =>
  features.map(({ id, title, description }) => ({ id, title, description }));

export const toExportableCharacter = (character: DraftCharacter): ExportedCharacter => ({
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
  classFeatures: toPlainFeatures(character.classFeatures),
  racialTraits: toPlainFeatures(character.racialTraits),
  proficiencies: toPlainFeatures(character.proficiencies),
  equipment: toPlainFeatures(character.equipment),
  conditions: character.conditions,
  notes: character.notes,
  imageDataUrl: character.imageDataUrl,
});

export interface CharacterExportFile {
  format: 'dungeons-and-tech-character';
  version: number;
  exportedAt: string;
  character: ExportedCharacter;
}

/** Downloads the character as a JSON file, ready to be backed up. */
export const exportCharacterJson = (character: DraftCharacter): void => {
  const payload: CharacterExportFile = {
    format: 'dungeons-and-tech-character',
    version: 1,
    exportedAt: new Date().toISOString(),
    character: toExportableCharacter(character),
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  });

  downloadBlob(blob, `${toFileName(character.name)}.json`);
};

/** Downloads the character sheet as a PDF file. */
export const exportCharacterPdf = async (character: DraftCharacter): Promise<void> => {
  const blob = await buildCharacterPdf(character);
  downloadBlob(blob, `${toFileName(character.name)}.pdf`);
};
