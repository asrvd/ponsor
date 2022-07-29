import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import NProgress from "nprogress";
import { Router } from "next/router";
import "../styles/nprogress.css";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  NProgress.configure({ showSpinner: false });
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());
  return (
    <SessionProvider session={session}>
      <Head>
        <title>ponsor</title>
        <link rel="icon" href="https://favmoji.asheeshh.ga/🎁"></link>
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </SessionProvider>
  );
}

export default MyApp;
