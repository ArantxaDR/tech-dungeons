import {
  Character,
  Ability,
  AbilityName,
  Skill,
  Condition,
  calculateModifier,
} from "@/types/character";
import {
  GiAchievement,
  GiBrain,
  GiCrossedSwords,
  GiCrystalBall,
  GiDungeonGate,
  GiFairyWand,
  GiFlame,
  GiFootprint,
  GiHealing,
  GiMagicLamp,
  GiMagnifyingGlass,
  GiMapleLeaf,
  GiMeditation,
  GiMoon,
  GiPoisonBottle,
  GiSandsOfTime,
  GiScrollUnfurled,
  GiShield,
  GiStoneAxe,
  GiStrong,
  GiThreeFriends,
  GiWalkingBoot,
  GiSmartphone,
  GiChestArmor,
  GiToolbox,
  GiTongue,
  GiPhone,
} from "react-icons/gi";

export type RoleName =
  | "frontend"
  | "backend"
  | "full-stack"
  | "ux-ui"
  | "qa"
  | "devops"
  | "data-ml"
  | "product"
  | "eng-manager";
export type ClassName =
  | "Pícara"
  | "Bárbara"
  | "Exploradora"
  | "Hechicera"
  | "Monja"
  | "Clériga"
  | "Maga"
  | "Barda"
  | "Paladina";
export type RaceName = "Elfa" | "Enana" | "Mediana" | "Semielfa" | "Humana";

// The 18 canonical D&D 5e skills, for manually adding to a character in the
// creator (presets only ever list a hand-picked subset of these).
export const ALL_SKILLS: { name: string; ability: AbilityName }[] = [
  { name: "Acrobacias", ability: "DES" },
  { name: "Trato con Animales", ability: "SAB" },
  { name: "Arcana", ability: "INT" },
  { name: "Atletismo", ability: "FUE" },
  { name: "Engaño", ability: "CAR" },
  { name: "Historia", ability: "INT" },
  { name: "Perspicacia", ability: "SAB" },
  { name: "Intimidación", ability: "CAR" },
  { name: "Investigación", ability: "INT" },
  { name: "Medicina", ability: "SAB" },
  { name: "Naturaleza", ability: "INT" },
  { name: "Percepción", ability: "SAB" },
  { name: "Performance", ability: "CAR" },
  { name: "Persuasión", ability: "CAR" },
  { name: "Religión", ability: "INT" },
  { name: "Juego de Manos", ability: "DES" },
  { name: "Sigilo", ability: "DES" },
  { name: "Supervivencia", ability: "SAB" },
];

// focusSkills reflect the skills each role's canonical preset already
// prioritizes (see getDefault* in types/character.ts) — not standalone
// ability bonuses, since Role in this app is a flavor label layered on top
// of a Class, not an independent stat-granting axis.
export const ROLES: {
  value: RoleName;
  label: string;
  focusSkills: string[];
}[] = [
  {
    value: "frontend",
    label: "Frontend Developer",
    focusSkills: ["Percepción", "Destreza manual", "Sigilo"],
  },
  {
    value: "backend",
    label: "Backend Developer",
    focusSkills: ["Atletismo", "Investigación", "Supervivencia"],
  },
  {
    value: "full-stack",
    label: "Full-Stack Developer",
    focusSkills: ["Supervivencia", "Investigación", "Naturaleza"],
  },
  {
    value: "ux-ui",
    label: "UX/UI Designer",
    focusSkills: ["Performance", "Percepción", "Persuasión"],
  },
  {
    value: "qa",
    label: "QA / Test Engineer",
    focusSkills: ["Percepción", "Perspicacia", "Acrobacias"],
  },
  {
    value: "devops",
    label: "DevOps / SRE",
    focusSkills: ["Medicina", "Perspicacia", "Historia"],
  },
  {
    value: "data-ml",
    label: "Data / ML Engineer",
    focusSkills: ["Arcana", "Investigación", "Historia"],
  },
  {
    value: "product",
    label: "Product Manager",
    focusSkills: ["Persuasión", "Performance", "Perspicacia"],
  },
  {
    value: "eng-manager",
    label: "Engineering Manager",
    focusSkills: ["Persuasión", "Perspicacia", "Atletismo"],
  },
];

// hitDie, primaryAbility and savingThrows are read directly off each class's
// canonical preset (getDefault* in types/character.ts) — this table doesn't
// invent numbers the creator's "Autocompletar Stats" doesn't already use.
export const CLASSES: {
  value: ClassName;
  label: string;
  suggestedRole: RoleName;
  hitDie: string;
  primaryAbility: AbilityName;
  savingThrows: [AbilityName, AbilityName];
}[] = [
  {
    value: "Pícara",
    label: "Pícara (Rogue)",
    suggestedRole: "frontend",
    hitDie: "d8",
    primaryAbility: "DES",
    savingThrows: ["DES", "INT"],
  },
  {
    value: "Bárbara",
    label: "Bárbara (Barbarian)",
    suggestedRole: "backend",
    hitDie: "d12",
    primaryAbility: "FUE",
    savingThrows: ["FUE", "CON"],
  },
  {
    value: "Exploradora",
    label: "Exploradora (Ranger)",
    suggestedRole: "full-stack",
    hitDie: "d10",
    primaryAbility: "INT",
    savingThrows: ["FUE", "DES"],
  },
  {
    value: "Hechicera",
    label: "Hechicera (Sorcerer)",
    suggestedRole: "ux-ui",
    hitDie: "d6",
    primaryAbility: "CAR",
    savingThrows: ["CON", "CAR"],
  },
  {
    value: "Monja",
    label: "Monja (Monk)",
    suggestedRole: "qa",
    hitDie: "d8",
    primaryAbility: "DES",
    savingThrows: ["FUE", "DES"],
  },
  {
    value: "Clériga",
    label: "Clériga (Cleric)",
    suggestedRole: "devops",
    hitDie: "d8",
    primaryAbility: "SAB",
    savingThrows: ["SAB", "CAR"],
  },
  {
    value: "Maga",
    label: "Maga (Wizard)",
    suggestedRole: "data-ml",
    hitDie: "d6",
    primaryAbility: "INT",
    savingThrows: ["INT", "SAB"],
  },
  {
    value: "Barda",
    label: "Barda (Bard)",
    suggestedRole: "product",
    hitDie: "d8",
    primaryAbility: "CAR",
    savingThrows: ["DES", "CAR"],
  },
  {
    value: "Paladina",
    label: "Paladina (Paladin)",
    suggestedRole: "eng-manager",
    hitDie: "d10",
    primaryAbility: "CAR",
    savingThrows: ["SAB", "CAR"],
  },
];

