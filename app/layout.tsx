import type {Metadata} from 'next';
import { Nunito } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/components/AuthProvider';
import { Sidebar } from '@/components/Sidebar';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: 'Biblicando',
  description: 'Aprenda a Bíblia de forma divertida!',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={nunito.variable} suppressHydrationWarning>
      <body className="bg-gray-100 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 antialiased min-h-[100dvh] transition-colors duration-300 flex overflow-x-hidden" suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            <div className="flex flex-col flex-1 w-full min-h-[100dvh] bg-white dark:bg-gray-900 transition-colors duration-300">
              {children}
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
