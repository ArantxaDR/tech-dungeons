import watermarkMarkup from '@/assets/borders/border-watermark.svg?raw';

interface BorderWatermarkProps {
  className?: string;
}

// Inlined (not referenced via url()) so currentColor resolves against the
// page's own CSS custom properties instead of the file's isolated context.
export const BorderWatermark = ({ className = '' }: BorderWatermarkProps) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none ${className}`}
    style={{ color: 'hsl(var(--border-gold))' }}
    dangerouslySetInnerHTML={{ __html: watermarkMarkup }}
  />
);
