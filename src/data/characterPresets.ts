import { Character, Ability, Skill, Condition } from '@/types/character';

export type RoleName = 'frontend' | 'backend' | 'full-stack' | 'ux-ui' | 'qa' | 'devops' | 'data-ml' | 'product' | 'eng-manager';
export type ClassName = 'Pícara' | 'Bárbara' | 'Exploradora' | 'Hechicera' | 'Monja' | 'Clériga' | 'Maga' | 'Barda' | 'Paladina';
export type RaceName = 'Elfa' | 'Enana' | 'Mediana' | 'Semielfa' | 'Humana';

export const ROLES: { value: RoleName; label: string }[] = [
  { value: 'frontend', label: 'Frontend Developer' },
  { value: 'backend', label: 'Backend Developer' },
  { value: 'full-stack', label: 'Full-Stack Developer' },
  { value: 'ux-ui', label: 'UX/UI Designer' },
  { value: 'qa', label: 'QA / Test Engineer' },
  { value: 'devops', label: 'DevOps / SRE' },
  { value: 'data-ml', label: 'Data / ML Engineer' },
  { value: 'product', label: 'Product Manager' },
  { value: 'eng-manager', label: 'Engineering Manager' },
];

export const CLASSES: { value: ClassName; label: string; suggestedRole: RoleName }[] = [
  { value: 'Pícara', label: 'Pícara (Rogue)', suggestedRole: 'frontend' },
  { value: 'Bárbara', label: 'Bárbara (Barbarian)', suggestedRole: 'backend' },
  { value: 'Exploradora', label: 'Exploradora (Ranger)', suggestedRole: 'full-stack' },
  { value: 'Hechicera', label: 'Hechicera (Sorcerer)', suggestedRole: 'ux-ui' },
  { value: 'Monja', label: 'Monja (Monk)', suggestedRole: 'qa' },
  { value: 'Clériga', label: 'Clériga (Cleric)', suggestedRole: 'devops' },
  { value: 'Maga', label: 'Maga (Wizard)', suggestedRole: 'data-ml' },
  { value: 'Barda', label: 'Barda (Bard)', suggestedRole: 'product' },
  { value: 'Paladina', label: 'Paladina (Paladin)', suggestedRole: 'eng-manager' },
];

export const RACES: { value: RaceName; label: string; speed: number }[] = [
  { value: 'Elfa', label: 'Elfa', speed: 30 },
  { value: 'Enana', label: 'Enana', speed: 25 },
  { value: 'Mediana', label: 'Mediana (Halfling)', speed: 25 },
  { value: 'Semielfa', label: 'Semielfa', speed: 30 },
  { value: 'Humana', label: 'Humana', speed: 30 },
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
