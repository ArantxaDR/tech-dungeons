import type { Dispatch, SetStateAction } from 'react';
import type { IconType } from 'react-icons';

import type { Character } from '@/types/character';

import { HeaderSection } from './HeaderSection';
import { AbilitiesSection } from './AbilitiesSection';
import { SkillsSection } from './SkillsSection';
import { ConditionsSection } from './ConditionsSection';
import { TextBlock } from './TextBlock';
import { CharacterNav } from './CharacterNav';
import { BorderDivider } from './BorderDivider';
import { PageMargins } from './PageMargins';
import { FeatureList } from './FeatureList';
import { hasDetailContent, type DetailBlock } from '@/lib/characterDetails';

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
      <div className="mx-auto w-full max-w-6xl space-y-4 overflow-x-clip p-2 sm:space-y-6 sm:p-4">
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