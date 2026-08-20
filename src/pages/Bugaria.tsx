import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { Character } from '@/types/character';
import { getDefaultBugaria } from '@/data/characterPresets';
import { CharacterSheet } from '@/components/CharacterSheet';
import bugariaAvatar from '@/assets/avatars/qa.webp';

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
