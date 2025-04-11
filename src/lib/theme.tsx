'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

// Re-export useTheme from next-themes
export { useTheme } from 'next-themes'; 