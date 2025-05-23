import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Aqui você pode adicionar links para fontes, ícones, etc */}
        <link rel="stylesheet" href="/styles/globals.scss" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}