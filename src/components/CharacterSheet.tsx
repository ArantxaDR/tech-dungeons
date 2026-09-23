import type { Dispatch, SetStateAction } from 'react';
import type { IconType } from 'react-icons';

import type { Character, CharacterFeature } from '@/types/character';

import { HeaderSection } from './HeaderSection';
import { AbilitiesSection } from './AbilitiesSection';
import { SkillsSection } from './SkillsSection';
import { ConditionsSection } from './ConditionsSection';
import { TextBlock } from './TextBlock';
import { CharacterNav } from './CharacterNav';
import { BorderDivider } from './BorderDivider';
import { PageMargins } from './PageMargins';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import {
  GiAxeSword,
  GiBandana,
  GiDwarfFace,
  GiSparkles,
  GiWizardStaff,
} from 'react-icons/gi';

type DetailField =
  | 'classFeatures'
  | 'racialTraits'
  | 'proficiencies'
  | 'equipment';

interface DetailBlock {
  field: DetailField;
  icon: IconType;
  title: string;
  placeholder: string;
}

const DETAIL_BLOCKS: DetailBlock[] = [
  {
    field: 'classFeatures',
    icon: GiBandana,
    title: 'Rasgos de Clase',
    placeholder: 'Escribe los rasgos de clase aquí...',
  },
  {
    field: 'racialTraits',
    icon: GiDwarfFace,
    title: 'Rasgos Raciales',
    placeholder: 'Escribe los rasgos raciales aquí...',
  },
  {
    field: 'proficiencies',
    icon: GiWizardStaff,
    title: 'Competencias',
    placeholder: 'Armas, armaduras, herramientas, idiomas...',
  },
  {
    field: 'equipment',
    icon: GiAxeSword,
    title: 'Equipo',
    placeholder: 'Lista tu equipo aquí...',
  },
];

interface CharacterSheetProps {
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character>>;
  avatarSrc?: string;
}

const hasDetailContent = (
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

              <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export const CharacterSheet = ({
  character,
  setCharacter,
  avatarSrc,
}: CharacterSheetProps) => {
  const updateNotes = (value: string) => {
    setCharacter((previousCharacter) => ({
      ...previousCharacter,
      notes: value,
    }));
  };


  const visibleDetails = DETAIL_BLOCKS.filter((block) =>
    hasDetailContent(character[block.field])
  );

  return (
    <PageMargins>
      <div className="mx-auto w-full max-w-6xl space-y-4 overflow-x-hidden p-2 sm:space-y-6 sm:p-4">
        <CharacterNav />

        <header className="py-4 text-center">
          <h1 className="mb-2 font-display text-xl text-primary text-glow-primary md:text-2xl">
            HOJA DE PERSONAJE
          </h1>

          <p className="text-secondary">Developer Quest</p>
        </header>

        <BorderDivider variant="interlace" className="mb-2" />

        <HeaderSection
          character={character}
          setCharacter={setCharacter}
          avatarSrc={avatarSrc}
          readOnly
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <AbilitiesSection
              character={character}
              setCharacter={setCharacter}
              readOnly
            />

            <SkillsSection
              character={character}
              setCharacter={setCharacter}
              readOnly
            />
          </div>

          <div className="space-y-6">
            <ConditionsSection
              character={character}
              setCharacter={setCharacter}
              readOnly
            />

            {visibleDetails.length > 0 && (
              <div className="rpg-card">
                <h2 className="section-title">Detalles</h2>

                <Accordion
                  type="multiple"
                  defaultValue={['classFeatures']}
                >
                  {visibleDetails.map((block) => {
                    const BlockIcon = block.icon;
                    const content = character[block.field];

                    return (
                      <AccordionItem
                        key={block.field}
                        value={block.field}
                      >
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
                              {content || block.placeholder}
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
        </div>

        <TextBlock
          title="Notas"
          value={character.notes}
          onChange={updateNotes}
          placeholder="Apuntes de sesión, objetivos, ideas..."
          readOnly
        />

        <BorderDivider variant="vine" className="mt-2" />

        <footer className="flex items-center justify-center gap-2 py-6 text-center text-sm text-muted-foreground">
          <GiSparkles
            aria-hidden="true"
            className="size-4 shrink-0 fill-secondary text-secondary"
          />

          <p>
            Hoja de referencia — no editable. Crea tu propio personaje para
            personalizarla.
          </p>
        </footer>
      </div>
    </PageMargins>
  );
};