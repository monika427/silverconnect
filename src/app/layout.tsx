import type { Metadata } from 'next';
import './globals.css';
import { AppStateProvider } from '@/components/providers/app-state-provider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Silver Connect',
  description: 'Digital literacy for seniors',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AppStateProvider>
          {children}
          <Toaster />
        </AppStateProvider>
      </body>
    </html>
  );
}
