import { IconType } from "react-icons/lib";

export type AbilityName = 'FUE' | 'DES' | 'CON' | 'INT' | 'SAB' | 'CAR';

export interface Ability {
  name: AbilityName;
  score: number;
  modifier: number;
  savingThrowProficient: boolean;
}

export interface Skill {
  id: string;
  name: string;
  ability: AbilityName;
  baseModifier: number;
  proficient: boolean;
  expertise: boolean;
}

export type ConditionName = 'INSPIRADA' | 'DESMORALIZADA' | 'AGOTADA' | 'ENVENENADA';

export interface Condition {
  name: ConditionName;
  active: boolean;
  description: string;
}

export interface CharacterFeature {
  id: string;
  title: string;
  description: string;
  icon: IconType;
}

export interface Character {
  name: string;
  race: string;
  className: string;
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
  abilities: Ability[];
  skills: Skill[];
  classFeatures: CharacterFeature[];
  racialTraits: CharacterFeature[];
  proficiencies: CharacterFeature[];
  equipment: CharacterFeature[];
  conditions: Condition[];
  notes: string;
}

export const calculateModifier = (score: number): number => {
  return Math.floor((score - 10) / 2);
};

export const calculateSkillTotal = (
  baseModifier: number,
  proficient: boolean,
  expertise: boolean,
  proficiencyBonus: number
): number => {
  let total = baseModifier;
  if (proficient) total += proficiencyBonus;
  if (expertise) total += proficiencyBonus;
  return total;
};
