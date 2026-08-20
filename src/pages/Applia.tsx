import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { Character, getDefaultApplia } from '@/types/character';
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
