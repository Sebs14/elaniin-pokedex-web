import "../styles/globals.css";
import Head from "next/head";
import { AuthContextProvider } from "./UserContext";
import { useState, useMemo} from 'react';

function MyApp({ Component, pageProps }) {

  
  return (
    <>
      <AuthContextProvider>
        <Head>
          <title>Pokedex</title>
        </Head>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
