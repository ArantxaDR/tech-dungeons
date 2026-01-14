import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { Character, getDefaultStackia } from '@/types/character';
import { CharacterSheet } from '@/components/CharacterSheet';
import stackiaAvatar from '@/assets/stackia-avatar.png';

const Stackia = () => {
  const [character, setCharacter] = useLocalStorageState<Character>(
    'stackia-character',
    getDefaultStackia()
  );

  return (
    <div className="min-h-screen bg-background">
      <CharacterSheet 
        character={character} 
        setCharacter={setCharacter}
        avatarSrc={stackiaAvatar}
      />
    </div>
  );
};

export default Stackia;
