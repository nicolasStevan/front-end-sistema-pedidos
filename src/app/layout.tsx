// app/layout.tsx

import '../../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css'; // Importa os estilos do Toastify

import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/AuthContext';
import React from 'react';

export const metadata = {
  title: 'Pizzaria entre amigos',
  description: 'Descrição da Pizzaria entre amigos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </AuthProvider>
      </body>
    </html>
  );
}
