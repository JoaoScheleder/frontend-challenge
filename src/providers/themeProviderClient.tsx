'use client';

import { ThemeProvider, useTheme } from "@/context/themecontext";
import { LanguageProvider } from "@/context/translationcontext";
import { useEffect } from "react";

const ThemeProviderClient = ({ children }: { children: React.ReactNode }) => {
  return (
      <ThemeProvider>
          {children}
      </ThemeProvider>
  )
};

export default ThemeProviderClient;