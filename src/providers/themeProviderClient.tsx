'use client';

import { ThemeProvider, useTheme } from "@/context/themecontext";
import { useEffect } from "react";

const ThemeProviderClient = ({ children }: { children: React.ReactNode }) => {
  return (<ThemeProvider>
      {children}
  </ThemeProvider>
  )
};

export default ThemeProviderClient;