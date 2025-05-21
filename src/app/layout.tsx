'use client';

import './globals.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
} : {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full overflow-hidden">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Toaster richColors position="top-center" />
            { children }
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
