import { Character, Ability, AbilityName, Skill, Condition, calculateModifier } from '@/types/character';

export type RoleName = 'frontend' | 'backend' | 'full-stack' | 'ux-ui' | 'qa' | 'devops' | 'data-ml' | 'product' | 'eng-manager';
export type ClassName = 'Pícara' | 'Bárbara' | 'Exploradora' | 'Hechicera' | 'Monja' | 'Clériga' | 'Maga' | 'Barda' | 'Paladina';
export type RaceName = 'Elfa' | 'Enana' | 'Mediana' | 'Semielfa' | 'Humana';

// The 18 canonical D&D 5e skills, for manually adding to a character in the
// creator (presets only ever list a hand-picked subset of these).
export const ALL_SKILLS: { name: string; ability: AbilityName }[] = [
  { name: 'Acrobacias', ability: 'DES' },
  { name: 'Trato con Animales', ability: 'SAB' },
  { name: 'Arcana', ability: 'INT' },
  { name: 'Atletismo', ability: 'FUE' },
  { name: 'Engaño', ability: 'CAR' },
  { name: 'Historia', ability: 'INT' },
  { name: 'Perspicacia', ability: 'SAB' },
  { name: 'Intimidación', ability: 'CAR' },
  { name: 'Investigación', ability: 'INT' },
  { name: 'Medicina', ability: 'SAB' },
  { name: 'Naturaleza', ability: 'INT' },
  { name: 'Percepción', ability: 'SAB' },
  { name: 'Performance', ability: 'CAR' },
  { name: 'Persuasión', ability: 'CAR' },
  { name: 'Religión', ability: 'INT' },
  { name: 'Juego de Manos', ability: 'DES' },
  { name: 'Sigilo', ability: 'DES' },
  { name: 'Supervivencia', ability: 'SAB' },
];

// focusSkills reflect the skills each role's canonical preset already
// prioritizes (see getDefault* in types/character.ts) — not standalone
// ability bonuses, since Role in this app is a flavor label layered on top
// of a Class, not an independent stat-granting axis.
export const ROLES: { value: RoleName; label: string; focusSkills: string[] }[] = [
  { value: 'frontend', label: 'Frontend Developer', focusSkills: ['Percepción', 'Destreza manual', 'Sigilo'] },
  { value: 'backend', label: 'Backend Developer', focusSkills: ['Atletismo', 'Investigación', 'Supervivencia'] },
  { value: 'full-stack', label: 'Full-Stack Developer', focusSkills: ['Supervivencia', 'Investigación', 'Naturaleza'] },
  { value: 'ux-ui', label: 'UX/UI Designer', focusSkills: ['Performance', 'Percepción', 'Persuasión'] },
  { value: 'qa', label: 'QA / Test Engineer', focusSkills: ['Percepción', 'Perspicacia', 'Acrobacias'] },
  { value: 'devops', label: 'DevOps / SRE', focusSkills: ['Medicina', 'Perspicacia', 'Historia'] },
  { value: 'data-ml', label: 'Data / ML Engineer', focusSkills: ['Arcana', 'Investigación', 'Historia'] },
  { value: 'product', label: 'Product Manager', focusSkills: ['Persuasión', 'Performance', 'Perspicacia'] },
  { value: 'eng-manager', label: 'Engineering Manager', focusSkills: ['Persuasión', 'Perspicacia', 'Atletismo'] },
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
  { value: 'Pícara', label: 'Pícara (Rogue)', suggestedRole: 'frontend', hitDie: 'd8', primaryAbility: 'DES', savingThrows: ['DES', 'INT'] },
  { value: 'Bárbara', label: 'Bárbara (Barbarian)', suggestedRole: 'backend', hitDie: 'd12', primaryAbility: 'FUE', savingThrows: ['FUE', 'CON'] },
  { value: 'Exploradora', label: 'Exploradora (Ranger)', suggestedRole: 'full-stack', hitDie: 'd10', primaryAbility: 'INT', savingThrows: ['FUE', 'DES'] },
  { value: 'Hechicera', label: 'Hechicera (Sorcerer)', suggestedRole: 'ux-ui', hitDie: 'd6', primaryAbility: 'CAR', savingThrows: ['CON', 'CAR'] },
  { value: 'Monja', label: 'Monja (Monk)', suggestedRole: 'qa', hitDie: 'd8', primaryAbility: 'DES', savingThrows: ['FUE', 'DES'] },
  { value: 'Clériga', label: 'Clériga (Cleric)', suggestedRole: 'devops', hitDie: 'd8', primaryAbility: 'SAB', savingThrows: ['SAB', 'CAR'] },
  { value: 'Maga', label: 'Maga (Wizard)', suggestedRole: 'data-ml', hitDie: 'd6', primaryAbility: 'INT', savingThrows: ['INT', 'SAB'] },
  { value: 'Barda', label: 'Barda (Bard)', suggestedRole: 'product', hitDie: 'd8', primaryAbility: 'CAR', savingThrows: ['DES', 'CAR'] },
  { value: 'Paladina', label: 'Paladina (Paladin)', suggestedRole: 'eng-manager', hitDie: 'd10', primaryAbility: 'CAR', savingThrows: ['SAB', 'CAR'] },
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
  { value: 'Elfa', label: 'Elfa', speed: 30, abilityBonus: { DES: 2 }, trait: 'Visión en la oscuridad 60 pies. Inmune a sueño mágico.' },
  { value: 'Enana', label: 'Enana', speed: 25, abilityBonus: { CON: 2 }, trait: 'Resistencia a veneno. Visión en la oscuridad 60 pies.' },
  { value: 'Mediana', label: 'Mediana (Halfling)', speed: 25, abilityBonus: { DES: 2 }, trait: 'Suerte: repite 1s en tiradas de ataque, habilidad o salvación.' },
  { value: 'Semielfa', label: 'Semielfa', speed: 30, abilityBonus: { CAR: 2, DES: 1 }, trait: 'Inmune a Charm, ventaja contra Sleep. Dos competencias extra.' },
  { value: 'Humana', label: 'Humana', speed: 30, abilityBonus: { FUE: 1, DES: 1, CON: 1, INT: 1, SAB: 1, CAR: 1 }, trait: 'Versátil: +1 a todas las características.' },
];

