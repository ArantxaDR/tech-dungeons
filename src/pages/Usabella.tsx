import { useState } from "react";
import { Character } from "@/types/character";
import { getDefaultUsabella } from "@/data/characterPresets";
import { CharacterSheet } from "@/components/CharacterSheet";
import pixariaAvatar from "@/assets/avatars/uxui.webp";

const Usabella = () => {
  const [character, setCharacter] = useState<Character>(getDefaultUsabella());

  return (
    <CharacterSheet
      character={character}
      setCharacter={setCharacter}
      avatarSrc={pixariaAvatar}
    />
  );
};

export default Usabella;
