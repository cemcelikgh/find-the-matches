'use client';

import { useAppSelector } from "@/lib/hooks";
import { selectTheme } from "@/lib/features/themeSlice";

function Html({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const theme = useAppSelector(selectTheme);
  const mode = theme ==='dark-theme' ? 'dark'
    : theme === 'light-theme' ? 'light' : undefined;

  return (
    <html lang="en" className={theme} style={{colorScheme: mode}}>
      <body>
        {children}
      </body>
    </html>
  );

}

export default Html;