interface PresetConfig {
  race: RaceName;
  className: ClassName;
  preset: Omit<Character, 'name' | 'imageDataUrl'>;
}

const createAbilities = (
  fue: number, des: number, con: number, int: number, sab: number, car: number,
  savingThrows: { fue?: boolean; des?: boolean; con?: boolean; int?: boolean; sab?: boolean; car?: boolean } = {}
): Ability[] => [
  { name: 'FUE', score: fue, modifier: Math.floor((fue - 10) / 2), savingThrowProficient: savingThrows.fue || false },
  { name: 'DES', score: des, modifier: Math.floor((des - 10) / 2), savingThrowProficient: savingThrows.des || false },
  { name: 'CON', score: con, modifier: Math.floor((con - 10) / 2), savingThrowProficient: savingThrows.con || false },
  { name: 'INT', score: int, modifier: Math.floor((int - 10) / 2), savingThrowProficient: savingThrows.int || false },
  { name: 'SAB', score: sab, modifier: Math.floor((sab - 10) / 2), savingThrowProficient: savingThrows.sab || false },
  { name: 'CAR', score: car, modifier: Math.floor((car - 10) / 2), savingThrowProficient: savingThrows.car || false },
];

const createDefaultConditions = (role: string): Condition[] => [
  { name: 'INSPIRADA', active: false, description: `+2 cuando recibe feedback positivo sobre su trabajo de ${role}` },
  { name: 'DESMORALIZADA', active: false, description: `−2 cuando su trabajo de ${role} no es valorado` },
  { name: 'AGOTADA', active: false, description: '−2 a concentración tras largas sesiones de trabajo' },
];

