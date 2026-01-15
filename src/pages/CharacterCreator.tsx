import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CharacterForm } from '@/components/CharacterForm';
import { CharacterPreview } from '@/components/CharacterPreview';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { getEmptyCharacter } from '@/data/characterPresets';
import { Character } from '@/types/character';

type CreatorCharacter = Character & { role: string; imageDataUrl?: string };

const CharacterCreator = () => {
  const [character, setCharacter] = useLocalStorageState<CreatorCharacter>(
    'character-creator',
    getEmptyCharacter()
  );

  const handleReset = () => {
    setCharacter(getEmptyCharacter());
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-6 px-4 border-b border-muted bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            🧙‍♀️ Creadora de Personajes
          </h1>
          <p className="text-muted-foreground mt-2">
            Diseña tu propia heroína tech con stats personalizados
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div>
            <CharacterForm
              character={character}
              setCharacter={setCharacter}
              onReset={handleReset}
            />
          </div>

          {/* Preview */}
          <div>
            <CharacterPreview character={character} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-muted">
        <p className="text-sm text-muted-foreground">
          Los personajes se guardan automáticamente en tu navegador
        </p>
      </footer>
    </div>
  );
};

export default CharacterCreator;
