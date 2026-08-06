import { ReactNode } from 'react';
import interlaceVUrl from '@/assets/borders/border-v-interlace.svg';

const marginStyle = {
  backgroundImage: `url(${interlaceVUrl})`,
  backgroundRepeat: 'repeat-y' as const,
  backgroundSize: '32px 80px',
  backgroundPosition: 'center',
};

interface PageMarginsProps {
  children: ReactNode;
  className?: string;
}

export const PageMargins = ({ children, className = '' }: PageMarginsProps) => (
  <div className={`flex justify-center ${className}`}>
    {/* Illuminated side margin — desktop only, purely decorative */}
    <div aria-hidden="true" className="hidden lg:block w-8 flex-shrink-0" style={marginStyle} />
    <div className="flex-1 min-w-0">{children}</div>
    {/* Illuminated side margin — mirrored */}
    <div aria-hidden="true" className="hidden lg:block w-8 flex-shrink-0" style={{ ...marginStyle, transform: 'scaleX(-1)' }} />
  </div>
);