// abilityBonus is new, invented content — the presets don't decompose a
// race-only bonus separate from the class's hand-tuned scores. trait is a
// condensed line pulled from each race's racialTraits text already in
// types/character.ts.
export const RACES: {
  value: RaceName;
  label: string;
  speed: number;
  abilityBonus: Partial<Record<AbilityName, number>>;
  trait: string;
}[] = [
  {
    value: "Elfa",
    label: "Elfa",
    speed: 30,
    abilityBonus: { DES: 2 },
    trait: "Visión en la oscuridad 60 pies. Inmune a sueño mágico.",
  },
  {
    value: "Enana",
    label: "Enana",
    speed: 25,
    abilityBonus: { CON: 2 },
    trait: "Resistencia a veneno. Visión en la oscuridad 60 pies.",
  },
  {
    value: "Mediana",
    label: "Mediana (Halfling)",
    speed: 25,
    abilityBonus: { DES: 2 },
    trait: "Suerte: repite 1s en tiradas de ataque, habilidad o salvación.",
  },
  {
    value: "Semielfa",
    label: "Semielfa",
    speed: 30,
    abilityBonus: { CAR: 2, DES: 1 },
    trait: "Inmune a Charm, ventaja contra Sleep. Dos competencias extra.",
  },
  {
    value: "Humana",
    label: "Humana",
    speed: 30,
    abilityBonus: { FUE: 1, DES: 1, CON: 1, INT: 1, SAB: 1, CAR: 1 },
    trait: "Versátil: +1 a todas las características.",
  },
];

interface PresetConfig {
  race: RaceName;
  className: ClassName;
  preset: Omit<Character, "name" | "imageDataUrl">;
}

const createAbilities = (
  fue: number,
  des: number,
  con: number,
  int: number,
  sab: number,
  car: number,
  savingThrows: {
    fue?: boolean;
    des?: boolean;
    con?: boolean;
    int?: boolean;
    sab?: boolean;
    car?: boolean;
  } = {},
): Ability[] => [
  {
    name: "FUE",
    score: fue,
    modifier: Math.floor((fue - 10) / 2),
    savingThrowProficient: savingThrows.fue || false,
  },
  {
    name: "DES",
    score: des,
    modifier: Math.floor((des - 10) / 2),
    savingThrowProficient: savingThrows.des || false,
  },
  {
    name: "CON",
    score: con,
    modifier: Math.floor((con - 10) / 2),
    savingThrowProficient: savingThrows.con || false,
  },
  {
    name: "INT",
    score: int,
    modifier: Math.floor((int - 10) / 2),
    savingThrowProficient: savingThrows.int || false,
  },
  {
    name: "SAB",
    score: sab,
    modifier: Math.floor((sab - 10) / 2),
    savingThrowProficient: savingThrows.sab || false,
  },
  {
    name: "CAR",
    score: car,
    modifier: Math.floor((car - 10) / 2),
    savingThrowProficient: savingThrows.car || false,
  },
];

const createDefaultConditions = (role: string): Condition[] => [
  {
    name: "INSPIRADA",
    active: false,
    description: `+2 cuando recibe feedback positivo sobre su trabajo de ${role}`,
  },
  {
    name: "DESMORALIZADA",
    active: false,
    description: `−2 cuando su trabajo de ${role} no es valorado`,
  },
  {
    name: "AGOTADA",
    active: false,
    description: "−2 a concentración tras largas sesiones de trabajo",
  },
];

// Frontend - Elfa Pícara
const frontellaPreset: PresetConfig = {
  race: "Elfa",
  className: "Pícara",
  preset: {
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
    abilities: createAbilities(8, 15, 12, 13, 10, 14, { des: true, int: true }),
    skills: [
      {
        id: "percepcion",
        name: "Percepción",
        ability: "SAB",
        baseModifier: 0,
        proficient: true,
        expertise: true,
      },
      {
        id: "destreza-manual",
        name: "Destreza manual",
        ability: "DES",
        baseModifier: 2,
        proficient: true,
        expertise: true,
      },
      {
        id: "sigilo",
        name: "Sigilo",
        ability: "DES",
        baseModifier: 2,
        proficient: true,
        expertise: false,
      },
      {
        id: "investigacion",
        name: "Investigación",
        ability: "INT",
        baseModifier: 1,
        proficient: true,
        expertise: false,
      },
      {
        id: "persuasion",
        name: "Persuasión",
        ability: "CAR",
        baseModifier: 2,
        proficient: true,
        expertise: false,
      },
      {
        id: "performance",
        name: "Performance",
        ability: "CAR",
        baseModifier: 2,
        proficient: true,
        expertise: false,
      },
      {
        id: "atletismo",
        name: "Atletismo",
        ability: "FUE",
        baseModifier: -1,
        proficient: false,
        expertise: false,
      },
      {
        id: "acrobacias",
        name: "Acrobacias",
        ability: "DES",
        baseModifier: 2,
        proficient: false,
        expertise: false,
      },
    ],
    conditions: [
      {
        name: "INSPIRADA",
        active: false,
        description: "+2 a Persuasión/Performance al hablar de su portfolio",
      },
      {
        name: "DESMORALIZADA",
        active: false,
        description: "−2 en tiradas sociales tras varios rechazos",
      },
      {
        name: "AGOTADA",
        active: false,
        description: "−2 en tiradas de concentración (pruebas técnicas)",
      },
    ],
    classFeatures: [
      {
        id: "expertise",
        title: "EXPERTISE",
        description:
          "Dominio doble en 2 habilidades elegidas: Percepción y Destreza manual. El bonus de competencia se duplica.",
        icon: GiAchievement,
      },
      {
        id: "sneak-attack",
        title: "SNEAK ATTACK (1d6)",
        description:
          "Una vez por turno, puedes infligir +1d6 de daño extra si atacas con ventaja o si un aliado está a 5 pies del objetivo.",
        icon: GiCrossedSwords,
      },
      {
        id: "thieves-cant",
        title: "THIEVES' CANT",
        description:
          "Lenguaje secreto de los pícaros. Puedes comunicarte con otros desarrolladores mediante comentarios en código, commits crípticos y jerga técnica.",
        icon: GiScrollUnfurled,
      },
    ],
    racialTraits: [
      {
        id: "darkvision",
        title: "VISIÓN EN LA OSCURIDAD",
        description:
          "Puedes ver en luz tenue a 60 pies como si fuera luz brillante. Perfecto para sesiones de debugging nocturnas.",
        icon: GiMoon,
      },
      {
        id: "keen-senses",
        title: "SENTIDOS AGUDOS",
        description:
          "Competencia en Percepción. Detectas bugs antes que nadie.",
        icon: GiMagnifyingGlass,
      },
      {
        id: "trance",
        title: "TRANCE",
        description:
          "No necesitas dormir. En lugar de eso, meditas profundamente 4 horas, equivalentes a 8 horas de descanso largo. Tiempo extra para side projects.",
        icon: GiMeditation,
      },
    ],
    proficiencies: [
      {
        id: "front-weapons",
        title: "ARMAS",
        description: `Armas sencillas, armas de finesse, ballesta de mano, espada corta, espada larga, arco corto`,
        icon: GiCrossedSwords,
      },
      {
        id: "front-armors",
        title: "ARMADURAS",
        description: `Armaduras ligeras`,
        icon: GiChestArmor,
      },
      {
        id: "front-tools",
        title: "HERRAMIENTAS",
        description: `- Herramientas de ladrón (DevTools, Figma, Storybook) - Kit de depuración (console.log, breakpoints)`,
        icon: GiToolbox,
      },
      {
        id: "front-languages",
        title: "IDIOMAS",
        description: `- Común (Español) - Herramientas de ladrón (DevTools, Figma, Storybook) - Kit de depuración (console.log, breakpoints)`,
        icon: GiTongue,
      },
    ],
    equipment: [
      {
        id: "starting-equipment",
        title: "EQUIPO INICIAL",
        description: `- Armadura de cuero (AC 11 + DES)
- 2 Dagas de precisión (finesse)
- Arco corto + 20 flechas
- Kit de herramientas de ladrón
- Pack de explorador`,
        icon: GiShield,
      },
      {
        id: "tech-equipment",
        title: "EQUIPO TECH",
        description: `- Portátil encantado (MacBook Pro)
- Portfolio mágico desplegado
- Cuenta de GitHub con contribuciones verdes
- Perfil de LinkedIn optimizado
- Headphones de concentración +2
- Monitor ultrawide de visión ampliada`,
        icon: GiSmartphone,
      },
    ],
    notes: "",
  },
};

