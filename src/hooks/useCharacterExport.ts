import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import type { DraftCharacter } from '@/data/customCharacters';
import { exportCharacterJson, exportCharacterPdf } from '@/lib/characterExport';

export interface UseCharacterExport {
  /** True while the PDF is being built. */
  isExporting: boolean;
  downloadPdf: (character: DraftCharacter) => Promise<void>;
  downloadJson: (character: DraftCharacter) => void;
}

/** Downloads a character as a PDF sheet or as a JSON backup. */
export const useCharacterExport = (): UseCharacterExport => {
  const [isExporting, setIsExporting] = useState(false);

  const downloadPdf = useCallback(async (character: DraftCharacter) => {
    setIsExporting(true);
    try {
      await exportCharacterPdf(character);
      toast.success(`Ficha de ${character.name || 'tu personaje'} descargada.`);
    } catch {
      toast.error('No se pudo generar el PDF. Prueba otra vez.');
    } finally {
      setIsExporting(false);
    }
  }, []);

  const downloadJson = useCallback((character: DraftCharacter) => {
    try {
      exportCharacterJson(character);
      toast.success(`Datos de ${character.name || 'tu personaje'} descargados.`);
    } catch {
      toast.error('No se pudo exportar el personaje. Prueba otra vez.');
    }
  }, []);

  return { isExporting, downloadPdf, downloadJson };
};
