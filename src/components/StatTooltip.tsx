import * as React from 'react';
import { useId } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { STAT_GLOSSARY, type StatKey } from '@/data/statGlossary';
import { cn } from '@/lib/utils';

/**
 * Radix tooltips never open on touch (its trigger ignores pointerType === 'touch'),
 * so on coarse pointers the same explanation is offered as a tap-to-open popover.
 */
const useIsHoverable = () => {
  const [hoverable, setHoverable] = React.useState(false);

  React.useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;

    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setHoverable(query.matches);

    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return hoverable;
};

interface StatTooltipProps {
  stat: StatKey;
  side?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const StatTooltip = ({ stat, side = 'top', className }: StatTooltipProps) => {
  const definition = STAT_GLOSSARY[stat];
  const descriptionId = useId();
  const hoverable = useIsHoverable();

  // Always in the DOM, whether or not the visual layer is open, so assistive
  // tech gets the meaning on first read and on any device.
  const srDescription = (
    <span id={descriptionId} className="sr-only">
      {definition.label}: {definition.description}
    </span>
  );

  const trigger = (
    <button
      type="button"
      aria-describedby={descriptionId}
      className={cn('stat-tooltip-trigger', className)}
    >
      {definition.abbr}
    </button>
  );

  const explanation = (
    <>
      <span className="block font-display text-sm font-bold text-primary">
        {definition.label}
      </span>
      <span className="mt-1 block text-xs leading-relaxed text-popover-foreground">
        {definition.description}
      </span>
    </>
  );

  if (hoverable) {
    return (
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger asChild>{trigger}</TooltipTrigger>
          <TooltipContent side={side} className="max-w-[15rem] rounded-none">
            {explanation}
          </TooltipContent>
        </Tooltip>
        {srDescription}
      </TooltipProvider>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        side={side}
        align="start"
        className="w-56 rounded-none"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        {explanation}
      </PopoverContent>
      {srDescription}
    </Popover>
  );
};
