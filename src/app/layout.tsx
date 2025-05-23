// app/layout.tsx

import '../../styles/globals.scss' // importa os estilos globais

export const metadata = {
  title: 'Pizzaria entre amigos',
  description: 'Descrição da Pizzaria entre amigos',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Aqui você pode colocar Providers, Layouts fixos, etc */}
        {children}
      </body>
    </html>
  )
}
