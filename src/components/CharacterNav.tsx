import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

const characters = [
  { path: '/frontella', name: 'Frontella', icon: '🧝‍♀️', subtitle: 'Frontend' },
  { path: '/bitgrun', name: 'Bitgrun', icon: '⛏️', subtitle: 'Backend' },
  { path: '/pixaria', name: 'Pixaria', icon: '✨', subtitle: 'UX/UI' },
  { path: '/stackia', name: 'Stackia', icon: '🏹', subtitle: 'Full-Stack' },
  { path: '/bugaria', name: 'Bugaria', icon: '🔍', subtitle: 'QA' },
];

export const CharacterNav = () => {
  const location = useLocation();

  return (
    <nav className="flex flex-wrap justify-center items-center gap-3 py-4" aria-label="Navegación de personajes">
      {/* Home button */}
      <Link
        to="/"
        className="flex items-center gap-2 px-4 py-2 rounded-sm border-2 border-accent bg-accent/20 text-accent-foreground hover:border-primary hover:bg-primary/20 hover:text-primary transition-all duration-200"
        aria-label="Volver al inicio"
      >
        <Home className="w-5 h-5" />
        <span className="font-bold text-sm hidden sm:inline">Inicio</span>
      </Link>

      {/* Character links */}
      {characters.map((char) => {
        const isActive = location.pathname === char.path;
        return (
          <Link
            key={char.path}
            to={char.path}
            className={`flex items-center gap-2 px-3 py-2 rounded-sm border-2 transition-all duration-200 ${
              isActive
                ? 'border-primary bg-primary/20 text-primary'
                : 'border-muted bg-muted/30 text-muted-foreground hover:border-secondary hover:text-secondary'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="text-lg" aria-hidden="true">{char.icon}</span>
            <div className="text-left hidden sm:block">
              <div className="font-bold text-xs">{char.name}</div>
              <div className="text-xs opacity-70">{char.subtitle}</div>
            </div>
          </Link>
        );
      })}
    </nav>
  );
};
