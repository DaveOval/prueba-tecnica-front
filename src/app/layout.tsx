import './globals.css';
import { ReduxProvider } from '@/providers/ReduxProvider';
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
} : {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <ReduxProvider>
        <body className="h-full overflow-hidden">
          <Toaster richColors position="top-center" />
          { children }
        </body>
      </ReduxProvider>
    </html>
  )
}
