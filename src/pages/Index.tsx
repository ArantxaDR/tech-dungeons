import { Link } from 'react-router-dom';
import { Users, Scroll, Sparkles } from 'lucide-react';

const characters = [
  { 
    path: '/frontella', 
    name: 'Frontella Brillopíxel', 
    icon: '🧝‍♀️', 
    role: 'Frontend Developer',
    class: 'Pícara (Rogue)',
    description: 'Experta en interfaces y experiencias de usuario. Sigilosa con el CSS y letal con JavaScript.'
  },
  { 
    path: '/bitgrun', 
    name: 'Bitgrun MartilloAPI', 
    icon: '⛏️', 
    role: 'Backend Developer',
    class: 'Bárbaro',
    description: 'Forjador de APIs robustas y bases de datos inquebrantables. Su furia escala con los requests.'
  },
  { 
    path: '/pixaria', 
    name: 'Pixaria Interfacea', 
    icon: '✨', 
    role: 'UX/UI Designer',
    class: 'Hechicera (Sorcerer)',
    description: 'Maestra del prototipado y la usabilidad. Convierte ideas en interfaces mágicas.'
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="py-16 px-4 text-center border-b-4 border-primary bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 tracking-tight">
            ⚔️ Tech & Dungeons ⚔️
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            Hojas de personaje para el equipo tech más épico
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>3 Personajes</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Scroll className="w-4 h-4" />
              <span>Guardado Local</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4" />
              <span>100% Editable</span>
            </div>
          </div>
        </div>
      </header>

      {/* Characters Grid */}
      <main className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
          Elige tu personaje
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {characters.map((char) => (
            <Link
              key={char.path}
              to={char.path}
              className="group block p-6 rounded-lg border-2 border-muted bg-card hover:border-primary hover:bg-primary/5 transition-all duration-300"
            >
              <div className="text-center">
                <span className="text-5xl block mb-4" aria-hidden="true">
                  {char.icon}
                </span>
                <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                  {char.name}
                </h3>
                <p className="text-sm text-primary font-medium mt-1">
                  {char.role}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {char.class}
                </p>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                  {char.description}
                </p>
                <span className="inline-block mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver ficha →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-muted">
        <p className="text-sm text-muted-foreground">
          Hecho con ❤️ para equipos tech que aman el rol
        </p>
      </footer>
    </div>
  );
};

export default Index;
