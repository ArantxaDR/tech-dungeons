import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BorderDivider } from '@/components/BorderDivider';
import { PageMargins } from '@/components/PageMargins';
import { ROLES, CLASSES, RACES } from '@/data/characterPresets';
import type { AbilityName } from '@/types/character';
import { StatTooltip } from '@/components/StatTooltip';
import { GiBookshelf, GiArrowCursor, GiChest, GiBroadsword, GiElfEar } from 'react-icons/gi';

const formatBonus = (bonus: Partial<Record<AbilityName, number>>) =>
  Object.entries(bonus)
    .map(([ability, value]) => `+${value} ${ability}`)
    .join(', ');

const Manual = () => {
  return (
    <PageMargins className="min-h-screen">
      <header className="py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/">
              <GiArrowCursor className="w-4 h-4 mr-2" />
              Volver
            </Link>
          </Button>
          <h1 className="font-display text-2xl md:text-4xl font-bold text-primary text-glow-primary flex items-center gap-2">
            <GiBookshelf className="shrink-0" /> Manual del Códice
          </h1>
          <p className="mt-2 text-sm md:text-base">
            Cómo razas, clases y roles tech dan forma a los stats de tu personaje.
          </p>
        </div>
      </header>

      <BorderDivider variant="interlace" className="max-w-2xl mx-auto" />

      <main className="max-w-5xl mx-auto py-6 md:py-8 px-4 space-y-6 md:space-y-8">
        {/* Roles */}
        <section className="rpg-card p-4 md:p-6">
          <h2 className="section-title flex items-center gap-2"><GiChest /> Roles Tech</h2>
          <p className="text-sm text-muted-foreground mb-4">
            El rol no da bonos propios: marca qué clase encaja mejor y qué habilidades suele priorizar.
          </p>

          <div className="md:hidden space-y-3">
            {ROLES.map(role => {
              const matchingClass = CLASSES.find(c => c.suggestedRole === role.value);
              return (
                <article
                  key={role.value}
                  className="rounded-lg border border-border bg-card/60 p-4 space-y-2"
                >
                  <h3 className="font-bold text-foreground">{role.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Clase asociada:</span> {matchingClass?.label ?? '—'}
                  </p>
                  <p className="text-sm text-muted-foreground break-words">
                    <span className="font-medium text-foreground">Habilidades típicas:</span> {role.focusSkills.join(', ')}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rol</TableHead>
                  <TableHead>Clase asociada</TableHead>
                  <TableHead>Habilidades típicas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ROLES.map(role => {
                  const matchingClass = CLASSES.find(c => c.suggestedRole === role.value);
                  return (
                    <TableRow key={role.value}>
                      <TableCell className="font-medium whitespace-nowrap">{role.label}</TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">{matchingClass?.label ?? '—'}</TableCell>
                      <TableCell className="text-muted-foreground">{role.focusSkills.join(', ')}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Classes */}
        <section className="rpg-card p-4 md:p-6">
          <h2 className="section-title flex items-center gap-2"><GiBroadsword /> Clases</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Dado de golpe, característica primaria y salvaciones — igual que produce "Autocompletar Stats".
          </p>

          <div className="md:hidden space-y-3">
            {CLASSES.map(cls => (
              <article
                key={cls.value}
                className="rounded-lg border border-border bg-card/60 p-4 space-y-2"
              >
                <h3 className="font-bold text-foreground">{cls.label}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Dado:</span> <span className="text-secondary font-mono">{cls.hitDie}</span>
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Primaria:</span>{' '}
                    <StatTooltip stat={cls.primaryAbility as AbilityName} className="text-[10px] sm:text-xs text-primary" />
                  </p>
                  <p className="col-span-2 text-muted-foreground flex flex-wrap items-center gap-1">
                    <span className="font-medium text-foreground">Salvaciones:</span>{' '}
                    {cls.savingThrows.map((save, i) => (
                      <span key={save}>
                        {i > 0 ? ' / ' : ''}
                        <StatTooltip stat={save} className="text-[10px] sm:text-xs" />
                      </span>
                    ))}
                  </p>
                  <p className="col-span-2 text-muted-foreground break-words">
                    <span className="font-medium text-foreground">Rol sugerido:</span> {ROLES.find(r => r.value === cls.suggestedRole)?.label ?? '—'}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Clase</TableHead>
                  <TableHead className="text-center">Dado de golpe</TableHead>
                  <TableHead className="text-center">Primaria</TableHead>
                  <TableHead className="text-center">Salvaciones</TableHead>
                  <TableHead>Rol sugerido</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CLASSES.map(cls => (
                  <TableRow key={cls.value}>
                    <TableCell className="font-medium whitespace-nowrap">{cls.label}</TableCell>
                    <TableCell className="text-center text-secondary font-mono">{cls.hitDie}</TableCell>
                    <TableCell className="text-center text-primary font-bold">
                      <StatTooltip stat={cls.primaryAbility as AbilityName} className="text-[10px] sm:text-xs text-primary" />
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground whitespace-nowrap">
                      {cls.savingThrows.map((save, i) => (
                        <span key={save}>
                          {i > 0 ? ' / ' : ''}
                          <StatTooltip stat={save} className="text-[10px] sm:text-xs" />
                        </span>
                      ))}
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      {ROLES.find(r => r.value === cls.suggestedRole)?.label ?? '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Races */}
        <section className="rpg-card p-4 md:p-6">
          <h2 className="section-title flex items-center gap-2"><GiElfEar /> Razas</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Bono de característica, velocidad y un rasgo racial destacado.
          </p>

          <div className="md:hidden space-y-3">
            {RACES.map(race => (
              <article
                key={race.value}
                className="rounded-lg border border-border bg-card/60 p-4 space-y-2"
              >
                <h3 className="font-bold text-foreground">{race.label}</h3>
                <p className="text-sm text-stat-positive font-medium break-words">
                  {formatBonus(race.abilityBonus)}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Velocidad:</span> {race.speed} pies
                </p>
                <p className="text-sm text-muted-foreground break-words">
                  <span className="font-medium text-foreground">Rasgo:</span> {race.trait}
                </p>
              </article>
            ))}
          </div>

          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Raza</TableHead>
                  <TableHead>Bono</TableHead>
                  <TableHead className="text-center">Velocidad</TableHead>
                  <TableHead>Rasgo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RACES.map(race => (
                  <TableRow key={race.value}>
                    <TableCell className="font-medium whitespace-nowrap">{race.label}</TableCell>
                    <TableCell className="text-stat-positive font-medium whitespace-nowrap">{formatBonus(race.abilityBonus)}</TableCell>
                    <TableCell className="text-center text-muted-foreground whitespace-nowrap">{race.speed} pies</TableCell>
                    <TableCell className="text-muted-foreground">{race.trait}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <div className="text-center">
          <Button asChild className="w-full sm:w-auto">
            <Link to="/crear-personaje">Crear tu personaje</Link>
          </Button>
        </div>
      </main>

      <BorderDivider variant="vine" className="max-w-2xl mx-auto" />

      <footer className="py-6 px-4 text-center text-sm">
        <p>Los bonos de raza son una guía de referencia — la app aplica los stats ya calculados de cada preset.</p>
      </footer>
    </PageMargins>
  );
};

export default Manual;
