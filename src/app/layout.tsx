import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { ToolsProvider } from '../context/ToolsContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cursor Rewrite - Agentic Mode',
  description: 'A recreation of Cursor\'s Agentic mode with a chatbot interface and tools integration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToolsProvider>
          <div className="w-full h-full">
            {children}
          </div>
        </ToolsProvider>
      </body>
    </html>
  );
}