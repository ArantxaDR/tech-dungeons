import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AbilitiesSection } from '@/components/AbilitiesSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ConditionsSection } from '@/components/ConditionsSection';
import { Character } from '@/types/character';
import { DraftCharacter } from '@/data/customCharacters';
import { ROLES } from '@/data/characterPresets';
import demonImg from '@/assets/demon.webp';

interface CharacterPreviewProps {
  character: DraftCharacter;
  setCharacter: React.Dispatch<React.SetStateAction<DraftCharacter>>;
}

type DetailField = 'classFeatures' | 'racialTraits' | 'proficiencies' | 'equipment';

const DETAIL_BLOCKS: Array<{ field: DetailField; icon: string; title: string }> = [
  { field: 'classFeatures', icon: '🎭', title: 'Rasgos de Clase' },
  { field: 'racialTraits', icon: '🧝', title: 'Rasgos Raciales' },
  { field: 'proficiencies', icon: '📚', title: 'Competencias' },
  { field: 'equipment', icon: '🎒', title: 'Equipo' },
];

export const CharacterPreview = ({ character, setCharacter }: CharacterPreviewProps) => {
  const roleLabel = ROLES.find(r => r.value === character.role)?.label || character.role;

  const updateField = <K extends keyof Character>(field: K, value: Character[K]) => {
    setCharacter(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Identity + editable vitals */}
      <div className="rpg-card">
        <h2 className="section-title">👁️ Vista Previa</h2>

        <div className="flex gap-4 items-start">
          {character.imageDataUrl ? (
            <img
              src={character.imageDataUrl}
              alt={character.name}
              className="w-24 h-24 rounded-lg object-cover border-2 border-primary"
            />
          ) : (
            <img
              src={demonImg}
              alt=""
              aria-hidden="true"
              className="w-24 h-24 rounded-lg object-cover border-2 border-dashed border-muted-foreground/30"
            />
          )}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground">
              {character.name || 'Sin nombre'}
            </h3>
            <p className="text-primary font-medium">{roleLabel || 'Sin rol'}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline">{character.race || 'Sin raza'}</Badge>
              <Badge variant="secondary">{character.className || 'Sin clase'}</Badge>
              <Badge>Nivel {character.level}</Badge>
            </div>
          </div>
        </div>

        {/* Editable vitals — same fields as the real character sheet */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-6">
          <div className="stat-box min-w-0">
            <span className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1">HP</span>
            <input
              type="number"
              min={0}
              value={character.hp}
              onChange={(e) => updateField('hp', parseInt(e.target.value) || 0)}
              className="stat-value bg-transparent border-none text-center w-full focus:outline-none text-sm sm:text-lg"
              aria-label="Puntos de golpe"
            />
          </div>
          <div className="stat-box min-w-0">
            <span className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1">CA</span>
            <input
              type="number"
              min={0}
              value={character.armorClass}
              onChange={(e) => updateField('armorClass', parseInt(e.target.value) || 0)}
              className="stat-value bg-transparent border-none text-center w-full focus:outline-none text-sm sm:text-lg"
              aria-label="Clase de armadura"
            />
          </div>
          <div className="stat-box min-w-0">
            <span className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1">Inic.</span>
            <span className="stat-modifier stat-modifier-positive text-sm sm:text-xl">+{character.initiative}</span>
          </div>
          <div className="stat-box min-w-0">
            <span className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1">Vel.</span>
            <input
              type="number"
              min={0}
              value={character.speed}
              onChange={(e) => updateField('speed', parseInt(e.target.value) || 0)}
              className="stat-value bg-transparent border-none text-center w-full focus:outline-none text-sm sm:text-lg"
              aria-label="Velocidad"
            />
          </div>
        </div>
      </div>

      {/* Same editable blocks the real character sheet uses */}
      <AbilitiesSection character={character} setCharacter={setCharacter} />
      <SkillsSection character={character} setCharacter={setCharacter} allowManualSkills />
      <ConditionsSection character={character} setCharacter={setCharacter} />

      {/* Class Features, Racial Traits, Proficiencies & Equipment — collapsed
          by default so the auto-filled preview doesn't scroll on forever. */}
      {DETAIL_BLOCKS.some(block => character[block.field]) && (
        <div className="rpg-card">
          <h2 className="section-title">📜 Detalles</h2>
          <Accordion type="multiple">
            {DETAIL_BLOCKS.filter(block => character[block.field]).map(block => (
              <AccordionItem key={block.field} value={block.field}>
                <AccordionTrigger>{block.icon} {block.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="bg-muted rounded-lg p-4 text-sm whitespace-pre-wrap">
                    {character[block.field]}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
};