// Frontend - Elfa Pícara
const frontellaPreset: PresetConfig = {
  race: 'Elfa',
  className: 'Pícara',
  preset: {
    race: 'Elfa',
    className: 'Pícara (Rogue)',
    level: 1,
    background: 'Artesana de Interfaces',
    alignment: 'Caótica buena',
    xp: 0,
    hp: 9,
    hitDie: 'd8',
    armorClass: 12,
    initiative: 2,
    proficiencyBonus: 2,
    speed: 30,
    abilities: createAbilities(8, 15, 12, 13, 10, 14, { des: true, int: true }),
    skills: [
      { id: 'percepcion', name: 'Percepción', ability: 'SAB', baseModifier: 0, proficient: true, expertise: true },
      { id: 'destreza-manual', name: 'Destreza manual', ability: 'DES', baseModifier: 2, proficient: true, expertise: true },
      { id: 'sigilo', name: 'Sigilo', ability: 'DES', baseModifier: 2, proficient: true, expertise: false },
      { id: 'investigacion', name: 'Investigación', ability: 'INT', baseModifier: 1, proficient: true, expertise: false },
      { id: 'persuasion', name: 'Persuasión', ability: 'CAR', baseModifier: 2, proficient: true, expertise: false },
      { id: 'performance', name: 'Performance', ability: 'CAR', baseModifier: 2, proficient: true, expertise: false },
      { id: 'atletismo', name: 'Atletismo', ability: 'FUE', baseModifier: -1, proficient: false, expertise: false },
      { id: 'acrobacias', name: 'Acrobacias', ability: 'DES', baseModifier: 2, proficient: false, expertise: false },
    ],
    conditions: [
      { name: 'INSPIRADA', active: false, description: '+2 a Persuasión/Performance al hablar de su portfolio' },
      { name: 'DESMORALIZADA', active: false, description: '−2 en tiradas sociales tras varios rechazos' },
      { name: 'AGOTADA', active: false, description: '−2 en tiradas de concentración (pruebas técnicas)' },
    ],
    classFeatures: `🎯 EXPERTISE
Dominio doble en 2 habilidades: Percepción y Destreza manual.

⚔️ SNEAK ATTACK (1d6)
+1d6 de daño extra con ventaja o aliado cerca.

🗣️ THIEVES' CANT
Lenguaje secreto: comentarios en código y jerga técnica.`,
    racialTraits: `👁️ VISIÓN EN LA OSCURIDAD
Ver en luz tenue a 60 pies. Perfecto para debugging nocturno.

👂 SENTIDOS AGUDOS
Competencia en Percepción. Detecta bugs antes que nadie.

🧝 ASCENDENCIA FEÉRICA
Inmune a Charm, resistente a sleep. No cae en trampas de scope creep.`,
    proficiencies: `Frontend: HTML, CSS, JavaScript, TypeScript, React.
Herramientas: Git, VS Code, Chrome DevTools, Figma.`,
    equipment: `Portátil con terminal, editor configurado, notas de diseño, café.`,
    notes: '',
  },
};

// Backend - Enana Bárbara
const bitgrunPreset: PresetConfig = {
  race: 'Enana',
  className: 'Bárbara',
  preset: {
    race: 'Enana',
    className: 'Bárbara',
    level: 1,
    background: 'Forjadora de APIs',
    alignment: 'Legal neutral',
    xp: 0,
    hp: 14,
    hitDie: 'd12',
    armorClass: 14,
    initiative: 1,
    proficiencyBonus: 2,
    speed: 25,
    abilities: createAbilities(15, 12, 14, 10, 8, 13, { fue: true, con: true }),
    skills: [
      { id: 'intimidacion', name: 'Intimidación', ability: 'CAR', baseModifier: 1, proficient: true, expertise: false },
      { id: 'atletismo', name: 'Atletismo', ability: 'FUE', baseModifier: 2, proficient: true, expertise: true },
      { id: 'supervivencia', name: 'Supervivencia', ability: 'SAB', baseModifier: -1, proficient: true, expertise: false },
      { id: 'investigacion', name: 'Investigación', ability: 'INT', baseModifier: 0, proficient: true, expertise: false },
      { id: 'percepcion', name: 'Percepción', ability: 'SAB', baseModifier: -1, proficient: false, expertise: false },
      { id: 'sigilo', name: 'Sigilo', ability: 'DES', baseModifier: 1, proficient: false, expertise: false },
    ],
    conditions: [
      { name: 'INSPIRADA', active: false, description: '+2 a optimización cuando los tests pasan al primer intento' },
      { name: 'DESMORALIZADA', active: false, description: '−2 cuando las queries no escalan' },
      { name: 'AGOTADA', active: false, description: '−2 tras sesiones largas de debugging' },
    ],
    classFeatures: `💢 RAGE (2 usos/día)
Bonus +2 al daño cuerpo a cuerpo, resistencia a daño físico.

🛡️ UNARMORED DEFENSE
CA = 10 + DES + CON sin armadura.

🔥 FURIA DE CÓDIGO
Cada bug encontrado aumenta la furia.`,
    racialTraits: `⛏️ RESISTENCIA ENANA
Ventaja en tiradas contra veneno. Soporta código legacy.

🔍 VISIÓN EN LA OSCURIDAD
60 pies de visión en oscuridad.

🪨 DUREZA ENANA
+1 HP por nivel.`,
    proficiencies: `Backend: Python, Node.js, SQL, APIs REST/GraphQL.
Herramientas: Terminal, Docker, bases de datos.`,
    equipment: `Servidor portátil, martillo de guerra (teclado mecánico), documentación API.`,
    notes: '',
  },
};

