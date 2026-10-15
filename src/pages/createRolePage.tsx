import { useState } from 'react';

import type { Character } from '@/types/character';
import { CharacterSheet } from '@/components/CharacterSheet';

export function createRolePage(
  getDefault: () => Character,
  avatarSrc: string
): () => JSX.Element {
  const Page = () => {
    const [character, setCharacter] = useState<Character>(getDefault());

    return (
      <CharacterSheet
        character={character}
        setCharacter={setCharacter}
        avatarSrc={avatarSrc}
      />
    );
  };

  Page.displayName = getDefault.name || 'RolePage';

  return Page;
}
