
import { useState } from 'react';
import { Character } from '@/types/character';
import { getDefaultStackia } from '@/data/characterPresets';
import { CharacterSheet } from '@/components/CharacterSheet';
import stackiaAvatar from '@/assets/avatars/fullstack.webp';

const Stackia = () => {
  const [character, setCharacter] = useState<Character>(getDefaultStackia());

  return (
    <CharacterSheet
      character={character}
      setCharacter={setCharacter}
      avatarSrc={stackiaAvatar}
    />
  );
};

export default Stackia;
