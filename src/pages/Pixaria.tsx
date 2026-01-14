import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { Character, getDefaultPixaria } from '@/types/character';
import { CharacterSheet } from '@/components/CharacterSheet';
import pixariaAvatar from '@/assets/pixaria-avatar.png';

const Pixaria = () => {
  const [character, setCharacter] = useLocalStorageState<Character>(
    'pixaria-character',
    getDefaultPixaria()
  );

  return (
    <div className="min-h-screen bg-background">
      <CharacterSheet 
        character={character} 
        setCharacter={setCharacter}
        avatarSrc={pixariaAvatar}
      />
    </div>
  );
};

export default Pixaria;
