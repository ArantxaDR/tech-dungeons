import { Link, useLocation } from 'react-router-dom';

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
    <nav className="flex justify-center gap-4 py-4" aria-label="Navegación de personajes">
      {characters.map((char) => {
        const isActive = location.pathname === char.path;
        return (
          <Link
            key={char.path}
            to={char.path}
            className={`flex items-center gap-2 px-4 py-2 rounded-sm border-2 transition-all duration-200 ${
              isActive
                ? 'border-primary bg-primary/20 text-primary'
                : 'border-muted bg-muted/30 text-muted-foreground hover:border-secondary hover:text-secondary'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="text-xl" aria-hidden="true">{char.icon}</span>
            <div className="text-left">
              <div className="font-bold text-sm">{char.name}</div>
              <div className="text-xs opacity-70">{char.subtitle}</div>
            </div>
          </Link>
        );
      })}
    </nav>
  );
};