// UX/UI - Semielfa Hechicera
const pixariaPreset: PresetConfig = {
  race: 'Semielfa',
  className: 'Hechicera',
  preset: {
    race: 'Semielfa',
    className: 'Hechicera (Sorcerer)',
    level: 1,
    background: 'Artista de la experiencia',
    alignment: 'Neutral buena',
    xp: 0,
    hp: 7,
    hitDie: 'd6',
    armorClass: 12,
    initiative: 1,
    proficiencyBonus: 2,
    speed: 30,
    abilities: createAbilities(8, 13, 10, 12, 14, 15, { con: true, car: true }),
    skills: [
      { id: 'performance', name: 'Performance', ability: 'CAR', baseModifier: 2, proficient: true, expertise: true },
      { id: 'percepcion', name: 'Percepción', ability: 'SAB', baseModifier: 2, proficient: true, expertise: false },
      { id: 'persuasion', name: 'Persuasión', ability: 'CAR', baseModifier: 2, proficient: true, expertise: false },
      { id: 'perspicacia', name: 'Perspicacia', ability: 'SAB', baseModifier: 2, proficient: true, expertise: false },
      { id: 'investigacion', name: 'Investigación', ability: 'INT', baseModifier: 1, proficient: false, expertise: false },
      { id: 'engano', name: 'Engaño', ability: 'CAR', baseModifier: 2, proficient: false, expertise: false },
    ],
    conditions: [
      { name: 'INSPIRADA', active: false, description: '+2 al presentar prototipos y defender decisiones de diseño' },
      { name: 'DESMORALIZADA', active: false, description: '−2 cuando el diseño se implementa mal' },
      { name: 'AGOTADA', active: false, description: '−2 tras muchas iteraciones sin feedback claro' },
    ],
    classFeatures: `✨ MAGIA INNATA
La magia del diseño fluye naturalmente. Carisma como stat de lanzamiento.

🔮 ORIGEN HECHICERO: Estética Salvaje
El diseño surge de la intuición, no solo de reglas.

🎭 METAMAGIA
Alterar prototipos sobre la marcha.`,
    racialTraits: `🧝 VISIÓN EN LA OSCURIDAD
Ver en oscuridad a 60 pies.

💫 ASCENDENCIA FEÉRICA
Inmune a ser Charmed, ventaja contra Sleep.

🌟 VERSATILIDAD
+2 competencias adicionales de skills.`,
    proficiencies: `UX: Research, wireframing, prototipado, testing con usuarios.
Herramientas: Figma, Sketch, herramientas de testing.`,
    equipment: `Tablet con stylus, libreta de sketches, paleta de colores, componentes UI.`,
    notes: '',
  },
};

