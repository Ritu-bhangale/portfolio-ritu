import 'layouts/App/reset.css';
import 'layouts/App/global.css';

import { ThemeProvider } from 'components/ThemeProvider';
import { tokens } from 'components/ThemeProvider/theme';
import { VisuallyHidden } from 'components/VisuallyHidden';
import { Loader } from 'components/Loader';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { useFoucFix } from 'hooks';
import styles from 'layouts/App/App.module.css';
import { initialState, reducer } from 'layouts/App/reducer';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { Fragment, createContext, useEffect, useReducer, useState } from 'react';
import { msToNum } from 'utils/style';
import { ScrollRestore } from '../layouts/App/ScrollRestore';

export const AppContext = createContext({});

function getSeasonIndexFromMonth() {
  const month = new Date().getMonth() + 1;

  if (month >= 3 && month <= 6) return 0;
  if (month >= 7 && month <= 9) return 1;
  if (month >= 10 && month <= 11) return 2;
  return 3;
}

const App = ({ Component, pageProps }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true);
  const { route } = useRouter();
  useFoucFix();

  useEffect(() => {
    if (state.seasonIndex === null) {
      dispatch({ type: 'setSeason', value: getSeasonIndexFromMonth() });
    }
  }, [state.seasonIndex]);

  useEffect(() => {
    const hasSeenLoader = localStorage.getItem('portfolioLoaderSeen');

    if (hasSeenLoader) {
      // Loader already shown before, skip it
      setIsLoading(false);
    } else {
      // First visit, show loader
      const timer = setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('portfolioLoaderSeen', 'true');
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <ThemeProvider>
        <LazyMotion features={domAnimation}>
          <Fragment>
            <Loader isVisible={isLoading} />
            <Head>
              {/* Canonical URLs live in components/Meta so each route emits
                  exactly one, built from the same helper as og:url. */}
              {/* The gtag shim stays inline and early: it costs no network
                  request and it means window.gtag exists from the first byte,
                  so events fired before the analytics library has loaded queue
                  into dataLayer and are delivered when it arrives. */}
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-LFH046PDD6');`,
                }}
              />
            </Head>
            {/* The analytics library itself goes through next/script with the
                afterInteractive strategy rather than a raw <script async> in
                <head>. As a head tag it was requested alongside the page's own
                CSS, fonts and JS and took a share of the connection before
                anything had painted; afterInteractive holds it until after
                hydration so it no longer competes with the critical path. */}
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-LFH046PDD6"
              strategy="afterInteractive"
            />
            <VisuallyHidden
              showOnFocus
              as="a"
              className={styles.skip}
              href="#MainContent"
            >
              Skip to main content
            </VisuallyHidden>
            <main className={styles.app} tabIndex={-1} id="MainContent">
              <AnimatePresence exitBeforeEnter>
                {/* The enter fade is a CSS animation on `.page` (same linear
                    curve, same durationS, same 0.1s delay), not a framer
                    `initial: { opacity: 0 }`. Framer serialises `initial` into
                    the static HTML as an inline `opacity:0` on this wrapper,
                    which is every pixel of every page — so nothing was
                    eligible for First Contentful or Largest Contentful Paint
                    until the whole JS bundle had downloaded and hydrated.
                    Starting at opacity 1 lets the server-rendered markup paint
                    immediately; framer still owns the exit fade, which only
                    ever runs after hydration anyway. */}
                <m.div
                  key={route}
                  className={styles.page}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: 'tween',
                    ease: 'linear',
                    duration: msToNum(tokens.base.durationS) / 1000,
                    delay: 0.1,
                  }}
                >
                  <ScrollRestore />
                  <Component {...pageProps} />
                </m.div>
              </AnimatePresence>
            </main>
          </Fragment>
        </LazyMotion>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default App;
