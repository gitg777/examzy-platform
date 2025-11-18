'use client';

import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: '',
          style: {
            background: 'var(--background)',
            color: 'var(--foreground)',
            border: '1px solid var(--border-color)',
          },
          success: {
            iconTheme: {
              primary: '#7e9142',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#dc2626',
              secondary: 'white',
            },
          },
        }}
      />
    </>
  );
}