// Full-Stack - Mediana Exploradora
const stackiaPreset: PresetConfig = {
  race: 'Mediana',
  className: 'Exploradora',
  preset: {
    race: 'Mediana (Halfling)',
    className: 'Exploradora (Ranger)',
    level: 1,
    background: 'Exploradora del stack',
    alignment: 'Neutral buena',
    xp: 0,
    hp: 11,
    hitDie: 'd10',
    armorClass: 14,
    initiative: 2,
    proficiencyBonus: 2,
    speed: 25,
    abilities: createAbilities(13, 14, 12, 15, 10, 8, { fue: true, des: true }),
    skills: [
      { id: 'supervivencia', name: 'Supervivencia', ability: 'SAB', baseModifier: 0, proficient: true, expertise: false },
      { id: 'investigacion', name: 'Investigación', ability: 'INT', baseModifier: 2, proficient: true, expertise: false },
      { id: 'naturaleza', name: 'Naturaleza', ability: 'INT', baseModifier: 2, proficient: true, expertise: false },
      { id: 'percepcion', name: 'Percepción', ability: 'SAB', baseModifier: 0, proficient: true, expertise: false },
      { id: 'perspicacia', name: 'Perspicacia', ability: 'SAB', baseModifier: 0, proficient: true, expertise: false },
      { id: 'atletismo', name: 'Atletismo', ability: 'FUE', baseModifier: 1, proficient: false, expertise: false },
    ],
    conditions: [
      { name: 'INSPIRADA', active: false, description: '+2 al explicar arquitectura tras completar feature end-to-end' },
      { name: 'DESMORALIZADA', active: false, description: '−2 cuando tiene demasiados frentes abiertos' },
      { name: 'AGOTADA', active: false, description: '−2 tras mucho context switching entre frontend y backend' },
    ],
    classFeatures: `🗺️ EXPLORADORA DEL STACK
Entiende de base de datos a UI.

🔍 RASTREADORA DE BUGS
Sigue el rastro de logs y errores.

📐 MAPAS DE ARQUITECTURA
Dibuja cómo encajan las piezas.`,
    racialTraits: `🍀 SUERTE DE MEDIANA
Repetir 1s en tiradas de ataque, habilidad o salvación.

🐇 VALIENTE
Ventaja contra ser asustado.

⚡ ÁGIL
Moverse a través del espacio de criaturas más grandes.`,
    proficiencies: `Frontend y backend web, APIs REST, bases de datos.
Herramientas: terminal, navegador, cliente de BD, herramientas de logs.`,
    equipment: `Portátil, mochila llena de cables, diagrama de arquitectura, scripts de deploy.`,
    notes: '',
  },
};

// QA - Humana Monja
const bugariaPreset: PresetConfig = {
  race: 'Humana',
  className: 'Monja',
  preset: {
    race: 'Humana',
    className: 'Monja (Monk)',
    level: 1,
    background: 'Guardiana de la calidad',
    alignment: 'Legal buena',
    xp: 0,
    hp: 9,
    hitDie: 'd8',
    armorClass: 15,
    initiative: 2,
    proficiencyBonus: 2,
    speed: 30,
    abilities: createAbilities(10, 15, 12, 13, 14, 8, { fue: true, des: true }),
    skills: [
      { id: 'percepcion', name: 'Percepción', ability: 'SAB', baseModifier: 2, proficient: true, expertise: true },
      { id: 'perspicacia', name: 'Perspicacia', ability: 'SAB', baseModifier: 2, proficient: true, expertise: false },
      { id: 'acrobacias', name: 'Acrobacias', ability: 'DES', baseModifier: 2, proficient: true, expertise: false },
      { id: 'investigacion', name: 'Investigación', ability: 'INT', baseModifier: 1, proficient: true, expertise: false },
      { id: 'atletismo', name: 'Atletismo', ability: 'FUE', baseModifier: 0, proficient: false, expertise: false },
    ],
    conditions: [
      { name: 'INSPIRADA', active: false, description: '+2 a encontrar bugs cuando su feedback es valorado' },
      { name: 'DESMORALIZADA', active: false, description: '−2 cuando su rol se percibe como "solo hacer clics"' },
      { name: 'AGOTADA', active: false, description: '−2 cuando el testing llega siempre al final del proceso' },
    ],
    classFeatures: `🧘 DISCIPLINA DEL MONJE
Rutinas de regresión y checks repetitivos sin perder foco.

👊 GOLPES PRECISOS
Tests que van directo al punto.

💨 MOVIMIENTO SIN ARMADURA
Se adapta rápido a nuevos entornos y navegadores.`,
    racialTraits: `🌍 VERSATILIDAD HUMANA
+1 a todas las características, una habilidad extra.

📚 ADAPTABILIDAD
Capaz de aprender lo que haga falta para asegurar calidad.`,
    proficiencies: `Testing manual y automatizado, suites de pruebas, herramientas de reporte.
Herramientas: Jira, Linear, Selenium, Cypress.`,
    equipment: `Tablero de pruebas, lista de casos de test, checklist de regresión.`,
    notes: '',
  },
};

