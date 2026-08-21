import { useState } from "react";
import { Character } from "@/types/character";
import { getDefaultPixaria } from "@/data/characterPresets";
import { CharacterSheet } from "@/components/CharacterSheet";
import pixariaAvatar from "@/assets/avatars/uxui.webp";

const Pixaria = () => {
  const [character, setCharacter] = useState<Character>(getDefaultPixaria());

  return (
    <CharacterSheet
      character={character}
      setCharacter={setCharacter}
      avatarSrc={pixariaAvatar}
    />
  );
};

export default Pixaria;
