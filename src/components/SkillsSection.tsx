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
      
      <div className="space-y-1">
        {/* Header */}
        <div className="flex items-center gap-3 py-2 px-3 text-xs text-muted-foreground uppercase border-b border-border/50">
          <span className="w-6">P</span>
          <span className="w-6">E</span>
          <span className="flex-1">Habilidad</span>
          <span className="w-12 text-center">Atr</span>
          <span className="w-16 text-center">Total</span>
        </div>
        
        {character.skills.map((skill, index) => {
          const total = calculateSkillTotal(
            skill.baseModifier,
            skill.proficient,
            skill.expertise,
            character.proficiencyBonus
          );
          
          return (
            <div key={skill.id} className="skill-row">
              {/* Proficiency */}
              <button
                onClick={() => {
                  if (skill.expertise) {
                    // If expertise, remove expertise
                    updateSkill(index, { expertise: false });
                  } else if (skill.proficient) {
                    // If proficient but not expertise, remove proficiency
                    updateSkill(index, { proficient: false, expertise: false });
                  } else {
                    // If not proficient, add proficiency
                    updateSkill(index, { proficient: true });
                  }
                }}
                className="w-6"
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
                className="w-6"
                title="Expertise (doble competencia)"
                disabled={!skill.proficient}
              >
                <Sparkles 
                  className={`proficiency-star ${skill.expertise ? 'proficiency-star-active fill-current' : 'proficiency-star-inactive'} ${!skill.proficient ? 'opacity-30' : ''}`}
                />
              </button>
              
              {/* Skill Name */}
              <span className="flex-1 text-foreground">
                {skill.name}
              </span>
              
              {/* Ability */}
              <span className="w-12 text-center text-muted-foreground text-sm">
                {skill.ability}
              </span>
              
              {/* Total */}
              <span 
                className={`w-16 text-center font-bold ${getModifierClass(total)}`}
                style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '12px' }}
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
