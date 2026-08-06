import { tokenStyles } from 'components/ThemeProvider';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />

        <link rel="manifest" href="/manifest.json" />
        {/* SVG first so browsers that support it get the scheme aware mark,
            PNG and ICO are the fallbacks for everything else. */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link type="text/plain" rel="author" href="/humans.txt" />

        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

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
