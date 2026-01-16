import { ChangeEvent, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  ROLES, 
  CLASSES, 
  RACES, 
  findPresetByClass,
  RoleName,
  ClassName,
  RaceName
} from '@/data/characterPresets';
import { Character } from '@/types/character';
import { Upload, Wand2, Save, RotateCcw } from 'lucide-react';

interface CharacterFormProps {
  character: Character & { role: string; imageDataUrl?: string };
  setCharacter: React.Dispatch<React.SetStateAction<Character & { role: string; imageDataUrl?: string }>>;
  onReset: () => void;
}

export const CharacterForm = ({ character, setCharacter, onReset }: CharacterFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCharacter(prev => ({ ...prev, name: e.target.value }));
  };

  const applyPreset = (className: string, keepFields: Partial<Character & { role: string; imageDataUrl?: string }>) => {
    const baseClassName = className.split(' ')[0] as ClassName;
    const preset = findPresetByClass(baseClassName);
    
    if (preset) {
      setCharacter(prev => ({
        ...preset.preset,
        name: keepFields.name ?? (prev.name || 'Nueva Aventurera'),
        role: keepFields.role ?? prev.role,
        race: keepFields.race ?? preset.preset.race,
        imageDataUrl: keepFields.imageDataUrl ?? prev.imageDataUrl,
      }));
    }
  };

  const handleRoleChange = (value: RoleName) => {
    setCharacter(prev => ({ ...prev, role: value }));
  };

  const handleClassChange = (value: ClassName) => {
    const classInfo = CLASSES.find(c => c.value === value);
    const newClassName = classInfo?.label || value;
    
    setCharacter(prev => ({ ...prev, className: newClassName }));
  };

  const handleRaceChange = (value: RaceName) => {
    const raceInfo = RACES.find(r => r.value === value);
    const newRace = raceInfo?.label || value;
    
    setCharacter(prev => ({ ...prev, race: newRace }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCharacter(prev => ({ ...prev, imageDataUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAutoComplete = () => {
    applyPreset(character.className, {
      name: character.name,
      role: character.role,
      race: character.race,
      imageDataUrl: character.imageDataUrl,
    });
  };

  const handleSave = () => {
    localStorage.setItem('character-creator', JSON.stringify(character));
  };

  const getSelectedClass = (): ClassName | undefined => {
    const found = CLASSES.find(c => character.className.includes(c.value));
    return found?.value;
  };

  const getSelectedRace = (): RaceName | undefined => {
    const found = RACES.find(r => character.race.includes(r.value));
    return found?.value;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Wand2 className="w-5 h-5" />
          Crear Personaje
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            placeholder="Nombre de tu personaje..."
            value={character.name}
            onChange={handleNameChange}
          />
        </div>

        {/* Role */}
        <div className="space-y-2">
          <Label>Rol Tech</Label>
          <Select value={character.role as RoleName} onValueChange={handleRoleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un rol..." />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map(role => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Class */}
        <div className="space-y-2">
          <Label>Clase</Label>
          <Select value={getSelectedClass()} onValueChange={handleClassChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una clase..." />
            </SelectTrigger>
            <SelectContent>
              {CLASSES.map(cls => (
                <SelectItem key={cls.value} value={cls.value}>
                  {cls.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Race */}
        <div className="space-y-2">
          <Label>Raza</Label>
          <Select value={getSelectedRace()} onValueChange={handleRaceChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una raza..." />
            </SelectTrigger>
            <SelectContent>
              {RACES.map(race => (
                <SelectItem key={race.value} value={race.value}>
                  {race.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Avatar Upload */}
        <div className="space-y-2">
          <Label>Avatar</Label>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              {character.imageDataUrl ? 'Cambiar imagen' : 'Subir imagen'}
            </Button>
          </div>
          {character.imageDataUrl && (
            <div className="mt-2">
              <img
                src={character.imageDataUrl}
                alt="Avatar preview"
                className="w-20 h-20 rounded-lg object-cover border-2 border-muted"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4 border-t">
          <Button 
            onClick={handleAutoComplete} 
            className="w-full"
            disabled={!character.className}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Autocompletar Stats
          </Button>
          
          <Button 
            onClick={handleSave} 
            variant="secondary"
            className="w-full"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar Personaje
          </Button>

          <Button 
            onClick={onReset} 
            variant="outline"
            className="w-full"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reiniciar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