// Backend - Enana Bárbara
const bitgrunPreset: PresetConfig = {
  race: "Enana",
  className: "Bárbara",
  preset: {
    race: "Enana",
    className: "Bárbara",
    level: 1,
    background: "Forjadora de APIs",
    alignment: "Legal neutral",
    xp: 0,
    hp: 14,
    hitDie: "d12",
    armorClass: 14,
    initiative: 1,
    proficiencyBonus: 2,
    speed: 25,
    abilities: createAbilities(15, 12, 14, 10, 8, 13, { fue: true, con: true }),
    skills: [
      {
        id: "intimidacion",
        name: "Intimidación",
        ability: "CAR",
        baseModifier: 1,
        proficient: true,
        expertise: false,
      },
      {
        id: "atletismo",
        name: "Atletismo",
        ability: "FUE",
        baseModifier: 2,
        proficient: true,
        expertise: true,
      },
      {
        id: "supervivencia",
        name: "Supervivencia",
        ability: "SAB",
        baseModifier: -1,
        proficient: true,
        expertise: false,
      },
      {
        id: "investigacion",
        name: "Investigación",
        ability: "INT",
        baseModifier: 0,
        proficient: true,
        expertise: false,
      },
      {
        id: "percepcion",
        name: "Percepción",
        ability: "SAB",
        baseModifier: -1,
        proficient: false,
        expertise: false,
      },
      {
        id: "sigilo",
        name: "Sigilo",
        ability: "DES",
        baseModifier: 1,
        proficient: false,
        expertise: false,
      },
    ],
    conditions: [
      {
        name: "INSPIRADA",
        active: false,
        description:
          "+2 a optimización cuando los tests pasan al primer intento",
      },
      {
        name: "DESMORALIZADA",
        active: false,
        description: "−2 cuando las queries no escalan",
      },
      {
        name: "AGOTADA",
        active: false,
        description: "−2 tras sesiones largas de debugging",
      },
    ],
    classFeatures: [
      {
        id: "rage",
        title: "RABIA (RAGE)",
        description:
          "Cuando entras en modo resolución de incidentes, ganas ventaja en tiradas de FUE (trabajo duro) and resistencia al daño emocional del legacy. 2 usos por descanso largo.",
        icon: GiFlame,
      },
      {
        id: "unarmored-defense",
        title: "DEFENSA SIN ARMADURA",
        description:
          "Tu resiliencia personal te da CA = 10 + DES + CON cuando no llevas armadura pesada. La experiencia te ha curtido.",
        icon: GiShield,
      },
      {
        id: "furious-attack",
        title: "ATAQUE FURIOSO",
        description:
          "Durante la Rabia, puedes hacer un ataque adicional como acción bonus si usas el modificador de FUE.",
        icon: GiCrossedSwords,
      },
    ],

    racialTraits: [
      {
        id: "dwarven-resilience",
        title: "RESISTENCIA ENANA",
        description:
          "Tienes ventaja en tiradas de salvación contra veneno y resistencia al daño por veneno. Los entornos tóxicos no te afectan tanto.",
        icon: GiPoisonBottle,
      },
      {
        id: "dwarven-toughness",
        title: "ROBUSTEZ",
        description:
          "Tu velocidad no se reduce por llevar armadura pesada. Puedes cargar con cualquier peso de responsabilidades.",
        icon: GiStrong,
      },
      {
        id: "tool-affinity",
        title: "AFINIDAD CON HERRAMIENTAS",
        description:
          "Competencia con herramientas de artesano. Entiendes la estructura interna de cualquier sistema.",
        icon: GiToolbox,
      },
      {
        id: "dwarven-speed",
        title: "VELOCIDAD 25",
        description:
          "Los enanos se mueven a 25 pies, pero llegan seguros. Prefieren la estabilidad a la velocidad.",
        icon: GiWalkingBoot,
      },
    ],
    proficiencies: [
      {
        id: "dwarven-weapons",
        title: "ARMAS",
        description:
          "Armas simples, armas marciales, martillos de guerra, hachas",
        icon: GiCrossedSwords,
      },
      {
        id: "dwarven-armors",
        title: "ARMADURAS",
        description: "Armaduras ligeras, medianas, escudos",
        icon: GiChestArmor,
      },
      {
        id: "dwarven-tools",
        title: "HERRAMIENTAS",
        description:
          "- APIs y bases de datos - Scripts de automatización - CLIs y terminales - Sistemas de monitorización",
        icon: GiToolbox,
      },
      {
        id: "dwarven-languages",
        title: "IDIOMAS",
        description:
          "- Común (Español) - Enano (SQL) - Lenguaje de sistemas (Bash/Shell) - Lenguaje de sistemas (Bash/Shell)",
        icon: GiTongue,
      },
    ],
    equipment: [
      {
        id: "dwarven-init",
        title: "EQUIPO INICIAL",
        description:
          "- Armadura de cuero reforzada (AC 13 + DES) - Martillo-servidor (1d10 contundente) - 2 Hachas de mano (backup scripts) - Pack de explorador de sistemas",
        icon: GiCrossedSwords,
      },
    ],
    notes: "",
  },
};

