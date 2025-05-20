import './globals.css';
import { ReduxProvider } from '@/providers/ReduxProvider';

export default function RootLayout({
  children,
} : {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body>
          { children }
        </body>
      </ReduxProvider>
    </html>
  )
}
