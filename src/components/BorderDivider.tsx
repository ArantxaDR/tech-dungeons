import interlaceUrl from '@/assets/borders/border-h-interlace.svg';
import vineUrl from '@/assets/borders/border-h-vine.svg';
import bestiaryUrl from '@/assets/borders/border-h-bestiary.svg';

// Native tile size preserved (width scaled to the target height) so the
// motif never looks squashed — see each .svg's own viewBox for the source.
const VARIANTS = {
  interlace: { url: interlaceUrl, width: 80, height: 32 },
  vine: { url: vineUrl, width: 70, height: 28 },
  bestiary: { url: bestiaryUrl, width: 107, height: 32 },
} as const;

interface BorderDividerProps {
  variant: keyof typeof VARIANTS;
  className?: string;
}

export const BorderDivider = ({ variant, className = '' }: BorderDividerProps) => {
  const { url, width, height } = VARIANTS[variant];
  return (
    <div
      aria-hidden="true"
      className={`w-full ${className}`}
      style={{
        height,
        backgroundImage: `url(${url})`,
        backgroundRepeat: 'repeat-x',
        backgroundSize: `${width}px ${height}px`,
        backgroundPosition: 'center',
      }}
    />
  );
};
