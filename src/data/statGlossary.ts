import type { AbilityName } from '@/types/character';

/** Every abbreviation shown in the sheets. Keys must match what the UI renders. */
export type StatKey = AbilityName | 'HP' | 'CA' | 'INIC' | 'VEL' | 'ATR' | 'P' | 'E';

export interface StatDefinition {
  abbr: string;
  label: string;
  description: string;
}

export const STAT_GLOSSARY: Record<StatKey, StatDefinition> = {
  FUE: {
    abbr: 'FUE',
    label: 'Fuerza',
    description: 'Potencia física: golpes, carga y pruebas de atletismo.',
  },
  DES: {
    abbr: 'DES',
    label: 'Destreza',
    description: 'Reflejos y puntería: sigilo, equilibrio y esquivar.',
  },
  CON: {
    abbr: 'CON',
    label: 'Constitución',
    description: 'Resistencia y aguante: turnos largos y despliegues de madrugada.',
  },
  INT: {
    abbr: 'INT',
    label: 'Inteligencia',
    description: 'Razonamiento y memoria: conocimiento técnico e investigación.',
  },
  SAB: {
    abbr: 'SAB',
    label: 'Sabiduría',
    description: 'Percepción e intuición: leer la sala y detectar el bug raro.',
  },
  CAR: {
    abbr: 'CAR',
    label: 'Carisma',
    description: 'Presencia y persuasión: liderar, negociar y presentar.',
  },
  HP: {
    abbr: 'HP',
    label: 'Puntos de golpe',
    description: 'Vida disponible: si llega a 0, la heroína cae.',
  },
  CA: {
    abbr: 'CA',
    label: 'Clase de armadura',
    description: 'Dificultad para acertarte: cuanto más alta, más esquivas los golpes.',
  },
  INIC: {
    abbr: 'Inic.',
    label: 'Iniciativa',
    description: 'Orden de turno en combate: quién actúa primero.',
  },
  VEL: {
    abbr: 'Vel.',
    label: 'Velocidad',
    description: 'Casillas que puedes recorrer en tu turno, medidas en pies.',
  },
  ATR: {
    abbr: 'Atr',
    label: 'Atributo',
    description: 'Estadística que suma a esta habilidad.',
  },
  P: {
    abbr: 'P',
    label: 'Competencia',
    description: 'Sumas tu bono de competencia a esta habilidad.',
  },
  E: {
    abbr: 'E',
    label: 'Expertise',
    description: 'Sumas el doble del bono de competencia a esta habilidad.',
  },
};

export const ABILITY_LABELS: Record<AbilityName, string> = {
  FUE: STAT_GLOSSARY.FUE.label,
  DES: STAT_GLOSSARY.DES.label,
  CON: STAT_GLOSSARY.CON.label,
  INT: STAT_GLOSSARY.INT.label,
  SAB: STAT_GLOSSARY.SAB.label,
  CAR: STAT_GLOSSARY.CAR.label,
};