// UX/UI - Semielfa Hechicera
const pixariaPreset: PresetConfig = {
  race: "Semielfa",
  className: "Hechicera",
  preset: {
    race: "Semielfa",
    className: "Hechicera (Sorcerer)",
    level: 1,
    background: "Artista de la experiencia",
    alignment: "Neutral buena",
    xp: 0,
    hp: 7,
    hitDie: "d6",
    armorClass: 12,
    initiative: 1,
    proficiencyBonus: 2,
    speed: 30,
    abilities: createAbilities(8, 13, 10, 12, 14, 15, { con: true, car: true }),
    skills: [
      {
        id: "performance",
        name: "Performance",
        ability: "CAR",
        baseModifier: 2,
        proficient: true,
        expertise: true,
      },
      {
        id: "percepcion",
        name: "Percepción",
        ability: "SAB",
        baseModifier: 2,
        proficient: true,
        expertise: false,
      },
      {
        id: "persuasion",
        name: "Persuasión",
        ability: "CAR",
        baseModifier: 2,
        proficient: true,
        expertise: false,
      },
      {
        id: "perspicacia",
        name: "Perspicacia",
        ability: "SAB",
        baseModifier: 2,
        proficient: true,
        expertise: false,
      },
      {
        id: "investigacion",
        name: "Investigación",
        ability: "INT",
        baseModifier: 1,
        proficient: false,
        expertise: false,
      },
      {
        id: "engano",
        name: "Engaño",
        ability: "CAR",
        baseModifier: 2,
        proficient: false,
        expertise: false,
      },
    ],
    conditions: [
      {
        name: "INSPIRADA",
        active: false,
        description:
          "+2 al presentar prototipos y defender decisiones de diseño",
      },
      {
        name: "DESMORALIZADA",
        active: false,
        description: "−2 cuando el diseño se implementa mal",
      },
      {
        name: "AGOTADA",
        active: false,
        description: "−2 tras muchas iteraciones sin feedback claro",
      },
    ],
    classFeatures: [
      {
        id: "prototype-magic",
        title: "MAGIA DE PROTOTIPO",
        description:
          "Convierte ideas en pantallas rápidamente. Puedes materializar wireframes y mockups con un gesto.",
        icon: GiFairyWand,
      },
      {
        id: "usability-spells",
        title: "HECHIZOS DE USABILIDAD",
        description:
          "Dominas tests de usuario, entrevistas y sesiones de feedback. Cada hechizo revela verdades sobre la experiencia.",
        icon: GiBrain,
      },
      {
        id: "illusion-spells",
        title: "HECHIZOS DE ILUSIÓN",
        description:
          "Creas wireframes, mockups y prototipos interactivos que parecen productos reales antes de escribir una línea de código.",
        icon: GiCrystalBall,
      },
    ],

    racialTraits: [
      {
        id: "half-elf-heritage",
        title: "HERENCIA MIXTA (SEMIELFA)",
        description:
          "Versátil y empática. Buen equilibrio entre análisis y trato con personas.",
        icon: GiThreeFriends,
      },
      {
        id: "universal-connection",
        title: "CONEXIÓN UNIVERSAL",
        description:
          "Facilidad para conectar con perfiles técnicos y no técnicos por igual.",
        icon: GiMagicLamp,
      },
      {
        id: "darkvision",
        title: "VISIÓN EN LA OSCURIDAD",
        description:
          "Puedes ver en luz tenue a 60 pies. Útil para detectar problemas de contraste y accesibilidad.",
        icon: GiMoon,
      },
      {
        id: "extra-language",
        title: "IDIOMAS EXTRA",
        description: "Conoces un idioma adicional de tu elección.",
        icon: GiScrollUnfurled,
      },
    ],
    proficiencies: [
      {
        id: "ux-tools",
        title: "HERRAMIENTAS",
        description:
          "- Figma y herramientas de prototipado - Sistemas de diseño y librerías de componentes - Herramientas de investigación UX",
        icon: GiToolbox,
      },
      {
        id: "ux-languages",
        title: "IDIOMAS",
        description:
          "- Común (Español) - Élfico (principios de diseño) - Jerga UX/UI y términos de producto",
        icon: GiTongue,
      },
    ],

    equipment: [
      {
        id: "ux-init",
        title: "EQUIPO INICIAL",
        description:
          "- Ropa cómoda de trabajo (AC 10 + DES) - Portátil encantado - Tablet para dibujar bocetos - Cuaderno de ideas",
        icon: GiScrollUnfurled,
      },
      {
        id: "ux-equipment",
        title: "EQUIPO TECH",
        description:
          "- Biblioteca de componentes - Sistema de diseño compartido - Plantillas de tests de usuario - Colección de patrones de interacción - Suscripción a Figma Premium - Libros de Nielsen Norman Group",
        icon: GiPhone,
      },
    ],
    notes: "",
  },
};

