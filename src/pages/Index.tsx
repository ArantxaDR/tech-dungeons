import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiCapeArmor as Users, GiAncientSword as PlusCircle, GiTrashCan as Trash2, GiBookCover as BookOpen, GiScrollUnfurled as Scroll, GiDiceTwentyFacesOne as Sparkles, GiSparkles, GiPerson, GiBattleAxe, GiHeavyArrow, GiMagnifyingGlass, GiSmartphone, GiHearts, GiCoffeeMug } from 'react-icons/gi';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { BorderDivider } from '@/components/BorderDivider';
import { BorderWatermark } from '@/components/BorderWatermark';
import { getCustomCharacters, deleteCustomCharacter } from '@/data/customCharacters';
import { ROLES } from '@/data/characterPresets';
import { PageMargins } from '@/components/PageMargins';
import arcasilKnightImg from '@/assets/arcasil-knight.webp';
import loversImg from '@/assets/lovers.webp';
import dragonImg from '@/assets/dragon.webp';
import unicornImg from '@/assets/unicorn.webp';
import demonImg from '@/assets/demon.webp';
import { characters } from '@/data/defaultCharacters';

const Index = () => {
  const [customCharacters, setCustomCharacters] = useState(() => getCustomCharacters());

  const handleDelete = (id: string, name: string) => {
    if (!window.confirm(`¿Borrar a ${name}? No se puede deshacer.`)) return;
    deleteCustomCharacter(id);
    setCustomCharacters(getCustomCharacters());
    toast.success(`${name} borrado.`);
  };

  return (
    <PageMargins className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative py-20 px-4 text-center overflow-hidden">
        <BorderWatermark className="absolute inset-0 flex items-center justify-center opacity-10 [&_svg]:w-[480px] [&_svg]:h-[480px]" />

        <div className="relative max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary border border-primary/50 rounded-full bg-primary/10">
              RPG Character Sheets
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 md:gap-6 mb-6">
            <img
              src={dragonImg}
              alt=""
              aria-hidden="true"
              className="hidden sm:block w-14 h-14 md:w-32 md:h-20 flex-shrink-0 rounded-lg object-cover border-2 border-primary/40"
            />
            <h1 className="text-5xl md:text-7xl font-bold text-primary tracking-tight font-display text-glow-primary">
              Dungeons & Tech
            </h1>
            <img
              src={unicornImg}
              alt=""
              aria-hidden="true"
              className="hidden sm:block w-14 h-14 md:w-28 md:h-20 flex-shrink-0 rounded-lg object-cover border-2 border-primary/40"
            />
          </div>

          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Hojas de personaje épicas para el <span className="text-secondary font-bold">equipo tech</span> más legendario del reino digital
          </p>

          <div className="flex justify-center gap-6 flex-wrap mb-10">
            <div className="flex items-center gap-2 px-4 py-2 bg-card/50 border border-muted rounded-lg">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">6 Heroínas</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card/50 border border-muted rounded-lg">
              <Scroll className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium">Guardado Local</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card/50 border border-muted rounded-lg">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">100% Editable</span>
            </div>
          </div>

          <div className="flex justify-center gap-3 flex-wrap">
            <Button size="lg" className="text-lg px-8 py-6 animate-pulse" asChild>
              <Link to="/crear-personaje">
                <PlusCircle className="w-5 h-5 mr-2" />
                Crear tu propia heroína
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link to="/manual">
                <BookOpen className="w-5 h-5 mr-2" />
                Manual
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <BorderDivider variant="bestiary" className="max-w-2xl mx-auto" />

      {/* Characters Grid */}
      <main className="max-w-7xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <img
            src={loversImg}
            alt=""
            aria-hidden="true"
            className="w-28 md:w-36 mx-auto mb-4 rounded-lg object-cover border-2 border-primary/40"
          />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Elige tu personaje
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Cada heroína tiene habilidades únicas adaptadas a su rol en el equipo tech
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {characters.map((char) => (
            <Link
              key={char.path}
              to={char.path}
              className={`group relative block overflow-hidden rounded-xl border-2 border-muted bg-card transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 ${char.borderColor}`}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${char.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative">
                {/* Avatar */}
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b-2 border-primary/40 bg-muted">
                  <img
                    src={char.avatar}
                    alt={`Retrato de ${char.name}`}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/70 via-transparent to-transparent" aria-hidden="true" />
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                    {char.name}
                  </h3>
                  <p className="text-sm text-primary font-bold uppercase tracking-wide">
                    {char.role}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 mb-4">
                    {char.class}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {char.description}
                  </p>

                  {/* CTA */}
                  <div className="mt-6 flex items-center justify-center gap-2 text-primary font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span>Ver ficha completa</span>
                    <span className="text-xl">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Custom characters */}
        {customCharacters.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Tus personajes
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {customCharacters.map((char) => {
                const roleLabel = ROLES.find(r => r.value === char.role)?.label || char.role;
                return (
                  <Link
                    key={char.id}
                    to={`/crear-personaje?id=${char.id}`}
                    className="group relative block overflow-hidden rounded-xl border-2 border-muted bg-card transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 hover:border-primary"
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete(char.id, char.name || 'este personaje');
                      }}
                      aria-label={`Borrar a ${char.name || 'este personaje'}`}
                      className="absolute top-3 right-3 z-10 p-2 rounded-full bg-card/80 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="p-6">
                      <div className="flex justify-center mb-4">
                        <img
                          src={char.imageDataUrl || demonImg}
                          alt=""
                          aria-hidden="true"
                          className="w-24 h-24 rounded-full object-cover border-4 border-primary/50 group-hover:border-primary transition-colors duration-300"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                          {char.name || 'Sin nombre'}
                        </h3>
                        <p className="text-sm text-primary font-bold uppercase tracking-wide">
                          {roleLabel || 'Sin rol'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 mb-4">
                          {char.className || 'Sin clase'} · Nivel {char.level}
                        </p>
                        <div className="flex items-center justify-center gap-2 text-primary font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <span>Editar</span>
                          <span className="text-xl">→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Create character CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-2xl border-2 border-dashed border-muted hover:border-primary transition-colors bg-card/50">
            <img
              src={arcasilKnightImg}
              alt=""
              aria-hidden="true"
              className="w-20 h-20 mx-auto mb-4 rounded-lg object-cover border-2 border-primary/40"
            />
            <h3 className="text-xl font-bold mb-2">¿No encuentras tu clase?</h3>
            <p className="text-muted-foreground mb-4">Crea tu propia heroína tech con stats personalizados</p>
            <Button variant="outline" asChild>
              <Link to="/crear-personaje">
                <PlusCircle className="w-4 h-4 mr-2" />
                Crear personaje
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <BorderDivider variant="vine" className="max-w-2xl mx-auto" />

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-md  mb-2 flex items-center justify-center gap-1">
          Hecho con <GiHearts className="fill-secondary w-5 h-5" /> y mucho café <GiCoffeeMug className="fill-secondary w-5 h-5" />
        </p>
        <p className="text-sm ">
          Tech & Dungeons © {new Date().getFullYear()} - Porque el código también es magia
        </p>
      </footer>
    </PageMargins>
  );
};

export default Index;
