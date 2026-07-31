import { tokenStyles } from 'components/ThemeProvider';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-256.png" />
        <link type="text/plain" rel="author" href="/humans.txt" />

        <link rel="preload" href="/fonts/ClashGrotesk-Regular.woff2" as="font" type="font/woff2" crossOrigin="true" />
        <link rel="preload" href="/fonts/SeasonSerif-TRIAL-Medium.woff2" as="font" type="font/woff2" crossOrigin="true" />
        <style dangerouslySetInnerHTML={{ __html: tokenStyles }} />
      </Head>
      <body tabIndex={-1}>
        <Main />
        <NextScript />
        <div id="portal-root" />
      </body>
    </Html>
  );
}