// Full-Stack - Mediana Exploradora
const stackiaPreset: PresetConfig = {
  race: "Mediana",
  className: "Exploradora",
  preset: {
    race: "Mediana (Halfling)",
    className: "Exploradora (Ranger)",
    level: 1,
    background: "Exploradora del stack",
    alignment: "Neutral buena",
    xp: 0,
    hp: 11,
    hitDie: "d10",
    armorClass: 14,
    initiative: 2,
    proficiencyBonus: 2,
    speed: 25,
    abilities: createAbilities(13, 14, 12, 15, 10, 8, { fue: true, des: true }),
    skills: [
      {
        id: "supervivencia",
        name: "Supervivencia",
        ability: "SAB",
        baseModifier: 0,
        proficient: true,
        expertise: false,
      },
      {
        id: "investigacion",
        name: "Investigación",
        ability: "INT",
        baseModifier: 2,
        proficient: true,
        expertise: false,
      },
      {
        id: "naturaleza",
        name: "Naturaleza",
        ability: "INT",
        baseModifier: 2,
        proficient: true,
        expertise: false,
      },
      {
        id: "percepcion",
        name: "Percepción",
        ability: "SAB",
        baseModifier: 0,
        proficient: true,
        expertise: false,
      },
      {
        id: "perspicacia",
        name: "Perspicacia",
        ability: "SAB",
        baseModifier: 0,
        proficient: true,
        expertise: false,
      },
      {
        id: "atletismo",
        name: "Atletismo",
        ability: "FUE",
        baseModifier: 1,
        proficient: false,
        expertise: false,
      },
    ],
    conditions: [
      {
        name: "INSPIRADA",
        active: false,
        description:
          "+2 al explicar arquitectura tras completar feature end-to-end",
      },
      {
        name: "DESMORALIZADA",
        active: false,
        description: "−2 cuando tiene demasiados frentes abiertos",
      },
      {
        name: "AGOTADA",
        active: false,
        description: "−2 tras mucho context switching entre frontend y backend",
      },
    ],
    classFeatures: [
      {
        id: "stack-explorer",
        title: "EXPLORADORA DEL STACK",
        description:
          "Entiende desde la base de datos hasta la UI. Puede navegar cualquier capa de la arquitectura.",
        icon: GiDungeonGate,
      },
      {
        id: "bug-tracker",
        title: "RASTREADORA DE BUGS",
        description:
          "Sigue el rastro de logs y errores a través de todo el sistema. Ventaja en tiradas de debugging.",
        icon: GiMagnifyingGlass,
      },
      {
        id: "architecture-maps",
        title: "MAPAS DE ARQUITECTURA",
        description:
          "Dibuja cómo encajan todas las piezas. Puede visualizar dependencias y flujos de datos.",
        icon: GiSandsOfTime,
      },
    ],

    racialTraits: [
      {
        id: "halfling-luck",
        title: "SUERTE MEDIANA",
        description:
          "Cuando sacas un 1 en un d20, puedes volver a tirar y usar el nuevo resultado. Los deploys fallidos a veces se arreglan solos.",
        icon: GiMapleLeaf,
      },
      {
        id: "halfling-agility",
        title: "AGILIDAD MEDIANA",
        description:
          "Puedes moverte a través del espacio de criaturas más grandes. Te cuelas por todos los rincones del stack.",
        icon: GiFootprint,
      },
      {
        id: "brave",
        title: "VALIENTE",
        description:
          "Tienes ventaja en tiradas contra miedo. Los deadlines imposibles no te asustan.",
        icon: GiThreeFriends,
      },
      {
        id: "halfling-speed",
        title: "VELOCIDAD 25",
        description:
          "Los medianos se mueven a 25 pies. Pequeña pero constante.",
        icon: GiWalkingBoot,
      },
    ],
    proficiencies: [
      {
        id: "development",
        title: "DESARROLLO",
        description: `
- Frontend y backend web
- APIs REST y GraphQL
- Bases de datos SQL y NoSQL`,
        icon: GiShield,
      },
      {
        id: "tools",
        title: "HERRAMIENTAS",
        description: `
- Terminal y línea de comandos
- Navegador y DevTools
- Cliente de base de datos
- Herramientas de logs y monitorización`,
        icon: GiToolbox,
      },
      {
        id: "languages",
        title: "IDIOMAS",
        description: `
- Común (Español)
- Mediano (JavaScript/TypeScript)
- Lengua de sistemas (Python/Node)`,
        icon: GiTongue,
      },
    ],
    equipment: [
      {
        id: "halfling-init",
        title: "EQUIPO INICIAL",
        description:
          "- Armadura de cuero reforzada (AC 12 + DES) - Arco corto + 20 flechas - 2 Espadas cortas - Pack de explorador",
        icon: GiWalkingBoot,
      },
      {
        id: "halfling-tecch",
        title: "EQUIPO TECH",
        description:
          "- Portátil todoterreno - Mochila llena de cables y adaptadores - Diagrama de arquitectura enrollado - Scripts de deploy automatizados - Acceso a múltiples entornos (dev, staging, prod) - Terminal con aliases personalizados",
        icon: GiWalkingBoot,
      },
    ],
    notes: "",
  },
};

// QA - Humana Monja
const bugariaPreset: PresetConfig = {
  race: "Humana",
  className: "Monja",
  preset: {
    race: "Humana",
    className: "Monja (Monk)",
    level: 1,
    background: "Guardiana de la calidad",
    alignment: "Legal buena",
    xp: 0,
    hp: 9,
    hitDie: "d8",
    armorClass: 15,
    initiative: 2,
    proficiencyBonus: 2,
    speed: 30,
    abilities: createAbilities(10, 15, 12, 13, 14, 8, { fue: true, des: true }),
    skills: [
      {
        id: "percepcion",
        name: "Percepción",
        ability: "SAB",
        baseModifier: 2,
        proficient: true,
        expertise: true,
      },
      {
        id: "perspicacia",
        name: "Perspicacia",
        ability: "SAB",
        baseModifier: 2,
        proficient: true,
        expertise: false,
      },
      {
        id: "acrobacias",
        name: "Acrobacias",
        ability: "DES",
        baseModifier: 2,
        proficient: true,
        expertise: false,
      },
      {
        id: "investigacion",
        name: "Investigación",
        ability: "INT",
        baseModifier: 1,
        proficient: true,
        expertise: false,
      },
      {
        id: "atletismo",
        name: "Atletismo",
        ability: "FUE",
        baseModifier: 0,
        proficient: false,
        expertise: false,
      },
    ],
    conditions: [
      {
        name: "INSPIRADA",
        active: false,
        description: "+2 a encontrar bugs cuando su feedback es valorado",
      },
      {
        name: "DESMORALIZADA",
        active: false,
        description: '−2 cuando su rol se percibe como "solo hacer clics"',
      },
      {
        name: "AGOTADA",
        active: false,
        description: "−2 cuando el testing llega siempre al final del proceso",
      },
    ],
    classFeatures: [
      {
        id: "monk-discipline",
        title: "DISCIPLINA DEL MONJE",
        description:
          "Rutinas de regresión y checks repetitivos sin perder foco. La constancia es tu mayor virtud.",
        icon: GiMeditation,
      },
      {
        id: "precise-strikes",
        title: "GOLPES PRECISOS",
        description:
          "Tests que van directo al punto. Cada caso de prueba es un ataque certero al código.",
        icon: GiCrossedSwords,
      },
      {
        id: "unarmored-movement",
        title: "MOVIMIENTO SIN ARMADURA",
        description:
          "Se adapta rápido a nuevos entornos, dispositivos y navegadores. CA = 10 + DES + SAB.",
        icon: GiWalkingBoot,
      },
    ],

    racialTraits: [
      {
        id: "human-versatility",
        title: "VERSATILIDAD HUMANA",
        description:
          "Capaz de aprender lo que haga falta para asegurar calidad. +1 a dos características de tu elección.",
        icon: GiStrong,
      },
      {
        id: "extra-skill",
        title: "HABILIDAD EXTRA",
        description:
          "Los humanos ganan una habilidad adicional de su elección. Flexibilidad para especializarse.",
        icon: GiAchievement,
      },
      {
        id: "human-speed",
        title: "VELOCIDAD 30",
        description: "Ritmo estándar. Ni demasiado rápido ni demasiado lento.",
        icon: GiScrollUnfurled,
      },
    ],
    proficiencies: [
      {
        id: "proficiencies",
        title: "HERRAMIENTAS DE TESTING",
        description: `
- Testing manual y exploratorio
- Suites de pruebas automatizadas
- Herramientas de reporte de bugs`,
        icon: GiToolbox,
      },
      {
        id: "testing-methodologies",
        title: "METODOLOGÍAS",
        description: `- Casos de prueba y checklists
- Testing de regresión
- Pruebas de aceptación`,
        icon: GiScrollUnfurled,
      },
      {
        id: "languages",
        title: "IDIOMAS",
        description: `- Común (Español)
- Lenguaje de testing (Gherkin/BDD)
- Jerga de calidad (ISTQB)`,

        icon: GiTongue,
      },
    ],
    equipment: [
      {
        id: "human-init",
        title: "EQUIPO INICIAL",
        description:
          "- Túnica de monje (AC 10 + DES + SAB) - Bastón de combate (1d6/1d8 contundente) - 10 Dardos de precisión - Pack de explorador",
        icon: GiScrollUnfurled,
      },
      {
        id: "human-init",
        title: "EQUIPO TECH",
        description:
          "- Tablero de pruebas Kanban - Lista de casos de test exhaustiva - Herramientas de reporte (Jira, Linear) - Checklist de regresión sagrada - Dispositivos de prueba variados - Extensiones de accesibilidad",
        icon: GiScrollUnfurled,
      },
    ],
    notes: "",
  },
};

