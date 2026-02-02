import { Character } from '@/types/character';
import { HeaderSection } from './HeaderSection';
import { AbilitiesSection } from './AbilitiesSection';
import { SkillsSection } from './SkillsSection';
import { ConditionsSection } from './ConditionsSection';
import { TextBlock } from './TextBlock';
import { CharacterNav } from './CharacterNav';

interface CharacterSheetProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  avatarSrc?: string;
}

export const CharacterSheet = ({ character, setCharacter, avatarSrc }: CharacterSheetProps) => {
  const updateTextField = (field: keyof Character) => (value: string) => {
    setCharacter(prev => ({ ...prev, [field]: value }));
  };

  // Determine quest subtitle based on character class
  const questSubtitle = character.className.toLowerCase().includes('bárbar') 
    ? 'Backend Developer Quest' 
    : 'Frontend Developer Quest';

  return (
    <div className="max-w-6xl mx-auto p-2 sm:p-4 space-y-4 sm:space-y-6 overflow-x-hidden">
      {/* Character Navigation */}
      <CharacterNav />
      
      {/* Title */}
      <header className="text-center py-4">
        <h1 className="font-pixel text-xl md:text-2xl text-primary text-glow-primary mb-2">
          HOJA DE PERSONAJE
        </h1>
        <p className="text-secondary text-glow-secondary">
          {questSubtitle}
        </p>
      </header>

      {/* Header Section */}
      <HeaderSection character={character} setCharacter={setCharacter} avatarSrc={avatarSrc} />

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <AbilitiesSection character={character} setCharacter={setCharacter} />
          <SkillsSection character={character} setCharacter={setCharacter} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <ConditionsSection character={character} setCharacter={setCharacter} />
          
          <TextBlock
            title="Rasgos de Clase"
            icon="🎭"
            value={character.classFeatures}
            onChange={updateTextField('classFeatures')}
            placeholder="Escribe los rasgos de clase aquí..."
          />
          
          <TextBlock
            title="Rasgos Raciales"
            icon="🧝"
            value={character.racialTraits}
            onChange={updateTextField('racialTraits')}
            placeholder="Escribe los rasgos raciales aquí..."
          />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <TextBlock
          title="Competencias"
          icon="📚"
          value={character.proficiencies}
          onChange={updateTextField('proficiencies')}
          placeholder="Armas, armaduras, herramientas, idiomas..."
        />
        
        <TextBlock
          title="Equipo"
          icon="🎒"
          value={character.equipment}
          onChange={updateTextField('equipment')}
          placeholder="Lista tu equipo aquí..."
        />
      </div>

      {/* Notes */}
      <TextBlock
        title="Notas"
        icon="📝"
        value={character.notes}
        onChange={updateTextField('notes')}
        placeholder="Apuntes de sesión, objetivos, ideas..."
      />

      {/* Footer */}
      <footer className="text-center py-6 text-muted-foreground text-sm">
        <p>Los cambios se guardan automáticamente en tu navegador ✨</p>
      </footer>
    </div>
  );
};
