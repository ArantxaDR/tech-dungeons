import { Character, Skill, calculateSkillTotal } from '@/types/character';
import { ALL_SKILLS } from '@/data/characterPresets';
import { GiSparkles as Sparkles, GiRoundStar as Star, GiCrossedBones as X} from 'react-icons/gi';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


interface SkillsSectionProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  /** Creator only: lets the user add/remove skills instead of just the preset's fixed list. */
  allowManualSkills?: boolean;
  readOnly?: boolean;
}

const formatModifier = (mod: number) => (mod >= 0 ? `+${mod}` : `${mod}`);

const getModifierClass = (mod: number) => {
  if (mod > 0) return 'text-stat-positive';
  if (mod < 0) return 'text-stat-negative';
  return 'text-stat-neutral';
};

const slugify = (name: string) =>
  name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-');

export const SkillsSection = ({ character, setCharacter, allowManualSkills, readOnly }: SkillsSectionProps) => {
  const updateSkill = (index: number, updates: Partial<Skill>) => {
    setCharacter(prev => {
      const newSkills = [...prev.skills];
      newSkills[index] = { ...newSkills[index], ...updates };
      return { ...prev, skills: newSkills };
    });
  };

  const addSkill = (name: string) => {
    const def = ALL_SKILLS.find(s => s.name === name);
    if (!def) return;
    const baseModifier = character.abilities.find(a => a.name === def.ability)?.modifier ?? 0;
    setCharacter(prev => ({
      ...prev,
      skills: [...prev.skills, { id: slugify(name), name, ability: def.ability, baseModifier, proficient: false, expertise: false }],
    }));
  };

  const removeSkill = (index: number) => {
    setCharacter(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  };

  const availableSkills = ALL_SKILLS.filter(s => !character.skills.some(sk => sk.name === s.name));

  const indexed = character.skills.map((skill, index) => ({ skill, index }));
  // The 2-column split only has room to breathe at full page width (CharacterSheet).
  // In the creator, this component already lives in a halved column — splitting
  // again there crushes the name column to nothing, so keep it single-column there.
  const columns = allowManualSkills
    ? [indexed]
    : [indexed.slice(0, Math.ceil(indexed.length / 2)), indexed.slice(Math.ceil(indexed.length / 2))];

  const renderColumn = (rows: typeof indexed) => (
    <div className="space-y-1 overflow-x-hidden">
      <div className="flex items-center gap-2 sm:gap-3 py-2 px-2 sm:px-3 text-xs text-muted-foreground uppercase border-b border-border/50">
        <span className="w-6 flex-shrink-0">P</span>
        <span className="w-6 flex-shrink-0">E</span>
        <span className="flex-1 min-w-0 truncate">Habilidad</span>
        <span className="w-8 sm:w-12 text-center flex-shrink-0 hidden sm:block">Atr</span>
        <span className="w-12 sm:w-16 text-center flex-shrink-0">Total</span>
        {allowManualSkills && <span className="w-5 flex-shrink-0" />}
      </div>

      {rows.map(({ skill, index }) => {
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
              disabled={readOnly}
              className="w-6 h-6 flex-shrink-0 flex items-center justify-center disabled:cursor-default"
              title="Competencia"
              aria-label={`Competencia en ${skill.name}`}
              aria-pressed={skill.proficient}
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
              className="w-6 h-6 flex-shrink-0 flex items-center justify-center"
              title="Expertise (doble competencia)"
              aria-label={`Expertise en ${skill.name}`}
              aria-pressed={skill.expertise}
              disabled={readOnly || !skill.proficient}
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
              className={`stat-modifier w-12 sm:w-16 text-center flex-shrink-0 text-sm ${getModifierClass(total)}`}
            >
              {formatModifier(total)}
            </span>

            {allowManualSkills && (
              <button
                onClick={() => removeSkill(index)}
                className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-muted-foreground hover:text-destructive"
                title="Quitar habilidad"
                aria-label={`Quitar ${skill.name}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="rpg-card">
      <h2 className="section-title">Habilidades</h2>

      <div className={allowManualSkills ? undefined : 'grid sm:grid-cols-2 sm:gap-x-6'}>
        {columns.map((rows, i) => (
          <div key={i}>{renderColumn(rows)}</div>
        ))}
      </div>

      {allowManualSkills && availableSkills.length > 0 && (
        <div className="mt-4">
          <Select value="" onValueChange={addSkill}>
            <SelectTrigger className="rounded-none" aria-label="Añadir habilidad">
              <SelectValue placeholder="+ Añadir habilidad..." />
            </SelectTrigger>
            <SelectContent>
              {availableSkills.map(s => (
                <SelectItem key={s.name} value={s.name}>
                  {s.name} ({s.ability})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <p className="flex text-md text-muted-foreground mt-4 justify-center items-center">
        <Star /> = Competencia (+{character.proficiencyBonus}) |  <Sparkles className='ml-1'/> = Expertise (+{character.proficiencyBonus * 2})
      </p>
    </div>
  );
};