// DevOps - Enana Clériga
const devopsPreset: PresetConfig = {
  race: 'Enana',
  className: 'Clériga',
  preset: {
    race: 'Enana',
    className: 'Clériga (Cleric)',
    level: 1,
    background: 'Sacerdotisa de la infraestructura',
    alignment: 'Legal buena',
    xp: 0,
    hp: 10,
    hitDie: 'd8',
    armorClass: 16,
    initiative: 0,
    proficiencyBonus: 2,
    speed: 25,
    abilities: createAbilities(14, 10, 14, 12, 15, 8, { sab: true, car: true }),
    skills: [
      { id: 'medicina', name: 'Medicina', ability: 'SAB', baseModifier: 2, proficient: true, expertise: false },
      { id: 'religion', name: 'Religión', ability: 'INT', baseModifier: 1, proficient: true, expertise: false },
      { id: 'perspicacia', name: 'Perspicacia', ability: 'SAB', baseModifier: 2, proficient: true, expertise: false },
      { id: 'historia', name: 'Historia', ability: 'INT', baseModifier: 1, proficient: false, expertise: false },
    ],
    conditions: createDefaultConditions('DevOps'),
    classFeatures: `✝️ DOMINIO DE LA INFRAESTRUCTURA
Especialista en mantener sistemas vivos.

🩹 CURAR HERIDAS
Restaurar servicios caídos con un toque divino.

🛡️ PROTECCIÓN DIVINA
Armadura pesada y escudo protegen el uptime.`,
    racialTraits: `⛏️ RESISTENCIA ENANA
Ventaja contra veneno. Soporta on-call sin caer.

🔍 VISIÓN EN LA OSCURIDAD
Ver logs en la oscuridad de la noche.`,
    proficiencies: `DevOps: CI/CD, Docker, Kubernetes, Terraform, monitoreo.
Herramientas: Terminal, AWS/GCP/Azure, Prometheus, Grafana.`,
    equipment: `Consola de monitoreo, pager, scripts de emergencia, café eterno.`,
    notes: '',
  },
};

// Data/ML - Humana Maga
const dataPreset: PresetConfig = {
  race: 'Humana',
  className: 'Maga',
  preset: {
    race: 'Humana',
    className: 'Maga (Wizard)',
    level: 1,
    background: 'Erudita de los datos',
    alignment: 'Neutral',
    xp: 0,
    hp: 7,
    hitDie: 'd6',
    armorClass: 11,
    initiative: 1,
    proficiencyBonus: 2,
    speed: 30,
    abilities: createAbilities(8, 13, 12, 16, 14, 10, { int: true, sab: true }),
    skills: [
      { id: 'arcana', name: 'Arcana', ability: 'INT', baseModifier: 3, proficient: true, expertise: true },
      { id: 'investigacion', name: 'Investigación', ability: 'INT', baseModifier: 3, proficient: true, expertise: false },
      { id: 'historia', name: 'Historia', ability: 'INT', baseModifier: 3, proficient: true, expertise: false },
      { id: 'percepcion', name: 'Percepción', ability: 'SAB', baseModifier: 2, proficient: false, expertise: false },
    ],
    conditions: createDefaultConditions('Data/ML'),
    classFeatures: `📖 LIBRO DE HECHIZOS
Grimorio con todos los modelos y algoritmos aprendidos.

🔮 RECUPERAR ARCANA
Recuperar slots de hechizo (GPU time) tras descanso corto.

✨ ESCUELA DE MAGIA: Adivinación
Especialista en predecir el futuro con datos.`,
    racialTraits: `🌍 VERSATILIDAD HUMANA
+1 a todas las características.

📚 CURIOSIDAD INNATA
Siempre buscando patrones en los datos.`,
    proficiencies: `Data: Python, SQL, pandas, scikit-learn, TensorFlow/PyTorch.
Herramientas: Jupyter, notebooks, pipelines de datos.`,
    equipment: `Grimorio de notebooks, dataset de entrenamiento, GPU portátil.`,
    notes: '',
  },
};

