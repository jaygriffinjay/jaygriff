import type { ReactNode } from 'react';
import { ThemeProviders } from '../theme/theme';
import { GlobalStyles } from '../styles/GlobalStyles';
import NavBar from '../components/NavBar';
import { getAllRoutes } from '@/lib/routes';
import { Analytics } from '@vercel/analytics/next';
import { Sekuya } from 'next/font/google';
import localFont from 'next/font/local';

const sekuya = Sekuya({ subsets: ['latin'], weight: ['400'], adjustFontFallback: false, variable: '--font-sekuya' });
const jetbrainsMono = localFont({
  src: [
    { path: '../assets/fonts/JetBrainsMono[wght].ttf', style: 'normal', weight: '100 800' },
    { path: '../assets/fonts/JetBrainsMono-Italic[wght].ttf', style: 'italic', weight: '100 800' },
  ],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata = {
  // Site title (shows in browser tab and search results)
  title: "Jay Griffin",

  // Meta description (shows in search results under title)
  description: "Full-stack developer building modern web applications with React, Next.js, and TypeScript.",

  // Keywords for SEO (less important but still used by some search engines)
  keywords: [
    "Jay Griffin",
    "full-stack developer",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "software engineer",
    "web development",
    "frontend developer",
    "JavaScript developer"
  ],

  // Author info
  authors: [{ name: "Jay Griffin" }],

  // Favicon
  icons: {
    icon: '/faviconv2.ico?v=2',
    apple: '/apple-touch-icon-v2.png?v=2',
  },

  // Tell search engines to index this site
  robots: "index, follow",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const routes = await getAllRoutes();
  
  return (
    <html lang="en" className={`${sekuya.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ThemeProviders>
          <GlobalStyles />
          <NavBar routes={routes} />
          {children}
          <Analytics />
        </ThemeProviders>
      </body>
    </html>
  );
}
