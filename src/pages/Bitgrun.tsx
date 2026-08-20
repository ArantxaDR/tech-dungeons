import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { Character, getDefaultBitgrun } from '@/types/character';
import { CharacterSheet } from '@/components/CharacterSheet';
import bitgrunAvatar from '@/assets/avatars/back.webp';

const Bitgrun = () => {
  const [character, setCharacter] = useLocalStorageState<Character>(
    'bitgrun-character',
    getDefaultBitgrun()
  );

  return (
    <CharacterSheet
      character={character}
      setCharacter={setCharacter}
      avatarSrc={bitgrunAvatar}
    />
  );
};

export default Bitgrun;
