import { useMemo } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { IconType } from 'react-icons';

import { Badge } from '@/components/ui/badge';
import { StatTooltip } from '@/components/StatTooltip';
import { FieldError } from '@/components/FieldError';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AbilitiesSection } from '@/components/AbilitiesSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ConditionsSection } from '@/components/ConditionsSection';
import { FeatureList } from '@/components/FeatureList';
import { hasDetailContent, type DetailBlock } from '@/lib/characterDetails';
import type { ValidationErrors, ValidationField } from '@/lib/characterValidation';

import type { Ability, Character } from '@/types/character';
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
  /** Validation messages of the fields this preview owns. */
  errors?: ValidationErrors;
  /** Called when the player leaves a field, so it can show its error. */
  markTouched?: (field: ValidationField) => void;
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

export const CharacterPreview = ({
  character,
  setCharacter,
  errors = {},
  markTouched,
}: CharacterPreviewProps) => {
  const roleLabel =
    ROLES.find((role) => role.value === character.role)?.label ||
    character.role;

  const abilityErrors = useMemo(() => {
    const result: Partial<Record<Ability['name'], string>> = {};
    (Object.keys(errors) as ValidationField[]).forEach((field) => {
      if (!field.startsWith('ability:')) return;
      const message = errors[field];
      if (message) result[field.slice('ability:'.length) as Ability['name']] = message;
    });
    return result;
  }, [errors]);

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
    hasDetailContent(getDetailValue(block.field))
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

        <div
          id="stats-section"
          tabIndex={-1}
          aria-label="Estadísticas del personaje"
          className="mt-6 grid scroll-mt-4 grid-cols-4 gap-2 sm:gap-3 focus:outline-none"
        >
          <div className="stat-box min-w-0">
            <StatTooltip stat="HP" className="mb-1 text-[10px] sm:text-xs" />

            <input
              id="hp"
              type="number"
              min={1}
              value={character.hp}
              onChange={(event) =>
                updateField('hp', Number(event.target.value) || 0)
              }
              onBlur={() => markTouched?.('hp')}
              aria-invalid={errors.hp ? true : undefined}
              aria-describedby={errors.hp ? 'hp-error' : undefined}
              className={cn(
                'stat-value w-full border-none bg-transparent text-center text-sm focus:outline-none sm:text-lg',
                errors.hp && 'text-destructive',
              )}
              aria-label="Puntos de golpe"
            />
            <FieldError id="hp-error" message={errors.hp} />
          </div>

          <div className="stat-box min-w-0">
            <StatTooltip stat="CA" className="mb-1 text-[10px] sm:text-xs" />

            <input
              id="armorClass"
              type="number"
              min={1}
              value={character.armorClass}
              onChange={(event) =>
                updateField('armorClass', Number(event.target.value) || 0)
              }
              onBlur={() => markTouched?.('armorClass')}
              aria-invalid={errors.armorClass ? true : undefined}
              aria-describedby={errors.armorClass ? 'armorClass-error' : undefined}
              className={cn(
                'stat-value w-full border-none bg-transparent text-center text-sm focus:outline-none sm:text-lg',
                errors.armorClass && 'text-destructive',
              )}
              aria-label="Clase de armadura"
            />
            <FieldError id="armorClass-error" message={errors.armorClass} />
          </div>

          <div className="stat-box min-w-0">
            <StatTooltip stat="INIC" className="mb-1 text-[10px] sm:text-xs" />

            <span className="stat-modifier stat-modifier-positive text-sm sm:text-xl">
              {character.initiative >= 0 ? '+' : ''}
              {character.initiative}
            </span>
          </div>

          <div className="stat-box min-w-0">
            <StatTooltip stat="VEL" className="mb-1 text-[10px] sm:text-xs" />

            <input
              id="speed"
              type="number"
              min={0}
              value={character.speed}
              onChange={(event) =>
                updateField('speed', Number(event.target.value) || 0)
              }
              onBlur={() => markTouched?.('speed')}
              aria-invalid={errors.speed ? true : undefined}
              aria-describedby={errors.speed ? 'speed-error' : undefined}
              className={cn(
                'stat-value w-full border-none bg-transparent text-center text-sm focus:outline-none sm:text-lg',
                errors.speed && 'text-destructive',
              )}
              aria-label="Velocidad"
            />
            <FieldError id="speed-error" message={errors.speed} />
          </div>
        </div>
      </div>

      <AbilitiesSection
        character={character}
        setCharacter={setCharacter}
        errors={abilityErrors}
        markTouched={markTouched}
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

          <Accordion type="multiple" defaultValue={['classFeatures']}>
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