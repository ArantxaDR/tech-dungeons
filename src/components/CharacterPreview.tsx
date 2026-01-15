import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Character, calculateSkillTotal } from '@/types/character';
import { Eye, Shield, Zap, Heart, Footprints } from 'lucide-react';
import { ROLES } from '@/data/characterPresets';

interface CharacterPreviewProps {
  character: Character & { role: string; imageDataUrl?: string };
}

export const CharacterPreview = ({ character }: CharacterPreviewProps) => {
  const roleLabel = ROLES.find(r => r.value === character.role)?.label || character.role;

  const formatModifier = (mod: number) => (mod >= 0 ? `+${mod}` : `${mod}`);

  return (
    <Card className="h-full overflow-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Eye className="w-5 h-5" />
          Vista Previa
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Header with Avatar */}
        <div className="flex gap-4 items-start">
          {character.imageDataUrl ? (
            <img
              src={character.imageDataUrl}
              alt={character.name}
              className="w-24 h-24 rounded-lg object-cover border-2 border-primary"
            />
          ) : (
            <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center text-4xl border-2 border-dashed border-muted-foreground/30">
              🎭
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground">
              {character.name || 'Sin nombre'}
            </h2>
            <p className="text-primary font-medium">{roleLabel || 'Sin rol'}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline">{character.race || 'Sin raza'}</Badge>
              <Badge variant="secondary">{character.className || 'Sin clase'}</Badge>
              <Badge>Nivel {character.level}</Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-muted rounded-lg p-3 text-center">
            <Heart className="w-5 h-5 mx-auto mb-1 text-red-500" />
            <div className="text-2xl font-bold">{character.hp}</div>
            <div className="text-xs text-muted-foreground">HP</div>
          </div>
          <div className="bg-muted rounded-lg p-3 text-center">
            <Shield className="w-5 h-5 mx-auto mb-1 text-blue-500" />
            <div className="text-2xl font-bold">{character.armorClass}</div>
            <div className="text-xs text-muted-foreground">CA</div>
          </div>
          <div className="bg-muted rounded-lg p-3 text-center">
            <Zap className="w-5 h-5 mx-auto mb-1 text-yellow-500" />
            <div className="text-2xl font-bold">{formatModifier(character.initiative)}</div>
            <div className="text-xs text-muted-foreground">Iniciativa</div>
          </div>
          <div className="bg-muted rounded-lg p-3 text-center">
            <Footprints className="w-5 h-5 mx-auto mb-1 text-green-500" />
            <div className="text-2xl font-bold">{character.speed}</div>
            <div className="text-xs text-muted-foreground">Velocidad</div>
          </div>
        </div>

        {/* Abilities */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Atributos</h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {character.abilities.map(ability => (
              <div
                key={ability.name}
                className={`rounded-lg p-2 text-center border-2 ${
                  ability.savingThrowProficient 
                    ? 'border-primary bg-primary/10' 
                    : 'border-muted bg-muted'
                }`}
              >
                <div className="text-xs font-medium text-muted-foreground">
                  {ability.name}
                </div>
                <div className="text-xl font-bold">{ability.score}</div>
                <div className="text-sm text-primary font-medium">
                  {formatModifier(ability.modifier)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        {character.skills.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Habilidades</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Habilidad</TableHead>
                  <TableHead className="text-center">Attr</TableHead>
                  <TableHead className="text-center">Prof</TableHead>
                  <TableHead className="text-center">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {character.skills.map(skill => {
                  const total = calculateSkillTotal(
                    skill.baseModifier,
                    skill.proficient,
                    skill.expertise,
                    character.proficiencyBonus
                  );
                  return (
                    <TableRow key={skill.id}>
                      <TableCell className="font-medium">
                        {skill.name}
                        {skill.expertise && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            Exp
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center text-muted-foreground">
                        {skill.ability}
                      </TableCell>
                      <TableCell className="text-center">
                        {skill.proficient ? '✓' : '−'}
                      </TableCell>
                      <TableCell className="text-center font-bold text-primary">
                        {formatModifier(total)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Conditions */}
        {character.conditions.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Condiciones</h3>
            <div className="space-y-2">
              {character.conditions.map(condition => (
                <div
                  key={condition.name}
                  className={`rounded-lg p-3 border ${
                    condition.active 
                      ? 'border-primary bg-primary/10' 
                      : 'border-muted bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Badge variant={condition.active ? 'default' : 'outline'}>
                      {condition.name}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {condition.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Class Features & Traits */}
        {character.classFeatures && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Rasgos de Clase</h3>
            <div className="bg-muted rounded-lg p-4 text-sm whitespace-pre-wrap">
              {character.classFeatures}
            </div>
          </div>
        )}

        {character.racialTraits && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Rasgos Raciales</h3>
            <div className="bg-muted rounded-lg p-4 text-sm whitespace-pre-wrap">
              {character.racialTraits}
            </div>
          </div>
        )}

        {character.proficiencies && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Competencias</h3>
            <div className="bg-muted rounded-lg p-4 text-sm whitespace-pre-wrap">
              {character.proficiencies}
            </div>
          </div>
        )}

        {character.equipment && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Equipo</h3>
            <div className="bg-muted rounded-lg p-4 text-sm whitespace-pre-wrap">
              {character.equipment}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
