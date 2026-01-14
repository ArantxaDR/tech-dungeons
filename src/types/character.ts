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

export type ConditionName = 'INSPIRADA' | 'DESMORALIZADA' | 'AGOTADA' | 'ENVENENADA';

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

export const getDefaultFrontella = (): Character => ({
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

export const getDefaultBitgrun = (): Character => ({
  name: "Bitgrun MartilloAPI",
  race: "Enana",
  className: "Bárbara (Barbarian)",
  level: 1,
  background: "Guardiana de sistemas legacy",
  alignment: "Neutral buena",
  xp: 0,
  hp: 14,
  hitDie: "d12",
  armorClass: 14,
  initiative: 1,
  proficiencyBonus: 2,
  speed: 25,
  abilities: [
    { name: 'FUE', score: 15, modifier: 2, savingThrowProficient: true },
    { name: 'DES', score: 12, modifier: 1, savingThrowProficient: false },
    { name: 'CON', score: 14, modifier: 2, savingThrowProficient: true },
    { name: 'INT', score: 10, modifier: 0, savingThrowProficient: false },
    { name: 'SAB', score: 8, modifier: -1, savingThrowProficient: false },
    { name: 'CAR', score: 13, modifier: 1, savingThrowProficient: false },
  ],
  skills: [
    { id: 'atletismo', name: 'Atletismo', ability: 'FUE', baseModifier: 2, proficient: true, expertise: false },
    { id: 'investigacion', name: 'Investigación', ability: 'INT', baseModifier: 0, proficient: true, expertise: false },
    { id: 'percepcion', name: 'Percepción', ability: 'SAB', baseModifier: -1, proficient: false, expertise: false },
    { id: 'intimidacion', name: 'Intimidación', ability: 'CAR', baseModifier: 1, proficient: true, expertise: false },
    { id: 'supervivencia', name: 'Supervivencia', ability: 'SAB', baseModifier: -1, proficient: true, expertise: false },
    { id: 'persuasion', name: 'Persuasión', ability: 'CAR', baseModifier: 1, proficient: false, expertise: false },
    { id: 'historia', name: 'Historia', ability: 'INT', baseModifier: 0, proficient: false, expertise: false },
    { id: 'naturaleza', name: 'Naturaleza', ability: 'INT', baseModifier: 0, proficient: false, expertise: false },
    { id: 'perspicacia', name: 'Perspicacia', ability: 'SAB', baseModifier: -1, proficient: false, expertise: false },
    { id: 'medicina', name: 'Medicina', ability: 'SAB', baseModifier: -1, proficient: false, expertise: false },
  ],
  conditions: [
    { name: 'INSPIRADA', active: false, description: '+2 a tiradas técnicas (debug, diseño de API) tras resolver un bug difícil' },
    { name: 'DESMORALIZADA', active: false, description: '−2 en motivación tras varios incidentes seguidos sin reconocimiento' },
    { name: 'AGOTADA', active: false, description: '−2 en concentración tras muchas guardias/on-call seguidas' },
    { name: 'ENVENENADA', active: false, description: '−2 a comunicación y trabajo en equipo en entornos tóxicos' },
  ],
  classFeatures: `🔥 RABIA (RAGE)
Cuando entras en modo resolución de incidentes, ganas ventaja en tiradas de FUE (trabajo duro) y resistencia al daño emocional del legacy. 2 usos por descanso largo.

🛡️ DEFENSA SIN ARMADURA
Tu resiliencia personal te da AC = 10 + DES + CON cuando no llevas armadura pesada. La experiencia te ha curtido.

⚔️ ATAQUE FURIOSO
Durante la Rabia, puedes hacer un ataque adicional como acción bonus si usas el modificador de FUE.`,
  racialTraits: `⛏️ RESISTENCIA ENANA
Tienes ventaja en tiradas de salvación contra veneno y resistencia al daño por veneno. Los entornos tóxicos no te afectan tanto.

🏔️ ROBUSTEZ
Tu velocidad no se reduce por llevar armadura pesada. Puedes cargar con cualquier peso de responsabilidades.

🔧 AFINIDAD CON HERRAMIENTAS
Competencia con herramientas de artesano. Entiendes la estructura interna de cualquier sistema.

🦶 VELOCIDAD 25
Los enanos se mueven a 25 pies, pero llegan seguros. Prefieren la estabilidad a la velocidad.`,
  proficiencies: `🗡️ ARMAS: Armas simples, armas marciales, martillos de guerra, hachas

🛡️ ARMADURAS: Armaduras ligeras, medianas, escudos

🔧 HERRAMIENTAS: 
- APIs y bases de datos
- Scripts de automatización
- CLIs y terminales
- Sistemas de monitorización

🌐 IDIOMAS: 
- Común (Español)
- Enano (SQL)
- Lenguaje de sistemas (Bash/Shell)`,
  equipment: `📦 EQUIPO INICIAL:
- Armadura de cuero reforzada (AC 13 + DES)
- Martillo-servidor (1d10 contundente)
- 2 Hachas de mano (backup scripts)
- Pack de explorador de sistemas

💻 EQUIPO TECH:
- Consola de terminal legendaria
- Scripts de migración +3
- Repositorio de servicios backend
- Documentación de endpoints sagrada
- Grafana Dashboard de vigilancia
- PagerDuty de alertas críticas`,
  notes: '',
});

export const getDefaultPixaria = (): Character => ({
  name: "Pixaria Interfacea",
  race: "Semielfa",
  className: "Hechicera (Sorcerer)",
  level: 1,
  background: "Diseñadora de experiencias",
  alignment: "Caótica buena",
  xp: 0,
  hp: 8,
  hitDie: "d6",
  armorClass: 12,
  initiative: 1,
  proficiencyBonus: 2,
  speed: 30,
  abilities: [
    { name: 'FUE', score: 8, modifier: -1, savingThrowProficient: false },
    { name: 'DES', score: 13, modifier: 1, savingThrowProficient: false },
    { name: 'CON', score: 10, modifier: 0, savingThrowProficient: false },
    { name: 'INT', score: 12, modifier: 1, savingThrowProficient: false },
    { name: 'SAB', score: 14, modifier: 2, savingThrowProficient: true },
    { name: 'CAR', score: 15, modifier: 2, savingThrowProficient: true },
  ],
  skills: [
    { id: 'performance', name: 'Performance', ability: 'CAR', baseModifier: 2, proficient: true, expertise: true },
    { id: 'persuasion', name: 'Persuasión', ability: 'CAR', baseModifier: 2, proficient: true, expertise: false },
    { id: 'percepcion', name: 'Percepción', ability: 'SAB', baseModifier: 2, proficient: true, expertise: false },
    { id: 'perspicacia', name: 'Perspicacia', ability: 'SAB', baseModifier: 2, proficient: true, expertise: false },
    { id: 'investigacion', name: 'Investigación', ability: 'INT', baseModifier: 1, proficient: false, expertise: false },
    { id: 'historia', name: 'Historia', ability: 'INT', baseModifier: 1, proficient: false, expertise: false },
    { id: 'intimidacion', name: 'Intimidación', ability: 'CAR', baseModifier: 2, proficient: false, expertise: false },
    { id: 'engano', name: 'Engaño', ability: 'CAR', baseModifier: 2, proficient: false, expertise: false },
    { id: 'atletismo', name: 'Atletismo', ability: 'FUE', baseModifier: -1, proficient: false, expertise: false },
    { id: 'acrobacias', name: 'Acrobacias', ability: 'DES', baseModifier: 1, proficient: false, expertise: false },
  ],
  conditions: [
    { name: 'INSPIRADA', active: false, description: '+2 al defender diseños y presentar prototipos tras un buen test con usuarias' },
    { name: 'DESMORALIZADA', active: false, description: '−2 en tiradas sociales tras varias rondas de "hazlo más bonito" sin feedback útil' },
    { name: 'AGOTADA', active: false, description: '−2 en concentración cuando encadena muchas iteraciones urgentes' },
    { name: 'ENVENENADA', active: false, description: '−2 a decisiones de diseño cuando casi no tiene acceso a usuarias ni datos' },
  ],
  classFeatures: `✨ MAGIA DE PROTOTIPO
Convierte ideas en pantallas rápidamente. Puedes materializar wireframes y mockups con un gesto.

🔮 HECHIZOS DE USABILIDAD
Dominas tests de usuario, entrevistas y sesiones de feedback. Cada hechizo revela verdades sobre la experiencia.

🌀 HECHIZOS DE ILUSIÓN
Creas wireframes, mockups y prototipos interactivos que parecen productos reales antes de escribir una línea de código.`,
  racialTraits: `🧬 HERENCIA MIXTA (SEMIELFA)
Versátil y empática. Buen equilibrio entre análisis y trato con personas.

🌉 CONEXIÓN UNIVERSAL
Facilidad para conectar con perfiles técnicos y no técnicos por igual.

👁️ VISIÓN EN LA OSCURIDAD
Puedes ver en luz tenue a 60 pies. Útil para detectar problemas de contraste y accesibilidad.

💬 IDIOMAS EXTRA
Conoces un idioma adicional de tu elección.`,
  proficiencies: `🎨 HERRAMIENTAS:
- Figma y herramientas de prototipado
- Sistemas de diseño y librerías de componentes
- Herramientas de investigación UX

🌐 IDIOMAS: 
- Común (Español)
- Élfico (principios de diseño)
- Jerga UX/UI y términos de producto`,
  equipment: `📦 EQUIPO INICIAL:
- Ropa cómoda de trabajo (AC 10 + DES)
- Portátil encantado
- Tablet para dibujar bocetos
- Cuaderno de ideas

💻 EQUIPO TECH:
- Biblioteca de componentes
- Sistema de diseño compartido
- Plantillas de tests de usuario
- Colección de patrones de interacción
- Suscripción a Figma Premium
- Libros de Nielsen Norman Group`,
  notes: '',
});

export const getDefaultStackia = (): Character => ({
  name: "Stackia Caminacódigo",
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
  abilities: [
    { name: 'FUE', score: 13, modifier: 1, savingThrowProficient: true },
    { name: 'DES', score: 14, modifier: 2, savingThrowProficient: true },
    { name: 'CON', score: 12, modifier: 1, savingThrowProficient: false },
    { name: 'INT', score: 15, modifier: 2, savingThrowProficient: false },
    { name: 'SAB', score: 10, modifier: 0, savingThrowProficient: false },
    { name: 'CAR', score: 8, modifier: -1, savingThrowProficient: false },
  ],
  skills: [
    { id: 'supervivencia', name: 'Supervivencia', ability: 'SAB', baseModifier: 0, proficient: true, expertise: false },
    { id: 'investigacion', name: 'Investigación', ability: 'INT', baseModifier: 2, proficient: true, expertise: false },
    { id: 'naturaleza', name: 'Naturaleza', ability: 'INT', baseModifier: 2, proficient: true, expertise: false },
    { id: 'percepcion', name: 'Percepción', ability: 'SAB', baseModifier: 0, proficient: true, expertise: false },
    { id: 'perspicacia', name: 'Perspicacia', ability: 'SAB', baseModifier: 0, proficient: true, expertise: false },
    { id: 'atletismo', name: 'Atletismo', ability: 'FUE', baseModifier: 1, proficient: false, expertise: false },
    { id: 'sigilo', name: 'Sigilo', ability: 'DES', baseModifier: 2, proficient: false, expertise: false },
    { id: 'historia', name: 'Historia', ability: 'INT', baseModifier: 2, proficient: false, expertise: false },
    { id: 'acrobacias', name: 'Acrobacias', ability: 'DES', baseModifier: 2, proficient: false, expertise: false },
    { id: 'medicina', name: 'Medicina', ability: 'SAB', baseModifier: 0, proficient: false, expertise: false },
  ],
  conditions: [
    { name: 'INSPIRADA', active: false, description: '+2 al explicar arquitectura y decisiones técnicas tras completar una feature end-to-end' },
    { name: 'DESMORALIZADA', active: false, description: '−2 al profundizar en un tema cuando siente que tiene demasiados frentes abiertos' },
    { name: 'AGOTADA', active: false, description: '−2 a concentración tras mucho context switching entre frontend, backend y devops' },
  ],
  classFeatures: `🗺️ EXPLORADORA DEL STACK
Entiende desde la base de datos hasta la UI. Puede navegar cualquier capa de la arquitectura.

🔍 RASTREADORA DE BUGS
Sigue el rastro de logs y errores a través de todo el sistema. Ventaja en tiradas de debugging.

📐 MAPAS DE ARQUITECTURA
Dibuja cómo encajan todas las piezas. Puede visualizar dependencias y flujos de datos.`,
  racialTraits: `🍀 SUERTE MEDIANA
Cuando sacas un 1 en un d20, puedes volver a tirar y usar el nuevo resultado. Los deploys fallidos a veces se arreglan solos.

🏃 AGILIDAD MEDIANA
Puedes moverte a través del espacio de criaturas más grandes. Te cuelas por todos los rincones del stack.

⚡ VALIENTE
Tienes ventaja en tiradas contra miedo. Los deadlines imposibles no te asustan.

🦶 VELOCIDAD 25
Los medianos se mueven a 25 pies. Pequeña pero constante.`,
  proficiencies: `🌐 DESARROLLO:
- Frontend y backend web
- APIs REST y GraphQL
- Bases de datos SQL y NoSQL

🔧 HERRAMIENTAS: 
- Terminal y línea de comandos
- Navegador y DevTools
- Cliente de base de datos
- Herramientas de logs y monitorización

🌍 IDIOMAS: 
- Común (Español)
- Mediano (JavaScript/TypeScript)
- Lengua de sistemas (Python/Node)`,
  equipment: `📦 EQUIPO INICIAL:
- Armadura de cuero reforzada (AC 12 + DES)
- Arco corto + 20 flechas
- 2 Espadas cortas
- Pack de explorador

💻 EQUIPO TECH:
- Portátil todoterreno
- Mochila llena de cables y adaptadores
- Diagrama de arquitectura enrollado
- Scripts de deploy automatizados
- Acceso a múltiples entornos (dev, staging, prod)
- Terminal con aliases personalizados`,
  notes: '',
});

export const getDefaultBugaria = (): Character => ({
  name: "Bugaria OjoFino",
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
  abilities: [
    { name: 'FUE', score: 10, modifier: 0, savingThrowProficient: true },
    { name: 'DES', score: 15, modifier: 2, savingThrowProficient: true },
    { name: 'CON', score: 12, modifier: 1, savingThrowProficient: false },
    { name: 'INT', score: 13, modifier: 1, savingThrowProficient: false },
    { name: 'SAB', score: 14, modifier: 2, savingThrowProficient: false },
    { name: 'CAR', score: 8, modifier: -1, savingThrowProficient: false },
  ],
  skills: [
    { id: 'percepcion', name: 'Percepción', ability: 'SAB', baseModifier: 2, proficient: true, expertise: true },
    { id: 'perspicacia', name: 'Perspicacia', ability: 'SAB', baseModifier: 2, proficient: true, expertise: false },
    { id: 'acrobacias', name: 'Acrobacias', ability: 'DES', baseModifier: 2, proficient: true, expertise: false },
    { id: 'investigacion', name: 'Investigación', ability: 'INT', baseModifier: 1, proficient: true, expertise: false },
    { id: 'atletismo', name: 'Atletismo', ability: 'FUE', baseModifier: 0, proficient: false, expertise: false },
    { id: 'historia', name: 'Historia', ability: 'INT', baseModifier: 1, proficient: false, expertise: false },
    { id: 'persuasion', name: 'Persuasión', ability: 'CAR', baseModifier: -1, proficient: false, expertise: false },
    { id: 'sigilo', name: 'Sigilo', ability: 'DES', baseModifier: 2, proficient: false, expertise: false },
    { id: 'medicina', name: 'Medicina', ability: 'SAB', baseModifier: 2, proficient: false, expertise: false },
    { id: 'intimidacion', name: 'Intimidación', ability: 'CAR', baseModifier: -1, proficient: false, expertise: false },
  ],
  conditions: [
    { name: 'INSPIRADA', active: false, description: '+2 a encontrar bugs críticos cuando su feedback es escuchado y valorado' },
    { name: 'DESMORALIZADA', active: false, description: '−2 a motivación cuando su rol se percibe como "solo hacer clics"' },
    { name: 'AGOTADA', active: false, description: '−2 a concentración cuando siempre llega tarde al proceso (testing al final)' },
  ],
  classFeatures: `🧘 DISCIPLINA DEL MONJE
Rutinas de regresión y checks repetitivos sin perder foco. La constancia es tu mayor virtud.

👊 GOLPES PRECISOS
Tests que van directo al punto. Cada caso de prueba es un ataque certero al código.

🏃 MOVIMIENTO SIN ARMADURA
Se adapta rápido a nuevos entornos, dispositivos, navegadores. AC = 10 + DES + SAB.`,
  racialTraits: `🧬 VERSATILIDAD HUMANA
Capaz de aprender lo que haga falta para asegurar calidad. +1 a dos características de tu elección.

📚 HABILIDAD EXTRA
Los humanos ganan una habilidad adicional de su elección. Flexibilidad para especializarse.

🦶 VELOCIDAD 30
Ritmo estándar. Ni demasiado rápido ni demasiado lento.`,
  proficiencies: `🔧 HERRAMIENTAS DE TESTING:
- Testing manual y exploratorio
- Suites de pruebas automatizadas
- Herramientas de reporte de bugs

📋 METODOLOGÍAS:
- Casos de prueba y checklists
- Testing de regresión
- Pruebas de aceptación

🌐 IDIOMAS: 
- Común (Español)
- Lenguaje de testing (Gherkin/BDD)
- Jerga de calidad (ISTQB)`,
  equipment: `📦 EQUIPO INICIAL:
- Túnica de monje (AC 10 + DES + SAB)
- Bastón de combate (1d6/1d8 contundente)
- 10 Dardos de precisión
- Pack de explorador

💻 EQUIPO TECH:
- Tablero de pruebas Kanban
- Lista de casos de test exhaustiva
- Herramientas de reporte (Jira, Linear)
- Checklist de regresión sagrada
- Dispositivos de prueba variados
- Extensiones de accesibilidad`,
  notes: '',
});

// Alias for backward compatibility
export const getDefaultCharacter = getDefaultFrontella;
