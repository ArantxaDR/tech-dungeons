import { Link } from 'react-router-dom';
import { Users, Scroll, Sparkles, PlusCircle, Swords, Shield, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import avatars
import frontellaAvatar from '@/assets/frontella-avatar.png';
import bitgrunAvatar from '@/assets/bitgrun-avatar.png';
import pixariaAvatar from '@/assets/pixaria-avatar.png';
import stackiaAvatar from '@/assets/stackia-avatar.png';
import bugariaAvatar from '@/assets/bugaria-avatar.png';
import appliaAvatar from '@/assets/applia-avatar.png';

const characters = [
  { 
    path: '/frontella', 
    name: 'Frontella Brillopíxel', 
    icon: '🧝‍♀️',
    avatar: frontellaAvatar,
    role: 'Frontend Developer',
    class: 'Pícara (Rogue)',
    description: 'Experta en interfaces y experiencias de usuario. Sigilosa con el CSS y letal con JavaScript.',
    accentColor: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'hover:border-emerald-500'
  },
  { 
    path: '/bitgrun', 
    name: 'Bitgrun MartilloAPI', 
    icon: '⛏️',
    avatar: bitgrunAvatar,
    role: 'Backend Developer',
    class: 'Bárbara',
    description: 'Forjadora de APIs robustas y bases de datos inquebrantables. Su furia escala con los requests.',
    accentColor: 'from-orange-500/20 to-red-500/20',
    borderColor: 'hover:border-orange-500'
  },
  { 
    path: '/pixaria', 
    name: 'Pixaria Interfacea', 
    icon: '✨',
    avatar: pixariaAvatar,
    role: 'UX/UI Designer',
    class: 'Hechicera (Sorcerer)',
    description: 'Maestra del prototipado y la usabilidad. Convierte ideas en interfaces mágicas.',
    accentColor: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'hover:border-purple-500'
  },
  { 
    path: '/stackia', 
    name: 'Stackia Caminacódigo', 
    icon: '🏹',
    avatar: stackiaAvatar,
    role: 'Full-Stack Developer',
    class: 'Exploradora (Ranger)',
    description: 'Navegante del stack completo. Rastrea bugs desde la UI hasta la base de datos.',
    accentColor: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'hover:border-blue-500'
  },
  { 
    path: '/bugaria', 
    name: 'Bugaria OjoFino', 
    icon: '🔍',
    avatar: bugariaAvatar,
    role: 'QA / Test Engineer',
    class: 'Monja (Monk)',
    description: 'Guardiana de la calidad. Encuentra bugs con precisión monástica y disciplina inquebrantable.',
    accentColor: 'from-amber-500/20 to-yellow-500/20',
    borderColor: 'hover:border-amber-500'
  },
  { 
    path: '/applia', 
    name: 'Applia Pantallatáctil', 
    icon: '📱',
    avatar: appliaAvatar,
    role: 'Mobile Developer',
    class: 'Exploradora (Ranger)',
    description: 'Exploradora de ecosistemas móviles. Domina iOS, Android y frameworks cross-platform.',
    accentColor: 'from-lime-500/20 to-green-500/20',
    borderColor: 'hover:border-lime-500'
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative py-20 px-4 text-center border-b-4 border-primary overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        {/* Decorative icons */}
        <div className="absolute top-10 left-10 text-primary/20 animate-pulse">
          <Swords className="w-16 h-16" />
        </div>
        <div className="absolute top-20 right-16 text-secondary/20 animate-pulse delay-300">
          <Shield className="w-12 h-12" />
        </div>
        <div className="absolute bottom-10 left-1/4 text-accent/20 animate-pulse delay-500">
          <Wand2 className="w-10 h-10" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary border border-primary/50 rounded-full bg-primary/10">
              RPG Character Sheets
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 tracking-tight font-pixel text-glow-primary">
            ⚔️ Tech & Dungeons ⚔️
          </h1>
          
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
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">100% Editable</span>
            </div>
          </div>

          <Button size="lg" className="text-lg px-8 py-6 animate-pulse" asChild>
            <Link to="/crear-personaje">
              <PlusCircle className="w-5 h-5 mr-2" />
              Crear tu propia heroína
            </Link>
          </Button>
        </div>
      </header>

      {/* Characters Grid */}
      <main className="max-w-7xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            🎭 Elige tu personaje
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
              
              <div className="relative p-6">
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/50 group-hover:border-primary transition-colors duration-300 shadow-lg group-hover:shadow-primary/30">
                      <img 
                        src={char.avatar} 
                        alt={char.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <span className="absolute -bottom-2 -right-2 text-3xl drop-shadow-lg" aria-hidden="true">
                      {char.icon}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
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

        {/* Create character CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-2xl border-2 border-dashed border-muted hover:border-primary transition-colors bg-card/50">
            <div className="text-4xl mb-4">🧙‍♀️</div>
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

      {/* Footer */}
      <footer className="py-8 text-center border-t border-muted bg-card/30">
        <p className="text-sm text-muted-foreground mb-2">
          Hecho con 💜 y mucho café ☕
        </p>
        <p className="text-xs text-muted-foreground/60">
          Tech & Dungeons © 2024 - Porque el código también es magia
        </p>
      </footer>
    </div>
  );
};

export default Index;