// Product Manager - Semielfa Barda
const productPreset: PresetConfig = {
  race: 'Semielfa',
  className: 'Barda',
  preset: {
    race: 'Semielfa',
    className: 'Barda (Bard)',
    level: 1,
    background: 'Oradora del producto',
    alignment: 'Caótica buena',
    xp: 0,
    hp: 9,
    hitDie: 'd8',
    armorClass: 12,
    initiative: 1,
    proficiencyBonus: 2,
    speed: 30,
    abilities: createAbilities(8, 13, 12, 14, 10, 16, { des: true, car: true }),
    skills: [
      { id: 'persuasion', name: 'Persuasión', ability: 'CAR', baseModifier: 3, proficient: true, expertise: true },
      { id: 'performance', name: 'Performance', ability: 'CAR', baseModifier: 3, proficient: true, expertise: false },
      { id: 'perspicacia', name: 'Perspicacia', ability: 'SAB', baseModifier: 0, proficient: true, expertise: false },
      { id: 'historia', name: 'Historia', ability: 'INT', baseModifier: 2, proficient: true, expertise: false },
    ],
    conditions: createDefaultConditions('Product'),
    classFeatures: `🎵 INSPIRACIÓN BÁRDICA
Dar dados de inspiración al equipo.

🎭 JACK OF ALL TRADES
Añadir mitad del bonus de competencia a skills sin proficiencia.

🗣️ CANCIÓN DE DESCANSO
Ayudar al equipo a recuperarse en retros.`,
    racialTraits: `🌟 ASCENDENCIA FEÉRICA
Inmune a Charm, resistente a manipulación.

💫 VERSATILIDAD SEMIELFA
+2 competencias adicionales.`,
    proficiencies: `Product: roadmapping, user stories, métricas, stakeholder management.
Herramientas: Jira, Notion, analytics, presentaciones.`,
    equipment: `Roadmap enrollado, backlog infinito, post-its mágicos.`,
    notes: '',
  },
};

// Engineering Manager - Humana Paladina
const engManagerPreset: PresetConfig = {
  race: 'Humana',
  className: 'Paladina',
  preset: {
    race: 'Humana',
    className: 'Paladina (Paladin)',
    level: 1,
    background: 'Líder del gremio técnico',
    alignment: 'Legal buena',
    xp: 0,
    hp: 12,
    hitDie: 'd10',
    armorClass: 16,
    initiative: 0,
    proficiencyBonus: 2,
    speed: 30,
    abilities: createAbilities(14, 10, 13, 12, 10, 15, { sab: true, car: true }),
    skills: [
      { id: 'persuasion', name: 'Persuasión', ability: 'CAR', baseModifier: 2, proficient: true, expertise: false },
      { id: 'perspicacia', name: 'Perspicacia', ability: 'SAB', baseModifier: 0, proficient: true, expertise: false },
      { id: 'atletismo', name: 'Atletismo', ability: 'FUE', baseModifier: 2, proficient: true, expertise: false },
      { id: 'medicina', name: 'Medicina', ability: 'SAB', baseModifier: 0, proficient: true, expertise: false },
    ],
    conditions: createDefaultConditions('Eng. Manager'),
    classFeatures: `⚔️ ESTILO DE COMBATE: Defensa
+1 CA cuando lleva armadura. Protege al equipo.

🩹 IMPOSICIÓN DE MANOS
Pool de curación = nivel × 5. Resolver conflictos y burnout.

🛡️ SENTIDO DIVINO
Detectar problemas en el equipo antes de que escalen.`,
    racialTraits: `🌍 VERSATILIDAD HUMANA
+1 a todas las características.

💪 LIDERAZGO NATURAL
Inspira confianza en momentos difíciles.`,
    proficiencies: `Management: 1:1s, feedback, roadmapping técnico, hiring.
Herramientas: calendarios, documentación, métricas de equipo.`,
    equipment: `Escudo con el logo del equipo, espada de ceremonias, handbook del manager.`,
    notes: '',
  },
};

