import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiArrowLeft as ArrowLeft, FiBookOpen as BookOpen } from 'react-icons/fi';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { CharacterForm } from '@/components/CharacterForm';
import { CharacterPreview } from '@/components/CharacterPreview';
import { BorderDivider } from '@/components/BorderDivider';
import { PageMargins } from '@/components/PageMargins';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { getEmptyCharacter } from '@/data/characterPresets';
import { getCustomCharacters, saveCustomCharacter, DraftCharacter } from '@/data/customCharacters';
import manDogImg from '@/assets/man-dog.webp';

const CharacterCreator = () => {
  const [character, setCharacter] = useLocalStorageState<DraftCharacter>(
    'character-creator',
    getEmptyCharacter()
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [characterId, setCharacterId] = useState(searchParams.get('id') ?? undefined);

  // Editing an existing saved character: load it into the draft once.
  useEffect(() => {
    const id = searchParams.get('id');
    if (!id) return;
    const existing = getCustomCharacters().find(c => c.id === id);
    if (existing) {
      setCharacter(existing);
      setCharacterId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => {
    setCharacter(getEmptyCharacter());
    setCharacterId(undefined);
    setSearchParams({});
  };

  const handleSave = () => {
    if (!character.name.trim()) {
      toast.error('Ponle un nombre a tu personaje antes de guardar.');
      return;
    }
    const id = characterId ?? crypto.randomUUID();
    try {
      saveCustomCharacter({ ...character, id });
    } catch {
      toast.error('No se pudo guardar: almacenamiento lleno. Prueba con una imagen más pequeña o borra algún personaje.');
      return;
    }
    if (!characterId) {
      setCharacterId(id);
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
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div>
              <CharacterForm
                character={character}
                setCharacter={setCharacter}
                onReset={handleReset}
                onSave={handleSave}
              />
            </div>

            {/* Preview */}
            <div>
              <CharacterPreview character={character} setCharacter={setCharacter} />
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
