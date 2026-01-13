import { Character, Condition } from '@/types/character';

interface ConditionsSectionProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
}

const CONDITION_ICONS: Record<string, string> = {
  INSPIRADA: '✨',
  DESMORALIZADA: '😔',
  AGOTADA: '💤',
  ENVENENADA: '☠️',
};

const CONDITION_COLORS: Record<string, string> = {
  INSPIRADA: 'border-secondary bg-secondary/20 text-secondary',
  DESMORALIZADA: 'border-destructive bg-destructive/20 text-destructive',
  AGOTADA: 'border-accent bg-accent/20 text-accent-foreground',
  ENVENENADA: 'border-purple-500 bg-purple-500/20 text-purple-400',
};

export const ConditionsSection = ({ character, setCharacter }: ConditionsSectionProps) => {
  const toggleCondition = (index: number) => {
    setCharacter(prev => {
      const newConditions = [...prev.conditions];
      newConditions[index] = { 
        ...newConditions[index], 
        active: !newConditions[index].active 
      };
      return { ...prev, conditions: newConditions };
    });
  };

  return (
    <div className="rpg-card">
      <h2 className="section-title">🎭 Condiciones</h2>
      
      <div className="space-y-3">
        {character.conditions.map((condition, index) => (
          <button
            key={condition.name}
            onClick={() => toggleCondition(index)}
            className={`w-full text-left p-3 rounded-sm border-2 transition-all duration-200 ${
              condition.active 
                ? CONDITION_COLORS[condition.name] 
                : 'border-muted bg-muted/30 text-muted-foreground'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{CONDITION_ICONS[condition.name]}</span>
              <div className="flex-1">
                <div className="font-bold text-sm uppercase tracking-wide">
                  {condition.name}
                </div>
                <div className="text-sm opacity-80">
                  {condition.description}
                </div>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 ${
                condition.active 
                  ? 'bg-current border-current' 
                  : 'border-muted-foreground'
              }`} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
