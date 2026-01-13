import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { Character, getDefaultFrontella } from '@/types/character';
import { CharacterSheet } from '@/components/CharacterSheet';
import frontellaAvatar from '@/assets/frontella-avatar.png';

const Index = () => {
  const [character, setCharacter] = useLocalStorageState<Character>(
    'frontella-character',
    getDefaultFrontella()
  );

  return (
    <div className="min-h-screen bg-background">
      <CharacterSheet 
        character={character} 
        setCharacter={setCharacter} 
        avatarSrc={frontellaAvatar}
      />
    </div>
  );
};

export default Index;
