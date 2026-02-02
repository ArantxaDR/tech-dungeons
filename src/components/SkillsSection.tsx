import { Character, Skill, calculateSkillTotal } from '@/types/character';
import { Star, Sparkles } from 'lucide-react';

interface SkillsSectionProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
}

export const SkillsSection = ({ character, setCharacter }: SkillsSectionProps) => {
  const updateSkill = (index: number, updates: Partial<Skill>) => {
    setCharacter(prev => {
      const newSkills = [...prev.skills];
      newSkills[index] = { ...newSkills[index], ...updates };
      return { ...prev, skills: newSkills };
    });
  };

  const formatModifier = (mod: number) => {
    if (mod >= 0) return `+${mod}`;
    return `${mod}`;
  };

  const getModifierClass = (mod: number) => {
    if (mod > 0) return 'text-stat-positive';
    if (mod < 0) return 'text-stat-negative';
    return 'text-stat-neutral';
  };

  return (
    <div className="rpg-card">
      <h2 className="section-title">🎯 Habilidades</h2>
      
      <div className="space-y-1 overflow-x-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-3 py-2 px-2 sm:px-3 text-xs text-muted-foreground uppercase border-b border-border/50">
          <span className="w-5 sm:w-6 flex-shrink-0">P</span>
          <span className="w-5 sm:w-6 flex-shrink-0">E</span>
          <span className="flex-1 min-w-0 truncate">Habilidad</span>
          <span className="w-8 sm:w-12 text-center flex-shrink-0 hidden sm:block">Atr</span>
          <span className="w-12 sm:w-16 text-center flex-shrink-0">Total</span>
        </div>
        
        {character.skills.map((skill, index) => {
          const total = calculateSkillTotal(
            skill.baseModifier,
            skill.proficient,
            skill.expertise,
            character.proficiencyBonus
          );
          
          return (
            <div key={skill.id} className="skill-row gap-2 sm:gap-3 px-2 sm:px-3">
              {/* Proficiency */}
              <button
                onClick={() => {
                  if (skill.expertise) {
                    updateSkill(index, { expertise: false });
                  } else if (skill.proficient) {
                    updateSkill(index, { proficient: false, expertise: false });
                  } else {
                    updateSkill(index, { proficient: true });
                  }
                }}
                className="w-5 sm:w-6 flex-shrink-0"
                title="Competencia"
              >
                <Star 
                  className={`proficiency-star ${skill.proficient ? 'proficiency-star-active fill-current' : 'proficiency-star-inactive'}`}
                />
              </button>
              
              {/* Expertise */}
              <button
                onClick={() => {
                  if (skill.proficient) {
                    updateSkill(index, { expertise: !skill.expertise });
                  }
                }}
                className="w-5 sm:w-6 flex-shrink-0"
                title="Expertise (doble competencia)"
                disabled={!skill.proficient}
              >
                <Sparkles 
                  className={`proficiency-star ${skill.expertise ? 'proficiency-star-active fill-current' : 'proficiency-star-inactive'} ${!skill.proficient ? 'opacity-30' : ''}`}
                />
              </button>
              
              {/* Skill Name */}
              <span className="flex-1 min-w-0 truncate text-foreground text-sm sm:text-base">
                {skill.name}
              </span>
              
              {/* Ability - hidden on mobile */}
              <span className="w-8 sm:w-12 text-center text-muted-foreground text-sm flex-shrink-0 hidden sm:block">
                {skill.ability}
              </span>
              
              {/* Total */}
              <span 
                className={`w-12 sm:w-16 text-center font-bold flex-shrink-0 ${getModifierClass(total)}`}
                style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '11px' }}
              >
                {formatModifier(total)}
              </span>
            </div>
          );
        })}
      </div>
      
      <p className="text-xs text-muted-foreground mt-4 text-center">
        ⭐ = Competencia (+{character.proficiencyBonus}) | ✨ = Expertise (+{character.proficiencyBonus * 2})
      </p>
    </div>
  );
};
