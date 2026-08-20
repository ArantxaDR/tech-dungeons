import type { Dispatch, SetStateAction } from 'react';
import type { IconType } from 'react-icons';

import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AbilitiesSection } from '@/components/AbilitiesSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ConditionsSection } from '@/components/ConditionsSection';

import type { Character, CharacterFeature } from '@/types/character';
import type { DraftCharacter } from '@/data/customCharacters';
import { ROLES } from '@/data/characterPresets';
import demonImg from '@/assets/demon.webp';

import {
  GiAxeSword,
  GiBandana,
  GiDwarfFace,
  GiWizardStaff,
} from 'react-icons/gi';

interface CharacterPreviewProps {
  character: DraftCharacter;
  setCharacter: Dispatch<SetStateAction<DraftCharacter>>;
}

type DetailField =
  | 'classFeatures'
  | 'racialTraits'
  | 'proficiencies'
  | 'equipment';

interface DetailBlock {
  field: DetailField;
  icon: IconType;
  title: string;
}

const DETAIL_BLOCKS: DetailBlock[] = [
  {
    field: 'classFeatures',
    icon: GiBandana,
    title: 'Rasgos de Clase',
  },
  {
    field: 'racialTraits',
    icon: GiDwarfFace,
    title: 'Rasgos Raciales',
  },
  {
    field: 'proficiencies',
    icon: GiWizardStaff,
    title: 'Competencias',
  },
  {
    field: 'equipment',
    icon: GiAxeSword,
    title: 'Equipo',
  },
];

const hasContent = (
  value: CharacterFeature[] | string | undefined
): boolean => {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return Boolean(value?.trim());
};

const FeatureList = ({ features }: { features: CharacterFeature[] }) => {
  return (
    <div className="space-y-4">
      {features.map((feature) => {
        const FeatureIcon = feature.icon;

        return (
          <article
            key={feature.id}
            className="flex gap-3 rounded-lg border border-border bg-muted p-4"
          >
            <FeatureIcon
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 fill-primary text-primary"
            />

            <div>
              <h3 className="font-bold text-foreground">{feature.title}</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export const CharacterPreview = ({
  character,
  setCharacter,
}: CharacterPreviewProps) => {
  const roleLabel =
    ROLES.find((role) => role.value === character.role)?.label ||
    character.role;

  const updateField = <K extends keyof Character>(
    field: K,
    value: Character[K]
  ) => {
    setCharacter((previousCharacter) => ({
      ...previousCharacter,
      [field]: value,
    }));
  };

  const getDetailValue = (field: DetailField) => {
    return character[field];
  };

  const visibleDetails = DETAIL_BLOCKS.filter((block) =>
    hasContent(getDetailValue(block.field))
  );

  return (
    <div className="space-y-6">
      <div className="rpg-card">
        <h2 className="section-title">Vista Previa</h2>

        <div className="flex items-start gap-4">
          {character.imageDataUrl ? (
            <img
              src={character.imageDataUrl}
              alt={character.name || 'Avatar del personaje'}
              className="h-24 w-24 rounded-lg border-2 border-primary object-cover"
            />
          ) : (
            <img
              src={demonImg}
              alt=""
              aria-hidden="true"
              className="h-24 w-24 rounded-lg border-2 border-dashed border-muted-foreground/30 object-cover"
            />
          )}

          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground">
              {character.name || 'Sin nombre'}
            </h3>

            <p className="font-medium text-primary">
              {roleLabel || 'Sin rol'}
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="outline">
                {character.race || 'Sin raza'}
              </Badge>

              <Badge variant="secondary">
                {character.className || 'Sin clase'}
              </Badge>

              <Badge>Nivel {character.level}</Badge>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-3">
          <div className="stat-box min-w-0">
            <span className="mb-1 text-[10px] uppercase text-muted-foreground sm:text-xs">
              HP
            </span>

            <input
              type="number"
              min={0}
              value={character.hp}
              onChange={(event) =>
                updateField('hp', Number(event.target.value) || 0)
              }
              className="stat-value w-full border-none bg-transparent text-center text-sm focus:outline-none sm:text-lg"
              aria-label="Puntos de golpe"
            />
          </div>

          <div className="stat-box min-w-0">
            <span className="mb-1 text-[10px] uppercase text-muted-foreground sm:text-xs">
              CA
            </span>

            <input
              type="number"
              min={0}
              value={character.armorClass}
              onChange={(event) =>
                updateField('armorClass', Number(event.target.value) || 0)
              }
              className="stat-value w-full border-none bg-transparent text-center text-sm focus:outline-none sm:text-lg"
              aria-label="Clase de armadura"
            />
          </div>

          <div className="stat-box min-w-0">
            <span className="mb-1 text-[10px] uppercase text-muted-foreground sm:text-xs">
              Inic.
            </span>

            <span className="stat-modifier stat-modifier-positive text-sm sm:text-xl">
              {character.initiative >= 0 ? '+' : ''}
              {character.initiative}
            </span>
          </div>

          <div className="stat-box min-w-0">
            <span className="mb-1 text-[10px] uppercase text-muted-foreground sm:text-xs">
              Vel.
            </span>

            <input
              type="number"
              min={0}
              value={character.speed}
              onChange={(event) =>
                updateField('speed', Number(event.target.value) || 0)
              }
              className="stat-value w-full border-none bg-transparent text-center text-sm focus:outline-none sm:text-lg"
              aria-label="Velocidad"
            />
          </div>
        </div>
      </div>

      <AbilitiesSection
        character={character}
        setCharacter={setCharacter}
      />

      <SkillsSection
        character={character}
        setCharacter={setCharacter}
        allowManualSkills
      />

      <ConditionsSection
        character={character}
        setCharacter={setCharacter}
      />

      {visibleDetails.length > 0 && (
        <div className="rpg-card">
          <h2 className="section-title">Detalles</h2>

          <Accordion type="multiple">
            {visibleDetails.map((block) => {
              const BlockIcon = block.icon;
              const content = getDetailValue(block.field);

              return (
                <AccordionItem key={block.field} value={block.field}>
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <BlockIcon
                        aria-hidden="true"
                        className="size-5 shrink-0 fill-primary text-primary"
                      />

                      {block.title}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent>
                    {Array.isArray(content) ? (
                      <FeatureList features={content} />
                    ) : (
                      <div className="whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm text-muted-foreground">
                        {content}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      )}
    </div>
  );
};