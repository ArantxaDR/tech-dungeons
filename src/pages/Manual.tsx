import { Link } from 'react-router-dom';
import { FiArrowLeft as ArrowLeft } from 'react-icons/fi';
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
import { AbilityName } from '@/types/character';

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
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Link>
          </Button>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary text-glow-primary">
            📖 Manual del Códice
          </h1>
          <p className="text-muted-foreground mt-2">
            Cómo razas, clases y roles tech dan forma a los stats de tu personaje.
          </p>
        </div>
      </header>

      <BorderDivider variant="interlace" className="max-w-2xl mx-auto" />

      <main className="max-w-5xl mx-auto py-8 px-4 space-y-8">
        {/* Roles */}
        <div className="rpg-card overflow-x-auto">
          <h2 className="section-title">💼 Roles Tech</h2>
          <p className="text-sm text-muted-foreground mb-4">
            El rol no da bonos propios: marca qué clase encaja mejor y qué habilidades suele priorizar.
          </p>
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
                    <TableCell className="font-medium">{role.label}</TableCell>
                    <TableCell className="text-muted-foreground">{matchingClass?.label ?? '—'}</TableCell>
                    <TableCell className="text-muted-foreground">{role.focusSkills.join(', ')}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Classes */}
        <div className="rpg-card overflow-x-auto">
          <h2 className="section-title">⚔️ Clases</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Dado de golpe, característica primaria y salvaciones — igual que produce "Autocompletar Stats".
          </p>
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
                  <TableCell className="font-medium">{cls.label}</TableCell>
                  <TableCell className="text-center text-secondary font-mono">{cls.hitDie}</TableCell>
                  <TableCell className="text-center text-primary font-bold">{cls.primaryAbility}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{cls.savingThrows.join(' / ')}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {ROLES.find(r => r.value === cls.suggestedRole)?.label}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Races */}
        <div className="rpg-card overflow-x-auto">
          <h2 className="section-title">🧝 Razas</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Bono de característica, velocidad y un rasgo racial destacado.
          </p>
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
                  <TableCell className="font-medium">{race.label}</TableCell>
                  <TableCell className="text-stat-positive font-medium">{formatBonus(race.abilityBonus)}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{race.speed} pies</TableCell>
                  <TableCell className="text-muted-foreground">{race.trait}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="text-center">
          <Button asChild>
            <Link to="/crear-personaje">Crear tu personaje</Link>
          </Button>
        </div>
      </main>

      <BorderDivider variant="vine" className="max-w-2xl mx-auto" />

      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>Los bonos de raza son una guía de referencia — el creador aplica los stats ya calculados de cada preset.</p>
      </footer>
    </PageMargins>
  );
};

export default Manual;
