import type { IconType } from 'react-icons';

import type { CharacterFeature } from '@/types/character';

export type DetailField =
  | 'classFeatures'
  | 'racialTraits'
  | 'proficiencies'
  | 'equipment';

export interface DetailBlock {
  field: DetailField;
  icon: IconType;
  title: string;
  placeholder?: string;
}

export const hasDetailContent = (
  value: CharacterFeature[] | string | undefined
): boolean => {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return Boolean(value?.trim());
};
