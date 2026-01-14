import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { Character, getDefaultBugaria } from '@/types/character';
import { CharacterSheet } from '@/components/CharacterSheet';
import bugariaAvatar from '@/assets/bugaria-avatar.png';

const Bugaria = () => {
  const [character, setCharacter] = useLocalStorageState<Character>(
    'bugaria-character',
    getDefaultBugaria()
  );

  return (
    <CharacterSheet 
      character={character} 
      setCharacter={setCharacter}
      avatarSrc={bugariaAvatar}
    />
  );
};

export default Bugaria;
