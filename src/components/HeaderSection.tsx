import { Character } from '@/types/character';

interface HeaderSectionProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  avatarSrc?: string;
  readOnly?: boolean;
}

export const HeaderSection = ({ character, setCharacter, avatarSrc, readOnly }: HeaderSectionProps) => {
  const updateField = <K extends keyof Character>(field: K, value: Character[K]) => {
    setCharacter(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="rpg-card overflow-hidden">
      {/* Masthead: avatar + name + vitals, always visible first */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="avatar-frame w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt={character.name}
                className="w-full h-full object-cover rounded-sm"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl bg-muted/50 rounded-sm">
                🧙
              </div>
            )}
          </div>
          <input
            type="text"
            value={character.name}
            onChange={readOnly ? undefined : (e) => updateField('name', e.target.value)}
            readOnly={readOnly}
            className="field-input flex-1 min-w-0 text-xl sm:text-2xl font-display text-primary text-glow-primary bg-transparent border-none focus:border-none p-0"
            aria-label="Nombre del personaje"
          />
        </div>

        {/* Combat Stats — vitals, visible without scrolling past the identity form */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 flex-shrink-0">
          <div className="stat-box min-w-0">
            <span className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1">HP</span>
            <input
              type="number"
              min={0}
              value={character.hp}
              onChange={readOnly ? undefined : (e) => updateField('hp', parseInt(e.target.value) || 0)}
              readOnly={readOnly}
              className="stat-value bg-transparent border-none text-center w-10 sm:w-14 focus:outline-none text-sm sm:text-lg"
              aria-label="Puntos de golpe"
            />
            <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">{character.hitDie}</span>
          </div>
          <div className="stat-box min-w-0">
            <span className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1">CA</span>
            <input
              type="number"
              min={0}
              value={character.armorClass}
              onChange={readOnly ? undefined : (e) => updateField('armorClass', parseInt(e.target.value) || 0)}
              readOnly={readOnly}
              className="stat-value bg-transparent border-none text-center w-10 sm:w-14 focus:outline-none text-sm sm:text-lg"
              aria-label="Clase de armadura"
            />
          </div>
          <div className="stat-box min-w-0">
            <span className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1">Inic.</span>
            <span className="stat-modifier stat-modifier-positive text-sm sm:text-xl">+{character.initiative}</span>
          </div>
          <div className="stat-box min-w-0">
            <span className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1">Vel.</span>
            <span className="stat-value text-sm sm:text-lg">{character.speed}</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">pies</span>
          </div>
        </div>
      </div>

      {/* Identity details — secondary, below the masthead */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 sm:mt-6">
        <div className="space-y-1">
          <label htmlFor="char-race" className="text-xs text-muted-foreground uppercase">Raza</label>
          <input
            id="char-race"
            type="text"
            value={character.race}
            onChange={readOnly ? undefined : (e) => updateField('race', e.target.value)}
            readOnly={readOnly}
            className="field-input w-full"
            aria-label="Raza del personaje"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="char-class" className="text-xs text-muted-foreground uppercase">Clase</label>
          <input
            id="char-class"
            type="text"
            value={character.className}
            onChange={readOnly ? undefined : (e) => updateField('className', e.target.value)}
            readOnly={readOnly}
            className="field-input w-full"
            aria-label="Clase del personaje"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="char-level" className="text-xs text-muted-foreground uppercase">Nivel</label>
          <input
            id="char-level"
            type="number"
            min={1}
            max={20}
            value={character.level}
            onChange={readOnly ? undefined : (e) => updateField('level', parseInt(e.target.value) || 1)}
            readOnly={readOnly}
            className="field-input w-full"
            aria-label="Nivel del personaje"
          />
        </div>
        <div className="space-y-1 col-span-2 md:col-span-2">
          <label htmlFor="char-background" className="text-xs text-muted-foreground uppercase">Trasfondo</label>
          <input
            id="char-background"
            type="text"
            value={character.background}
            onChange={readOnly ? undefined : (e) => updateField('background', e.target.value)}
            readOnly={readOnly}
            className="field-input w-full"
            aria-label="Trasfondo del personaje"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="char-alignment" className="text-xs text-muted-foreground uppercase">Alineamiento</label>
          <input
            id="char-alignment"
            type="text"
            value={character.alignment}
            onChange={readOnly ? undefined : (e) => updateField('alignment', e.target.value)}
            readOnly={readOnly}
            className="field-input w-full"
            aria-label="Alineamiento del personaje"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="char-xp" className="text-xs text-muted-foreground uppercase">XP</label>
          <input
            id="char-xp"
            type="number"
            min={0}
            value={character.xp}
            onChange={readOnly ? undefined : (e) => updateField('xp', parseInt(e.target.value) || 0)}
            readOnly={readOnly}
            className="field-input w-full"
            aria-label="Puntos de experiencia"
          />
        </div>
      </div>
    </div>
  );
};