// Mobile - Mediana Exploradora
const appliaPreset: PresetConfig = {
  race: "Mediana",
  className: "Exploradora",
  preset: {
    race: "Mediana (Halfling)",
    className: "Exploradora (Ranger)",
    level: 1,
    background: "Exploradora de ecosistemas móviles",
    alignment: "Caótica buena",
    xp: 0,
    hp: 12,
    hitDie: "d10",
    armorClass: 14,
    initiative: 2,
    proficiencyBonus: 2,
    speed: 25,
    abilities: createAbilities(10, 15, 14, 13, 12, 8, { des: true, con: true }),
    skills: [
      {
        id: "percepcion",
        name: "Percepción",
        ability: "SAB",
        baseModifier: 1,
        proficient: true,
        expertise: false,
      },
      {
        id: "investigacion",
        name: "Investigación",
        ability: "INT",
        baseModifier: 1,
        proficient: true,
        expertise: false,
      },
      {
        id: "acrobacias",
        name: "Acrobacias",
        ability: "DES",
        baseModifier: 2,
        proficient: true,
        expertise: false,
      },
      {
        id: "supervivencia",
        name: "Supervivencia",
        ability: "SAB",
        baseModifier: 1,
        proficient: true,
        expertise: false,
      },
      {
        id: "sigilo",
        name: "Sigilo",
        ability: "DES",
        baseModifier: 2,
        proficient: true,
        expertise: true,
      },
      {
        id: "historia",
        name: "Historia",
        ability: "INT",
        baseModifier: 1,
        proficient: false,
        expertise: false,
      },
      {
        id: "persuasion",
        name: "Persuasión",
        ability: "CAR",
        baseModifier: -1,
        proficient: false,
        expertise: false,
      },
      {
        id: "perspicacia",
        name: "Perspicacia",
        ability: "SAB",
        baseModifier: 1,
        proficient: false,
        expertise: false,
      },
      {
        id: "atletismo",
        name: "Atletismo",
        ability: "FUE",
        baseModifier: 0,
        proficient: false,
        expertise: false,
      },
      {
        id: "naturaleza",
        name: "Naturaleza",
        ability: "INT",
        baseModifier: 1,
        proficient: false,
        expertise: false,
      },
    ],
    conditions: [
      {
        name: "INSPIRADA",
        active: false,
        description:
          "+2 en tiradas técnicas (logs, rendimiento) tras un release estable con buenas reseñas",
      },
      {
        name: "DESMORALIZADA",
        active: false,
        description:
          "−2 en tiradas sociales cuando recibe muchas issues por decisiones fuera de su control (negocio, marketing)",
      },
      {
        name: "AGOTADA",
        active: false,
        description:
          "−2 en concentración tras demasiado hotfixes y builds urgentes",
      },
    ],
    classFeatures: [
      {
        id: "mobile-explorer",
        title: "EXPLORADORA DE PLATAFORMAS MÓVILES",
        description:
          "Conoce iOS, Android y/o frameworks cross-platform. Domina los ecosistemas nativos y sus peculiaridades.",
        icon: GiSmartphone,
      },
      {
        id: "bug-tracker",
        title: "RASTREADORA DE BUGS",
        description:
          "Sigue pistas en logs, crash reports y analíticas. Encuentra el origen de cualquier crash.",
        icon: GiMagnifyingGlass,
      },
      {
        id: "user-guide",
        title: "GUÍA DEL USUARIO",
        description:
          "Piensa en contexto real: batería baja, mala conectividad, uso con una mano, interrupciones constantes.",
        icon: GiScrollUnfurled,
      },
    ],
    racialTraits: [
      {
        id: "halfling-luck",
        title: "SUERTE MEDIANA",
        description:
          "Cuando sacas un 1 en un d20, puedes volver a tirar. Los builds fallidos a veces se arreglan en el segundo intento.",
        icon: GiMapleLeaf,
      },
      {
        id: "halfling-agility",
        title: "AGILIDAD MEDIANA",
        description:
          "Puedes moverte entre espacios reducidos. Te adaptas a pantallas pequeñas y dispositivos raros.",
        icon: GiFootprint,
      },
      {
        id: "brave",
        title: "VALIENTE",
        description:
          "Tienes ventaja contra miedo. Los rechazos en App Store no te asustan.",
        icon: GiThreeFriends,
      },
      {
        id: "halfling-speed",
        title: "VELOCIDAD 25",
        description:
          "Los medianos se mueven a 25 pies. Pequeña pero constante. El desarrollo mobile requiere paciencia.",
        icon: GiWalkingBoot,
      },
    ],
    proficiencies: [
      {
        id: "proficiencies",
        title: "LENGUAJES/FRAMEWORKS MOBILE",
        description: `
- Kotlin, Swift
- Flutter, React Native
- Jetpack Compose, SwiftUI`,
        icon: GiShield,
      },
      {
        id: "tools",
        title: "HERRAMIENTAS",
        description: `
- IDEs (Android Studio, Xcode)
- Emuladores y device farms
- CI/CD móvil (Fastlane, Bitrise)
- Analíticas y Crashlytics`,
        icon: GiToolbox,
      },
      {
        id: "languages",
        title: "IDIOMAS",
        description: `
- Común (Español)
- Mediano (Dart/Kotlin)
- Lengua de stores (App Store Connect, Play Console)`,
        icon: GiTongue,
      },
    ],
    equipment: [
      {
        id: "starting-equipment",
        title: "EQUIPO INICIAL",
        description: `- Armadura ligera de cuero (AC 12 + DES)
- Arco corto + 20 flechas
- 2 Dagas de debugging
- Pack de explorador móvil`,
        icon: GiShield,
      },
      {
        id: "tech-equipment",
        title: "EQUIPO TECH",
        description: `- Portátil con emuladores
- 2-3 dispositivos físicos de prueba
- Cables y power bank
- Cuentas de stores configuradas
- Certificados y perfiles de firma
- Scripts de build y release automatizados`,
        icon: GiSmartphone,
      },
    ],
    notes: "",
  },
};

