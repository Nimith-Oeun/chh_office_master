'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Kbd } from '@/components/ui/kbd';

export function ThemeModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const handleThemeToggle = React.useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
      const root = document.documentElement;

      if (!document.startViewTransition) {
        setTheme(newTheme);
        return;
      }

      if (e) {
        root.style.setProperty('--x', `${e.clientX}px`);
        root.style.setProperty('--y', `${e.clientY}px`);
      }

      document.startViewTransition(() => {
        setTheme(newTheme);
      });
    },
    [resolvedTheme, setTheme]
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="relative size-8 overflow-hidden"
          onClick={handleThemeToggle}
        >
          {/* Sun Icon */}
          <Icons.sun
            className="
              absolute h-4 w-4
              text-secondary-foreground
              transition-all duration-300
              rotate-0 scale-100
              dark:-rotate-90 dark:scale-0
            "
          />

          {/* Moon Icon */}
          <Icons.moon
            className="
              absolute h-4 w-4
              text-slate-700
              transition-all duration-300
              rotate-90 scale-0
              dark:rotate-0 dark:scale-100
              dark:text-blue-300
            "
          />

          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        Toggle theme <Kbd>D D</Kbd>
      </TooltipContent>
    </Tooltip>
  );
}