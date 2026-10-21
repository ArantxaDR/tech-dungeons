import { ChangeEvent, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FieldError } from '@/components/FieldError';
import { cn } from '@/lib/utils';
import {
  AVATAR_ACCEPT_ATTRIBUTE,
  encodeAvatar,
  getAvatarFileError,
} from '@/lib/avatarImage';
import type { ValidationErrors, ValidationField } from '@/lib/characterValidation';
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
  generateCharacter,
  RoleName,
  ClassName,
  RaceName
} from '@/data/characterPresets';
import { DraftCharacter } from '@/data/customCharacters';
import { GiSunrise  as Upload, GiSave as Save, GiCycle  as RotateCcw, GiCrossedBones  as X , GiWyvern as Character} from 'react-icons/gi';
import { GiFairyWand as Wand2 } from 'react-icons/gi';

const selectTriggerClass = 'rounded-none';

interface CharacterFormProps {
  character: DraftCharacter;
  setCharacter: React.Dispatch<React.SetStateAction<DraftCharacter>>;
  onReset: () => void;
  onSave: () => void;
  /** Validation messages of the fields this form owns. */
  errors?: ValidationErrors;
  /** Called when the player leaves a field, so it can show its error. */
  markTouched?: (field: ValidationField) => void;
  /** True when the form is editing a character that is already saved. */
  isEditing?: boolean;
}

export const CharacterForm = ({
  character,
  setCharacter,
  onReset,
  onSave,
  errors = {},
  markTouched,
  isEditing = false,
}: CharacterFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameError = errors.name;
  const [avatarError, setAvatarError] = useState<string | undefined>(undefined);

  const handleNameBlur = () => {
    setCharacter(prev => ({ ...prev, name: prev.name.trim() }));
    markTouched?.('name');
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCharacter(prev => ({ ...prev, name: e.target.value }));
  };

  const handleRoleChange = (value: RoleName) => {
    setCharacter(prev => ({ ...prev, role: value }));
  };

  const handleClassChange = (value: ClassName) => {
    const classInfo = CLASSES.find(c => c.value === value);
    const newClassName = classInfo?.label || value;

    setCharacter(prev => ({
      ...prev,
      className: newClassName,
      // Suggest a matching role only if the user hasn't picked one yet.
      role: prev.role || classInfo?.suggestedRole || prev.role,
    }));
  };

  const handleRaceChange = (value: RaceName) => {
    const raceInfo = RACES.find(r => r.value === value);
    const newRace = raceInfo?.label || value;

    setCharacter(prev => ({ ...prev, race: newRace }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reject the file before reading it: a wrong type or a huge file would
    // either fail later in a confusing way or be loaded whole into memory.
    const fileError = getAvatarFileError(file);
    if (fileError) {
      setAvatarError(fileError);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    setAvatarError(undefined);

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        try {
          // Square crop + re-encode: an unresized phone photo (several MB as
          // base64) blows the localStorage quota. 256px keeps it under ~30KB.
          setCharacter(prev => ({ ...prev, imageDataUrl: encodeAvatar(img) }));
        } catch {
          setAvatarError('No se pudo procesar la imagen. Prueba con otro archivo.');
        }
        // Allow picking the same file again.
        if (fileInputRef.current) fileInputRef.current.value = '';
      };
      img.onerror = () => {
        setAvatarError('No se pudo leer esa imagen. Prueba con otro archivo.');
        if (fileInputRef.current) fileInputRef.current.value = '';
      };
      img.src = reader.result as string;
    };
    reader.onerror = () => {
      setAvatarError('No se pudo leer ese archivo. Prueba con otro.');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setCharacter(prev => ({ ...prev, imageDataUrl: undefined }));
    setAvatarError(undefined);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAutoComplete = () => {
    const raceValue = getSelectedRace();
    const classValue = getSelectedClass();
    if (!raceValue || !classValue) return;

    const generated = generateCharacter(raceValue, classValue, character.role as RoleName || undefined);
    setCharacter(prev => ({
      ...generated,
      name: prev.name || 'Nueva Aventurera',
      role: prev.role,
      imageDataUrl: prev.imageDataUrl,
    }));

    // En móvil, baja hasta los stats para que se vean rellenados.
    window.setTimeout(() => {
      const stats = document.getElementById('stats-section');
      if (stats) {
        stats.scrollIntoView({ behavior: 'smooth', block: 'start' });
        stats.focus({ preventScroll: true });
      }
    }, 150);
  };

  const handleReset = () => {
    const question = isEditing
      ? '¿Descartar los cambios? Volverás a la última versión guardada.'
      : '¿Reiniciar? Perderás los cambios del borrador actual.';
    if (window.confirm(question)) {
      onReset();
    }
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
    <div className="rpg-card">
      <h2 className="section-title">Crear Personaje</h2>

      <div className="space-y-6">
        {/* Name */}
        <div className="space-y-1">
          <label htmlFor="name" className="text-xs text-muted-foreground uppercase">Nombre</label>
          <input
            id="name"
            placeholder="Nombre de tu personaje..."
            value={character.name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            aria-invalid={nameError ? true : undefined}
            aria-describedby={nameError ? 'name-error' : undefined}
            className={cn('field-input', nameError && 'border-b-destructive')}
          />
          <FieldError id="name-error" message={nameError} />
        </div>

        {/* Role */}
        <div className="space-y-1">
          <Label htmlFor="role" className="text-xs text-muted-foreground uppercase">Rol Tech</Label>
          <Select value={character.role as RoleName} onValueChange={handleRoleChange}>
            <SelectTrigger id="role" className={selectTriggerClass}>
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
        <div className="space-y-1">
          <Label htmlFor="class" className="text-xs text-muted-foreground uppercase">Clase</Label>
          <Select value={getSelectedClass()} onValueChange={handleClassChange}>
            <SelectTrigger id="class" className={selectTriggerClass}>
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
        <div className="space-y-1">
          <Label htmlFor="race" className="text-xs text-muted-foreground uppercase">Raza</Label>
          <Select value={getSelectedRace()} onValueChange={handleRaceChange}>
            <SelectTrigger id="race" className={selectTriggerClass}>
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
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground uppercase">Avatar</span>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept={AVATAR_ACCEPT_ATTRIBUTE}
              onChange={handleImageUpload}
              className="hidden"
              aria-label="Subir imagen de avatar"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1"
              aria-describedby={avatarError ? 'avatar-error' : undefined}
            >
              <Upload className="w-4 h-4 mr-2" />
              {character.imageDataUrl ? 'Cambiar imagen' : 'Subir imagen'}
            </Button>
          </div>
          <FieldError id="avatar-error" message={avatarError} />
          {character.imageDataUrl && (
            <div className="mt-2 flex items-center gap-3">
              <img
                src={character.imageDataUrl}
                alt="Avatar preview"
                className="w-20 h-20 rounded-lg object-cover border-2 border-[hsl(var(--primary-container))]"
              />
              <Button variant="ghost" size="sm" onClick={handleRemoveImage}>
                <X className="w-4 h-4 mr-1" />
                Quitar
              </Button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4 border-t border-border">
          <Button
            onClick={handleAutoComplete}
            className="w-full"
            disabled={!character.className || !character.race}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Autocompletar Stats
          </Button>

          <Button
            onClick={onSave}
            variant="secondary"
            className="w-full"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar Personaje
          </Button>

          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {isEditing ? 'Descartar cambios' : 'Reiniciar'}
          </Button>
        </div>
      </div>
    </div>
  );
};