// DevOps - Enana Clériga
const devopsPreset: PresetConfig = {
  race: "Enana",
  className: "Clériga",
  preset: {
    race: "Enana",
    className: "Clériga (Cleric)",
    level: 1,
    background: "Sacerdotisa de la infraestructura",
    alignment: "Legal buena",
    xp: 0,
    hp: 10,
    hitDie: "d8",
    armorClass: 16,
    initiative: 0,
    proficiencyBonus: 2,
    speed: 25,
    abilities: createAbilities(14, 10, 14, 12, 15, 8, { sab: true, car: true }),
    skills: [
      {
        id: "medicina",
        name: "Medicina",
        ability: "SAB",
        baseModifier: 2,
        proficient: true,
        expertise: false,
      },
      {
        id: "religion",
        name: "Religión",
        ability: "INT",
        baseModifier: 1,
        proficient: true,
        expertise: false,
      },
      {
        id: "perspicacia",
        name: "Perspicacia",
        ability: "SAB",
        baseModifier: 2,
        proficient: true,
        expertise: false,
      },
      {
        id: "historia",
        name: "Historia",
        ability: "INT",
        baseModifier: 1,
        proficient: false,
        expertise: false,
      },
    ],
    conditions: createDefaultConditions("DevOps"),
    classFeatures: [
      {
        id: "infrastructure-domain",
        title: "DOMINIO DE LA INFRAESTRUCTURA",
        description:
          "Especialista en mantener sistemas vivos. Protege la estabilidad, disponibilidad y salud de los servicios.",
        icon: GiShield,
      },
      {
        id: "cure-wounds",
        title: "CURAR HERIDAS",
        description:
          "Restaurar servicios caídos con un toque divino. Diagnostica incidencias y devuelve los sistemas a producción.",
        icon: GiHealing,
      },
      {
        id: "divine-protection",
        title: "PROTECCIÓN DIVINA",
        description:
          "Armadura pesada y escudo protegen el uptime. Monitorización, alertas y planes de recuperación reducen el impacto.",
        icon: GiShield,
      },
    ],

    racialTraits: [
      {
        id: "dwarven-resilience",
        title: "RESISTENCIA ENANA",
        description:
          "Ventaja contra veneno. Soporta on-call, incidencias y sistemas legacy sin caer.",
        icon: GiPoisonBottle,
      },
      {
        id: "darkvision",
        title: "VISIÓN EN LA OSCURIDAD",
        description:
          "Ver logs en la oscuridad de la noche. Detecta errores incluso durante las guardias más largas.",
        icon: GiMagnifyingGlass,
      },
      {
        id: "dwarven-craftsmanship",
        title: "MAESTRÍA EN INFRAESTRUCTURA",
        description:
          "Entiende la estructura interna de los sistemas y construye automatizaciones resistentes.",
        icon: GiStoneAxe,
      },
    ],
    proficiencies: [],
    equipment: [],
    notes: "",
  },
};

// Data/ML - Humana Maga
const dataPreset: PresetConfig = {
  race: "Humana",
  className: "Maga",
  preset: {
    race: "Humana",
    className: "Maga (Wizard)",
    level: 1,
    background: "Erudita de los datos",
    alignment: "Neutral",
    xp: 0,
    hp: 7,
    hitDie: "d6",
    armorClass: 11,
    initiative: 1,
    proficiencyBonus: 2,
    speed: 30,
    abilities: createAbilities(8, 13, 12, 16, 14, 10, { int: true, sab: true }),
    skills: [
      {
        id: "arcana",
        name: "Arcana",
        ability: "INT",
        baseModifier: 3,
        proficient: true,
        expertise: true,
      },
      {
        id: "investigacion",
        name: "Investigación",
        ability: "INT",
        baseModifier: 3,
        proficient: true,
        expertise: false,
      },
      {
        id: "historia",
        name: "Historia",
        ability: "INT",
        baseModifier: 3,
        proficient: true,
        expertise: false,
      },
      {
        id: "percepcion",
        name: "Percepción",
        ability: "SAB",
        baseModifier: 2,
        proficient: false,
        expertise: false,
      },
    ],
    conditions: createDefaultConditions("Data/ML"),
    classFeatures: [],
    racialTraits: [],
    proficiencies: [],
    equipment: [],
    notes: "",
  },
};

// Product Manager - Semielfa Barda
const productPreset: PresetConfig = {
  race: "Semielfa",
  className: "Barda",
  preset: {
    race: "Semielfa",
    className: "Barda (Bard)",
    level: 1,
    background: "Oradora del producto",
    alignment: "Caótica buena",
    xp: 0,
    hp: 9,
    hitDie: "d8",
    armorClass: 12,
    initiative: 1,
    proficiencyBonus: 2,
    speed: 30,
    abilities: createAbilities(8, 13, 12, 14, 10, 16, { des: true, car: true }),
    skills: [
      {
        id: "persuasion",
        name: "Persuasión",
        ability: "CAR",
        baseModifier: 3,
        proficient: true,
        expertise: true,
      },
      {
        id: "performance",
        name: "Performance",
        ability: "CAR",
        baseModifier: 3,
        proficient: true,
        expertise: false,
      },
      {
        id: "perspicacia",
        name: "Perspicacia",
        ability: "SAB",
        baseModifier: 0,
        proficient: true,
        expertise: false,
      },
      {
        id: "historia",
        name: "Historia",
        ability: "INT",
        baseModifier: 2,
        proficient: true,
        expertise: false,
      },
    ],
    conditions: createDefaultConditions("Product"),
    classFeatures: [],
    racialTraits: [],
    proficiencies: [],
    equipment: [],
    notes: "",
  },
};

