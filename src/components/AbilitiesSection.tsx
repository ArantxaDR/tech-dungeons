import { Character, Ability, calculateModifier } from '@/types/character';
import { Star } from 'lucide-react';

interface AbilitiesSectionProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
}

const ABILITY_NAMES: Record<string, string> = {
  FUE: 'Fuerza',
  DES: 'Destreza',
  CON: 'Constitución',
  INT: 'Inteligencia',
  SAB: 'Sabiduría',
  CAR: 'Carisma',
};

export const AbilitiesSection = ({ character, setCharacter }: AbilitiesSectionProps) => {
  const updateAbility = (index: number, updates: Partial<Ability>) => {
    setCharacter(prev => {
      const newAbilities = [...prev.abilities];
      const ability = { ...newAbilities[index], ...updates };
      
      // Recalculate modifier if score changed
      if (updates.score !== undefined) {
        ability.modifier = calculateModifier(updates.score);
      }
      
      newAbilities[index] = ability;
      
      // Update skill base modifiers
      const newSkills = prev.skills.map(skill => {
        const relatedAbility = newAbilities.find(a => a.name === skill.ability);
        if (relatedAbility) {
          return { ...skill, baseModifier: relatedAbility.modifier };
        }
        return skill;
      });
      
      return { ...prev, abilities: newAbilities, skills: newSkills };
    });
  };

  const formatModifier = (mod: number) => {
    if (mod >= 0) return `+${mod}`;
    return `${mod}`;
  };

  const getModifierClass = (mod: number) => {
    if (mod > 0) return 'stat-modifier-positive';
    if (mod < 0) return 'stat-modifier-negative';
    return 'stat-modifier-neutral';
  };

  return (
    <div className="rpg-card">
      <h2 className="section-title">⚔️ Atributos</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {character.abilities.map((ability, index) => (
          <div key={ability.name} className="stat-box relative">
            {/* Saving Throw Indicator */}
            <button
              onClick={() => updateAbility(index, { savingThrowProficient: !ability.savingThrowProficient })}
              className="absolute top-1 right-1"
              title="Competencia en tirada de salvación"
            >
              <Star 
                className={`proficiency-star ${ability.savingThrowProficient ? 'proficiency-star-active fill-current' : 'proficiency-star-inactive'}`}
              />
            </button>
            
            <span className="text-xs text-muted-foreground font-bold mb-1">
              {ability.name}
            </span>
            <span className="text-[10px] text-muted-foreground/70 mb-2">
              {ABILITY_NAMES[ability.name]}
            </span>
            
            <span className={`stat-modifier ${getModifierClass(ability.modifier)}`}>
              {formatModifier(ability.modifier)}
            </span>
            
            <input
              type="number"
              min={1}
              max={30}
              value={ability.score}
              onChange={(e) => updateAbility(index, { score: parseInt(e.target.value) || 10 })}
              className="w-12 bg-muted/50 border border-border rounded text-center text-sm mt-2 focus:outline-none focus:border-secondary"
            />
            
            {ability.savingThrowProficient && (
              <span className="text-[10px] text-accent mt-1">
                Salv: {formatModifier(ability.modifier + character.proficiencyBonus)}
              </span>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-center">
        <div className="stat-box px-6">
          <span className="text-xs text-muted-foreground uppercase">Bonus de Competencia</span>
          <span className="stat-modifier stat-modifier-positive text-2xl">
            +{character.proficiencyBonus}
          </span>
        </div>
      </div>
    </div>
  );
};
