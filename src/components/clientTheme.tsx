'use client';

import { useTheme } from "@/context/themecontext";

const ClientTheme = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
      {children}
    </div>
  );
};

export default ClientTheme;