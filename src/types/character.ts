export type AbilityName = 'FUE' | 'DES' | 'CON' | 'INT' | 'SAB' | 'CAR';

export interface Ability {
  name: AbilityName;
  score: number;
  modifier: number;
  savingThrowProficient: boolean;
}

export interface Skill {
  id: string;
  name: string;
  ability: AbilityName;
  baseModifier: number;
  proficient: boolean;
  expertise: boolean;
}

export type ConditionName = 'INSPIRADA' | 'DESMORALIZADA' | 'AGOTADA';

export interface Condition {
  name: ConditionName;
  active: boolean;
  description: string;
}

export interface Character {
  name: string;
  race: string;
  className: string;
  level: number;
  background: string;
  alignment: string;
  xp: number;
  hp: number;
  hitDie: string;
  armorClass: number;
  initiative: number;
  proficiencyBonus: number;
  speed: number;
  abilities: Ability[];
  skills: Skill[];
  classFeatures: string;
  racialTraits: string;
  proficiencies: string;
  equipment: string;
  conditions: Condition[];
  notes: string;
}

export const calculateModifier = (score: number): number => {
  return Math.floor((score - 10) / 2);
};

export const calculateSkillTotal = (
  baseModifier: number,
  proficient: boolean,
  expertise: boolean,
  proficiencyBonus: number
): number => {
  let total = baseModifier;
  if (proficient) total += proficiencyBonus;
  if (expertise) total += proficiencyBonus;
  return total;
};

export const getDefaultCharacter = (): Character => ({
  name: "Frontella Brillopíxel",
  race: "Elfa",
  className: "Pícara (Rogue)",
  level: 1,
  background: "Artesana de Interfaces",
  alignment: "Caótica buena",
  xp: 0,
  hp: 9,
  hitDie: "d8",
  armorClass: 12,
  initiative: 2,
  proficiencyBonus: 2,
  speed: 30,
  abilities: [
    { name: 'FUE', score: 8, modifier: -1, savingThrowProficient: false },
    { name: 'DES', score: 15, modifier: 2, savingThrowProficient: true },
    { name: 'CON', score: 12, modifier: 1, savingThrowProficient: false },
    { name: 'INT', score: 13, modifier: 1, savingThrowProficient: true },
    { name: 'SAB', score: 10, modifier: 0, savingThrowProficient: false },
    { name: 'CAR', score: 14, modifier: 2, savingThrowProficient: false },
  ],
  skills: [
    { id: 'percepcion', name: 'Percepción', ability: 'SAB', baseModifier: 0, proficient: true, expertise: true },
    { id: 'destreza-manual', name: 'Destreza manual', ability: 'DES', baseModifier: 2, proficient: true, expertise: true },
    { id: 'sigilo', name: 'Sigilo', ability: 'DES', baseModifier: 2, proficient: true, expertise: false },
    { id: 'investigacion', name: 'Investigación', ability: 'INT', baseModifier: 1, proficient: true, expertise: false },
    { id: 'persuasion', name: 'Persuasión', ability: 'CAR', baseModifier: 2, proficient: true, expertise: false },
    { id: 'performance', name: 'Performance', ability: 'CAR', baseModifier: 2, proficient: true, expertise: false },
    { id: 'atletismo', name: 'Atletismo', ability: 'FUE', baseModifier: -1, proficient: false, expertise: false },
    { id: 'acrobacias', name: 'Acrobacias', ability: 'DES', baseModifier: 2, proficient: false, expertise: false },
    { id: 'historia', name: 'Historia', ability: 'INT', baseModifier: 1, proficient: false, expertise: false },
    { id: 'perspicacia', name: 'Perspicacia', ability: 'SAB', baseModifier: 0, proficient: false, expertise: false },
  ],
  conditions: [
    { name: 'INSPIRADA', active: false, description: '+2 a Persuasión/Performance al hablar de su portfolio' },
    { name: 'DESMORALIZADA', active: false, description: '−2 en tiradas sociales tras varios rechazos' },
    { name: 'AGOTADA', active: false, description: '−2 en tiradas de concentración (pruebas técnicas)' },
  ],
  classFeatures: `🎯 EXPERTISE
Dominio doble en 2 habilidades elegidas: Percepción y Destreza manual. El bonus de competencia se duplica.

⚔️ SNEAK ATTACK (1d6)
Una vez por turno, puedes infligir +1d6 de daño extra si atacas con ventaja o si un aliado está a 5 pies del objetivo.

🗣️ THIEVES' CANT
Lenguaje secreto de los pícaros. Puedes comunicarte con otros desarrolladores mediante comentarios en código, commits crípticos y jerga técnica.`,
  racialTraits: `👁️ VISIÓN EN LA OSCURIDAD
Puedes ver en luz tenue a 60 pies como si fuera luz brillante. Perfecto para sesiones de debugging nocturnas.

👂 SENTIDOS AGUDOS
Competencia en Percepción. Detectas bugs antes que nadie.

🧘 TRANCE
No necesitas dormir. En lugar de eso, meditas profundamente 4 horas (equivalente a 8 horas de descanso largo). Tiempo extra para side projects.`,
  proficiencies: `🗡️ ARMAS: Armas sencillas, armas de finesse, ballesta de mano, espada corta, espada larga, arco corto

🛡️ ARMADURAS: Armaduras ligeras

🔧 HERRAMIENTAS: 
- Herramientas de ladrón (DevTools, Figma, Storybook)
- Kit de depuración (console.log, breakpoints)

🌐 IDIOMAS: 
- Común (Español)
- Élfico (TypeScript)
- Jerga técnica (HTML/CSS/JS)
- Thieves' Cant (Git commits)`,
  equipment: `📦 EQUIPO INICIAL:
- Armadura de cuero (AC 11 + DES)
- 2 Dagas de precisión (finesse)
- Arco corto + 20 flechas
- Kit de herramientas de ladrón
- Pack de explorador

💻 EQUIPO TECH:
- Portátil encantado (MacBook Pro)
- Portfolio mágico desplegado
- Cuenta de GitHub con contribuciones verdes
- Perfil de LinkedIn optimizado
- Headphones de concentración +2
- Monitor ultrawide de visión ampliada`,
  notes: '',
});
