'use client';

import { useTheme } from "@/context/themecontext";
import { Toaster } from "./ui/toaster";
import { LanguageProvider } from "@/context/translationcontext";

const ClientTheme = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <LanguageProvider>
    <div className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
      {children}
      <Toaster></Toaster>
    </div>
    </LanguageProvider>
  );
};

export default ClientTheme;