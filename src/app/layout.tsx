import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProviderClient from "@/providers/themeProviderClient";
import ClientTheme from "@/components/clientTheme";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Labzz Front Challenge",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased` + ' bg-zinc-900 '}>
      <ThemeProviderClient>
          <ClientTheme>
            {children}
          </ClientTheme>
        </ThemeProviderClient>
      </body>
    </html>
  );
}