export const PRESETS: PresetConfig[] = [
  frontellaPreset,
  bitgrunPreset,
  pixariaPreset,
  stackiaPreset,
  bugariaPreset,
  devopsPreset,
  dataPreset,
  productPreset,
  engManagerPreset,
];

export const findPreset = (race: RaceName, className: ClassName): PresetConfig | undefined => {
  return PRESETS.find(p => p.race === race && p.className === className);
};

export const findPresetByClass = (className: ClassName): PresetConfig | undefined => {
  return PRESETS.find(p => p.className === className);
};

export const getEmptyCharacter = (): Character & { role: string; imageDataUrl?: string } => ({
  name: '',
  race: '',
  className: '',
  role: '',
  level: 1,
  background: '',
  alignment: '',
  xp: 0,
  hp: 8,
  hitDie: 'd8',
  armorClass: 10,
  initiative: 0,
  proficiencyBonus: 2,
  speed: 30,
  abilities: createAbilities(10, 10, 10, 10, 10, 10),
  skills: [],
  classFeatures: '',
  racialTraits: '',
  proficiencies: '',
  equipment: '',
  conditions: [
    { name: 'INSPIRADA', active: false, description: '+2 cuando recibe feedback positivo' },
    { name: 'DESMORALIZADA', active: false, description: '−2 cuando su trabajo no es valorado' },
    { name: 'AGOTADA', active: false, description: '−2 a concentración tras largas sesiones' },
  ],
  notes: '',
  imageDataUrl: undefined,
});

const HIT_DIE_MAX: Record<string, number> = { d6: 6, d8: 8, d10: 10, d12: 12 };

const slugifySkill = (name: string) =>
  name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-');

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
  roleValue?: RoleName
): Omit<Character, 'name' | 'imageDataUrl'> => {
  const race = RACES.find(r => r.value === raceValue);
  const cls = CLASSES.find(c => c.value === classValue);
  if (!race || !cls) return getEmptyCharacter();

  const scores: Record<AbilityName, number> = { FUE: 10, DES: 10, CON: 10, INT: 10, SAB: 10, CAR: 10 };
  scores[cls.primaryAbility] += 4;
  cls.savingThrows.forEach(ability => {
    if (ability !== cls.primaryAbility) scores[ability] += 2;
  });
  (Object.entries(race.abilityBonus) as [AbilityName, number][]).forEach(([ability, bonus]) => {
    scores[ability] += bonus;
  });

  const abilities: Ability[] = (Object.keys(scores) as AbilityName[]).map(name => ({
    name,
    score: scores[name],
    modifier: calculateModifier(scores[name]),
    savingThrowProficient: cls.savingThrows.includes(name),
  }));

  const role = ROLES.find(r => r.value === roleValue);
  const skills: Skill[] = (role?.focusSkills ?? []).map(skillName => {
    const def = ALL_SKILLS.find(s => s.name === skillName);
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
    background: exactPreset?.background ?? '',
    alignment: exactPreset?.alignment ?? '',
    xp: 0,
    hp: HIT_DIE_MAX[cls.hitDie] + calculateModifier(scores.CON),
    hitDie: cls.hitDie,
    armorClass: 10 + calculateModifier(scores.DES),
    initiative: calculateModifier(scores.DES),
    proficiencyBonus: 2,
    speed: race.speed,
    abilities,
    skills,
    classFeatures: exactPreset?.classFeatures ?? '',
    racialTraits: exactPreset?.racialTraits ?? race.trait,
    proficiencies: exactPreset?.proficiencies ?? '',
    equipment: exactPreset?.equipment ?? '',
    conditions: exactPreset?.conditions ?? createDefaultConditions(role?.label ?? cls.label),
    notes: '',
  };
};
