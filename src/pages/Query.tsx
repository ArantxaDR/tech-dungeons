
import { useState } from 'react';
import { Character } from '@/types/character';
import { getDefaultQuery } from '@/data/characterPresets';
import { CharacterSheet } from '@/components/CharacterSheet';
import bitgrunAvatar from '@/assets/avatars/back.webp';

const Query = () => {
  const [character, setCharacter] = useState<Character>(getDefaultQuery());

  return (
    <CharacterSheet
      character={character}
      setCharacter={setCharacter}
      avatarSrc={bitgrunAvatar}
    />
  );
};

export default Query;
