
import { useState } from 'react';
import { Character } from '@/types/character';
import { getDefaultBitgrun } from '@/data/characterPresets';
import { CharacterSheet } from '@/components/CharacterSheet';
import bitgrunAvatar from '@/assets/avatars/back.webp';

const Bitgrun = () => {
  const [character, setCharacter] = useState<Character>(getDefaultBitgrun());

  return (
    <CharacterSheet
      character={character}
      setCharacter={setCharacter}
      avatarSrc={bitgrunAvatar}
    />
  );
};

export default Bitgrun;
