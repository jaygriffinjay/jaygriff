import type { ReactNode } from 'react';
import { ThemeProviders } from '../theme/theme';
import { GlobalStyles } from '../styles/GlobalStyles';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProviders>
          <GlobalStyles />
          {children}
        </ThemeProviders>
      </body>
    </html>
  );
}
