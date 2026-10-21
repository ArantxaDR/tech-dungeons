import { FiDownload as Download, FiFileText as FileText } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import type { DraftCharacter } from '@/data/customCharacters';

interface ExportButtonsProps {
  character: DraftCharacter;
  onDownloadPdf: (character: DraftCharacter) => Promise<void>;
  onDownloadJson: (character: DraftCharacter) => void;
  /** True while the PDF is being built. */
  isExporting?: boolean;
}

/** The download options of a character: the sheet as PDF and the data as JSON. */
export const ExportButtons = ({
  character,
  onDownloadPdf,
  onDownloadJson,
  isExporting = false,
}: ExportButtonsProps) => (
  <div className="rpg-card">
    <h2 className="section-title">Descargar</h2>

    <div className="grid gap-3 sm:grid-cols-2">
      <Button variant="secondary" onClick={() => onDownloadPdf(character)} disabled={isExporting}>
        <Download className="w-4 h-4 mr-2" />
        {isExporting ? 'Generando PDF…' : 'Descargar PDF'}
      </Button>

      <Button variant="outline" onClick={() => onDownloadJson(character)}>
        <FileText className="w-4 h-4 mr-2" />
        Descargar JSON
      </Button>
    </div>

    <p className="mt-3 text-xs text-muted-foreground">
      El PDF lleva la ficha completa; el JSON guarda los datos del personaje por si
      quieres respaldarlo.
    </p>
  </div>
);
