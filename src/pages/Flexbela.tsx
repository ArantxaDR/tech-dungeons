import { useState } from "react";
import { Character } from "@/types/character";
import { getDefaultFlexbela } from "@/data/characterPresets";
import { CharacterSheet } from "@/components/CharacterSheet";
import frontellaAvatar from "@/assets/avatars/front.webp";

const Flexbela = () => {
  const [character, setCharacter] = useState<Character>(getDefaultFlexbela());

  return (
    <CharacterSheet
      character={character}
      setCharacter={setCharacter}
      avatarSrc={frontellaAvatar}
    />
  );
};

export default Flexbela;
