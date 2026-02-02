import { Character } from '@/types/character';

interface HeaderSectionProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  avatarSrc?: string;
}

export const HeaderSection = ({ character, setCharacter, avatarSrc }: HeaderSectionProps) => {
  const updateField = <K extends keyof Character>(field: K, value: Character[K]) => {
    setCharacter(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="rpg-card overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="avatar-frame w-28 h-28 sm:w-40 sm:h-40 mx-auto lg:mx-0">
            {avatarSrc ? (
              <img 
                src={avatarSrc} 
                alt={character.name}
                className="w-full h-full object-cover rounded-sm"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl sm:text-4xl bg-muted/50 rounded-sm">
                🧙
              </div>
            )}
          </div>
        </div>

        {/* Character Info */}
        <div className="flex-1 space-y-4">
          {/* Name */}
          <div>
            <input
              type="text"
              value={character.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="pixel-input w-full text-2xl font-pixel text-primary text-glow-primary bg-transparent border-none focus:border-none p-0"
              style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '16px' }}
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label htmlFor="char-race" className="text-xs text-muted-foreground uppercase">Raza</label>
              <input
                id="char-race"
                type="text"
                value={character.race}
                onChange={(e) => updateField('race', e.target.value)}
                className="pixel-input w-full"
                aria-label="Raza del personaje"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="char-class" className="text-xs text-muted-foreground uppercase">Clase</label>
              <input
                id="char-class"
                type="text"
                value={character.className}
                onChange={(e) => updateField('className', e.target.value)}
                className="pixel-input w-full"
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
                onChange={(e) => updateField('level', parseInt(e.target.value) || 1)}
                className="pixel-input w-full"
                aria-label="Nivel del personaje"
              />
            </div>
            <div className="space-y-1 col-span-2 md:col-span-2">
              <label htmlFor="char-background" className="text-xs text-muted-foreground uppercase">Trasfondo</label>
              <input
                id="char-background"
                type="text"
                value={character.background}
                onChange={(e) => updateField('background', e.target.value)}
                className="pixel-input w-full"
                aria-label="Trasfondo del personaje"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="char-alignment" className="text-xs text-muted-foreground uppercase">Alineamiento</label>
              <input
                id="char-alignment"
                type="text"
                value={character.alignment}
                onChange={(e) => updateField('alignment', e.target.value)}
                className="pixel-input w-full"
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
                onChange={(e) => updateField('xp', parseInt(e.target.value) || 0)}
                className="pixel-input w-full"
                aria-label="Puntos de experiencia"
              />
            </div>
          </div>
        </div>

        {/* Combat Stats */}
        <div className="grid grid-cols-4 lg:grid-cols-1 lg:flex lg:flex-col gap-2 sm:gap-3 justify-center w-full lg:w-auto">
          <div className="stat-box min-w-0">
            <span className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1">HP</span>
            <input
              type="number"
              min={0}
              value={character.hp}
              onChange={(e) => updateField('hp', parseInt(e.target.value) || 0)}
              className="stat-value bg-transparent border-none text-center w-12 sm:w-16 focus:outline-none text-sm sm:text-lg"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            />
            <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">{character.hitDie}</span>
          </div>
          <div className="stat-box min-w-0">
            <span className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1">CA</span>
            <input
              type="number"
              min={0}
              value={character.armorClass}
              onChange={(e) => updateField('armorClass', parseInt(e.target.value) || 0)}
              className="stat-value bg-transparent border-none text-center w-12 sm:w-16 focus:outline-none text-sm sm:text-lg"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
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
    </div>
  );
};