// Engineering Manager - Humana Paladina
const engManagerPreset: PresetConfig = {
  race: "Humana",
  className: "Paladina",
  preset: {
    race: "Humana",
    className: "Paladina (Paladin)",
    level: 1,
    background: "Líder del gremio técnico",
    alignment: "Legal buena",
    xp: 0,
    hp: 12,
    hitDie: "d10",
    armorClass: 16,
    initiative: 0,
    proficiencyBonus: 2,
    speed: 30,
    abilities: createAbilities(14, 10, 13, 12, 10, 15, {
      sab: true,
      car: true,
    }),
    skills: [
      {
        id: "persuasion",
        name: "Persuasión",
        ability: "CAR",
        baseModifier: 2,
        proficient: true,
        expertise: false,
      },
      {
        id: "perspicacia",
        name: "Perspicacia",
        ability: "SAB",
        baseModifier: 0,
        proficient: true,
        expertise: false,
      },
      {
        id: "atletismo",
        name: "Atletismo",
        ability: "FUE",
        baseModifier: 2,
        proficient: true,
        expertise: false,
      },
      {
        id: "medicina",
        name: "Medicina",
        ability: "SAB",
        baseModifier: 0,
        proficient: true,
        expertise: false,
      },
    ],
    conditions: createDefaultConditions("Eng. Manager"),
    classFeatures: [],
    racialTraits: [],
    proficiencies: [],
    equipment: [],
    notes: "",
  },
};

export const PRESETS: PresetConfig[] = [
  frontellaPreset,
  bitgrunPreset,
  pixariaPreset,
  stackiaPreset,
  bugariaPreset,
  appliaPreset,
  devopsPreset,
  dataPreset,
  productPreset,
  engManagerPreset,
];

export const findPreset = (
  race: RaceName,
  className: ClassName,
): PresetConfig | undefined => {
  return PRESETS.find((p) => p.race === race && p.className === className);
};

export const findPresetByClass = (
  className: ClassName,
): PresetConfig | undefined => {
  return PRESETS.find((p) => p.className === className);
};

export const getEmptyCharacter = (): Character & {
  role: string;
  imageDataUrl?: string;
} => ({
  name: "",
  race: "",
  className: "",
  role: "",
  level: 1,
  background: "",
  alignment: "",
  xp: 0,
  hp: 8,
  hitDie: "d8",
  armorClass: 10,
  initiative: 0,
  proficiencyBonus: 2,
  speed: 30,
  abilities: createAbilities(10, 10, 10, 10, 10, 10),
  skills: [],
  classFeatures: [],
  racialTraits: [],
  proficiencies: [],
  equipment: [],
  conditions: [
    {
      name: "INSPIRADA",
      active: false,
      description: "+2 cuando recibe feedback positivo",
    },
    {
      name: "DESMORALIZADA",
      active: false,
      description: "−2 cuando su trabajo no es valorado",
    },
    {
      name: "AGOTADA",
      active: false,
      description: "−2 a concentración tras largas sesiones",
    },
  ],
  notes: "",
  imageDataUrl: undefined,
});

const HIT_DIE_MAX: Record<string, number> = { d6: 6, d8: 8, d10: 10, d12: 12 };

const slugifySkill = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-");

// The manual (CLASSES/RACES/ROLES above) is the single source of truth for
// crunch: pick any race + class + role and this computes real stats for it,
// instead of silently falling back to whichever one of the 9 named presets
// happens to share the chosen class (the old "Autocompletar Stats" bug —
// it looked up by class only, so the race you picked was ignored).
// Flavor text (features/traits/proficiencies/equipment) has no formula: it's
// borrowed from the matching named preset when the race+class pair is one of
// the 9 canonical ones, and left blank otherwise for the player to fill in.
export const generateCharacter = (
  raceValue: RaceName,
  classValue: ClassName,
  roleValue?: RoleName,
): Omit<Character, "name" | "imageDataUrl"> => {
  const race = RACES.find((r) => r.value === raceValue);
  const cls = CLASSES.find((c) => c.value === classValue);
  if (!race || !cls) return getEmptyCharacter();

  const scores: Record<AbilityName, number> = {
    FUE: 10,
    DES: 10,
    CON: 10,
    INT: 10,
    SAB: 10,
    CAR: 10,
  };
  scores[cls.primaryAbility] += 4;
  cls.savingThrows.forEach((ability) => {
    if (ability !== cls.primaryAbility) scores[ability] += 2;
  });
  (Object.entries(race.abilityBonus) as [AbilityName, number][]).forEach(
    ([ability, bonus]) => {
      scores[ability] += bonus;
    },
  );

  const abilities: Ability[] = (Object.keys(scores) as AbilityName[]).map(
    (name) => ({
      name,
      score: scores[name],
      modifier: calculateModifier(scores[name]),
      savingThrowProficient: cls.savingThrows.includes(name),
    }),
  );

  const role = ROLES.find((r) => r.value === roleValue);
  const skills: Skill[] = (role?.focusSkills ?? []).map((skillName) => {
    const def = ALL_SKILLS.find((s) => s.name === skillName);
    const ability = def?.ability ?? cls.primaryAbility;
    return {
      id: slugifySkill(skillName),
      name: skillName,
      ability,
      baseModifier: calculateModifier(scores[ability]),
      proficient: true,
      expertise: false,
    };
  });

  const exactPreset = findPreset(raceValue, classValue)?.preset;

  return {
    race: race.label,
    className: cls.label,
    level: 1,
    background: exactPreset?.background ?? "",
    alignment: exactPreset?.alignment ?? "",
    xp: 0,
    hp: HIT_DIE_MAX[cls.hitDie] + calculateModifier(scores.CON),
    hitDie: cls.hitDie,
    armorClass: 10 + calculateModifier(scores.DES),
    initiative: calculateModifier(scores.DES),
    proficiencyBonus: 2,
    speed: race.speed,
    abilities,
    skills,
    classFeatures: exactPreset?.classFeatures ?? [],
    racialTraits: exactPreset?.racialTraits ?? [
      {
        id: "racial-trait",
        title: "RASGO RACIAL",
        description: race.trait,
        icon: GiMapleLeaf,
      },
    ],
    proficiencies: exactPreset?.proficiencies ?? [],
    equipment: exactPreset?.equipment ?? [],
    conditions:
      exactPreset?.conditions ??
      createDefaultConditions(role?.label ?? cls.label),
    notes: "",
  };
};

export const getDefaultFrontella = (): Character => ({
  name: "Frontella Brillopíxel",
  ...frontellaPreset.preset,
});

export const getDefaultBitgrun = (): Character => ({
  name: "Bitgrun MartilloAPI",
  ...bitgrunPreset.preset,
});

export const getDefaultPixaria = (): Character => ({
  name: "Pixaria Interfacea",
  ...pixariaPreset.preset,
});

export const getDefaultStackia = (): Character => ({
  name: "Stackia Caminacódigo",
  ...stackiaPreset.preset,
});

export const getDefaultBugaria = (): Character => ({
  name: "Bugaria OjoFino",
  ...bugariaPreset.preset,
});

export const getDefaultApplia = (): Character => ({
  name: "Applia Pantallatáctil",
  ...appliaPreset.preset,
});

export const getDefaultCharacter = getDefaultFrontella;
