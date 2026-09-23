
import { useState } from 'react';
import { Character } from '@/types/character';
import { getDefaultTestina } from '@/data/characterPresets';
import { CharacterSheet } from '@/components/CharacterSheet';
import bugariaAvatar from '@/assets/avatars/qa.webp';

const Testina = () => {
  const [character, setCharacter] = useState<Character>(getDefaultTestina());

  return (
    <CharacterSheet 
      character={character} 
      setCharacter={setCharacter}
      avatarSrc={bugariaAvatar}
    />
  );
};

export default Testina;
