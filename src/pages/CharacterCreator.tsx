import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { GiArrowCursor as ArrowLeft, GiBookCover as BookOpen } from 'react-icons/gi';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { CharacterForm } from '@/components/CharacterForm';
import { CharacterPreview } from '@/components/CharacterPreview';
import { ExportButtons } from '@/components/ExportButtons';
import { FieldError } from '@/components/FieldError';
import { BorderDivider } from '@/components/BorderDivider';
import { PageMargins } from '@/components/PageMargins';
import { useCharacterDraft } from '@/hooks/useCharacterDraft';
import { useCharacterExport } from '@/hooks/useCharacterExport';
import { useCharacterValidation } from '@/hooks/useCharacterValidation';
import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';
import { isCharacterDirty } from '@/lib/characterDraft';
import { getFieldElementId, type ValidationField } from '@/lib/characterValidation';
import { getEmptyCharacter } from '@/data/characterPresets';
import { getCustomCharacters, saveCustomCharacter } from '@/data/customCharacters';
import manDogImg from '@/assets/man-dog.webp';

const CharacterCreator = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const characterId = searchParams.get('id') ?? undefined;
  const { character, setCharacter, releaseNewCharacterSlot } = useCharacterDraft(characterId);
  const { isExporting, downloadPdf, downloadJson } = useCharacterExport();
  const [savedVersion, setSavedVersion] = useState(0);

  // The version of the character that is already in the list, if any.
  const savedCharacter = useMemo(
    () => (characterId ? getCustomCharacters().find((c) => c.id === characterId) : undefined),
    // savedVersion busts the cache every time the character is saved.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [characterId, savedVersion],
  );

  const {
    visibleErrors,
    sheetErrors,
    revealed,
    isValid,
    firstInvalidField,
    markTouched,
    revealAll,
    reset: resetValidation,
  } = useCharacterValidation(character, characterId);

  const isDirty = useMemo(
    () => isCharacterDirty(character, savedCharacter),
    [character, savedCharacter],
  );

  const guardMessage = characterId
    ? `Tienes cambios sin guardar en "${character.name || 'tu personaje'}". Si sales, se quedan en el borrador y no se publicarán hasta que pulses "Guardar Personaje". ¿Salir de todos modos?`
    : 'Este personaje todavía no está en tu lista. Si sales, seguirá en el borrador y podrás volver a él. ¿Salir de todos modos?';

  const { markClean } = useUnsavedChangesGuard(isDirty, guardMessage);

  const handleReset = () => {
    if (characterId && savedCharacter) {
      // Editing: throw away the local edits and go back to the saved version.
      setCharacter(savedCharacter);
      resetValidation();
      return;
    }
    setCharacter(getEmptyCharacter());
    resetValidation();
  };

  const focusFirstInvalid = (field?: ValidationField) => {
    if (!field) return;
    const element = document.getElementById(getFieldElementId(field));
    if (!element) return;
    element.focus();
    element.scrollIntoView?.({ behavior: 'smooth', block: 'center' });
  };

  const handleSave = () => {
    if (!isValid) {
      revealAll();
      toast.error('No se pudo guardar', {
        description: 'Revisa los campos marcados antes de guardar.',
      });
      focusFirstInvalid(firstInvalidField);
      return;
    }
    const id = characterId ?? crypto.randomUUID();
    try {
      saveCustomCharacter({ ...character, id });
    } catch {
      toast.error('No se pudo guardar: almacenamiento lleno. Prueba con una imagen más pequeña o borra algún personaje.');
      return;
    }
    setSavedVersion((version) => version + 1);
    if (!characterId) {
      // The character now has a slot of its own, so the new-character one is free.
      releaseNewCharacterSlot();
      // The guard must not block the navigation that shows the saved character.
      markClean();
      setSearchParams({ id });
    }
    toast.success(`${character.name} guardado — ya está en la página principal.`);
  };

  return (
    <PageMargins className="min-h-screen">
        {/* Header */}
        <header className="py-6 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/manual">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Manual
                </Link>
              </Button>
            </div>
            <h1 className="flex items-center gap-3 text-3xl md:text-4xl font-bold text-primary">
              <img
                src={manDogImg}
                alt=""
                aria-hidden="true"
                className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-lg object-cover border-2 border-primary/40"
              />
              Creadora de Personajes
            </h1>
            <p className="text-muted-foreground mt-2">
              Diseña tu propia heroína tech con stats personalizados
            </p>
          </div>
        </header>

        <BorderDivider variant="interlace" className="max-w-2xl mx-auto" />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-8 px-4">
          {revealed && sheetErrors.length > 0 && (
            <div className="mb-6 rpg-card border-destructive/60">
              {sheetErrors.map((message, index) => (
                <FieldError key={message} id={`sheet-error-${index}`} message={message} />
              ))}
            </div>
          )}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div>
              <CharacterForm
                character={character}
                setCharacter={setCharacter}
                onReset={handleReset}
                onSave={handleSave}
                errors={visibleErrors}
                markTouched={markTouched}
                isEditing={Boolean(characterId)}
              />

              <div className="mt-6">
                <ExportButtons
                  character={character}
                  onDownloadPdf={downloadPdf}
                  onDownloadJson={downloadJson}
                  isExporting={isExporting}
                />
              </div>
            </div>

            {/* Preview */}
            <div>
              <CharacterPreview
                character={character}
                setCharacter={setCharacter}
                errors={visibleErrors}
                markTouched={markTouched}
              />
            </div>
          </div>
        </main>

        <BorderDivider variant="vine" className="max-w-2xl mx-auto" />

        {/* Footer */}
        <footer className="py-6 text-center">
          <p className="text-sm text-muted-foreground">
            El borrador se guarda solo. Pulsa "Guardar Personaje" para añadirlo a tu lista en la página principal.
          </p>
        </footer>
    </PageMargins>
  );
};

export default CharacterCreator;
