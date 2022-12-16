import "../styles/globals.css";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";

function MyApp({ Component, pageProps }) {
  return (
      <>
        <Head>
          <title>Pokedex</title>
        </Head>
        <Navbar/>
        <Component {...pageProps} />
      </>
    )
}

export default MyApp;
