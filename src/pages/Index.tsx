import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { Character, getDefaultCharacter } from '@/types/character';
import { CharacterSheet } from '@/components/CharacterSheet';

const Index = () => {
  const [character, setCharacter] = useLocalStorageState<Character>(
    'frontella-character',
    getDefaultCharacter()
  );

  return (
    <div className="min-h-screen bg-background">
      <CharacterSheet character={character} setCharacter={setCharacter} />
    </div>
  );
};

export default Index;
