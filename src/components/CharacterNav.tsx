import { Link, useLocation } from 'react-router-dom';
import { GiCastle  as Home } from 'react-icons/gi';

const characters = [
  { path: '/Flexbela', name: 'Flexbela', subtitle: 'Frontend' },
  { path: '/Query', name: 'Query', subtitle: 'Backend' },
  { path: '/Usabella', name: 'Usabella',  subtitle: 'UX/UI' },
  { path: '/Stackia', name: 'Stackia',  subtitle: 'Full-Stack' },
  { path: '/Testina', name: 'Testina',  subtitle: 'QA' },
  { path: '/Applia', name: 'Applia',  subtitle: 'Mobile' },
];

export const CharacterNav = () => {
  const location = useLocation();

  return (
    <nav className="grid w-full max-w-full grid-cols-2 gap-2 overflow-x-hidden px-1 py-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 sm:py-4" aria-label="Navegación de personajes">
      {/* Home button */}
      <Link
        to="/"
        className="col-span-2 flex min-h-11 items-center justify-center gap-2 rounded-sm border-2 border-accent bg-accent/20 px-3 py-2 text-accent-foreground transition-all duration-200 hover:border-primary hover:bg-primary/20 hover:text-primary sm:col-auto sm:px-4"
        aria-label="Volver al inicio"
      >
        <Home className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-xs font-bold sm:text-sm">Inicio</span>
      </Link>

      {/* Character links */}
      {characters.map((char) => {
        const isActive = location.pathname === char.path;
        return (
          <Link
            key={char.path}
            to={char.path}
            className={`flex min-h-11 min-w-0 items-center justify-center rounded-sm border-2 px-2 py-2 text-center transition-all duration-200 sm:gap-2 sm:px-3 ${
              isActive
                ? 'border-primary bg-primary/20 text-primary'
                : 'border-muted bg-muted/30 text-muted-foreground hover:border-secondary hover:text-secondary'
            }`}
            aria-label={`${char.name} — ${char.subtitle}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <div className="min-w-0 sm:text-left">
              <div className="break-words text-xs font-bold">{char.name}</div>
              <div className="hidden text-xs opacity-70 sm:block">{char.subtitle}</div>
            </div>
          </Link>
        );
      })}
    </nav>
  );
};
