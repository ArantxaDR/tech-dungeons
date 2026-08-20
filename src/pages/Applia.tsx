import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { Character } from '@/types/character';
import { getDefaultApplia } from '@/data/characterPresets';
import { CharacterSheet } from '@/components/CharacterSheet';
import appliaAvatar from '@/assets/avatars/mobile.webp';

const Applia = () => {
  const [character, setCharacter] = useLocalStorageState<Character>(
    'applia-character',
    getDefaultApplia()
  );

  return (
    <CharacterSheet 
      character={character} 
      setCharacter={setCharacter}
      avatarSrc={appliaAvatar}
    />
  );
};

export default Applia;
