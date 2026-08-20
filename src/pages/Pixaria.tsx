import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { Character, getDefaultPixaria } from '@/types/character';
import { CharacterSheet } from '@/components/CharacterSheet';
import pixariaAvatar from '@/assets/avatars/uxui.webp';

const Pixaria = () => {
  const [character, setCharacter] = useLocalStorageState<Character>(
    'pixaria-character',
    getDefaultPixaria()
  );

  return (
    <CharacterSheet
      character={character}
      setCharacter={setCharacter}
      avatarSrc={pixariaAvatar}
    />
  );
};

export default Pixaria;
