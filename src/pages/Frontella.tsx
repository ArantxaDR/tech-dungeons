import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { Character } from '@/types/character';
import { getDefaultFrontella } from '@/data/characterPresets';
import { CharacterSheet } from '@/components/CharacterSheet';
import frontellaAvatar from '@/assets/avatars/front.webp';

const Frontella = () => {
  const [character, setCharacter] = useLocalStorageState<Character>(
    'frontella-character',
    getDefaultFrontella()
  );

  return (
    <CharacterSheet
      character={character}
      setCharacter={setCharacter}
      avatarSrc={frontellaAvatar}
    />
  );
};

export default Frontella;
