// app/layout.tsx

import '../../styles/globals.scss';
import { AuthProvider } from './contexts/AuthContext';
import React from 'react';


export const metadata = {
  title: 'Pizzaria entre amigos',
  description: 'Descrição da Pizzaria entre amigos',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
