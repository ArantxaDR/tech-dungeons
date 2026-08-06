import { Character } from '@/types/character';
import { HeaderSection } from './HeaderSection';
import { AbilitiesSection } from './AbilitiesSection';
import { SkillsSection } from './SkillsSection';
import { ConditionsSection } from './ConditionsSection';
import { TextBlock } from './TextBlock';
import { CharacterNav } from './CharacterNav';
import { BorderDivider } from './BorderDivider';
import { PageMargins } from './PageMargins';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type DetailField = 'classFeatures' | 'racialTraits' | 'proficiencies' | 'equipment';

const DETAIL_BLOCKS: Array<{ field: DetailField; icon: string; title: string; placeholder: string }> = [
  { field: 'classFeatures', icon: '🎭', title: 'Rasgos de Clase', placeholder: 'Escribe los rasgos de clase aquí...' },
  { field: 'racialTraits', icon: '🧝', title: 'Rasgos Raciales', placeholder: 'Escribe los rasgos raciales aquí...' },
  { field: 'proficiencies', icon: '📚', title: 'Competencias', placeholder: 'Armas, armaduras, herramientas, idiomas...' },
  { field: 'equipment', icon: '🎒', title: 'Equipo', placeholder: 'Lista tu equipo aquí...' },
];

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
    <PageMargins>
      <div className="max-w-6xl w-full mx-auto p-2 sm:p-4 space-y-4 sm:space-y-6 overflow-x-hidden">
        {/* Character Navigation */}
        <CharacterNav />

        {/* Title */}
        <header className="text-center py-4">
          <h1 className="font-display text-xl md:text-2xl text-primary text-glow-primary mb-2">
            HOJA DE PERSONAJE
          </h1>
          <p className="text-secondary">
            {questSubtitle}
          </p>
        </header>

        <BorderDivider variant="interlace" className="mb-2" />

        {/* Header Section */}
        <HeaderSection character={character} setCharacter={setCharacter} avatarSrc={avatarSrc} readOnly />

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <AbilitiesSection character={character} setCharacter={setCharacter} readOnly />
            <SkillsSection character={character} setCharacter={setCharacter} readOnly />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <ConditionsSection character={character} setCharacter={setCharacter} readOnly />

            <div className="rpg-card">
              <h2 className="section-title">📜 Detalles</h2>
              <Accordion type="multiple" defaultValue={['classFeatures']}>
                {DETAIL_BLOCKS.map(block => (
                  <AccordionItem key={block.field} value={block.field}>
                    <AccordionTrigger>{block.icon} {block.title}</AccordionTrigger>
                    <AccordionContent>
                      <textarea
                        value={character[block.field]}
                        readOnly
                        placeholder={block.placeholder}
                        className="field-textarea"
                        aria-label={block.title}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

        {/* Notes */}
        <TextBlock
          title="Notas"
          icon="📝"
          value={character.notes}
          onChange={updateTextField('notes')}
          placeholder="Apuntes de sesión, objetivos, ideas..."
          readOnly
        />

        <BorderDivider variant="vine" className="mt-2" />

        {/* Footer */}
        <footer className="text-center py-6 text-muted-foreground text-sm">
          <p>Hoja de referencia — no editable. Crea tu propio personaje para personalizarla ✨</p>
        </footer>
      </div>
    </PageMargins>
  );
};
