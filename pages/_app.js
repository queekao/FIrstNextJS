import Layout from "../components/layout/Layout";
import "../styles/globals.css";

function MyApp({Component, pageProps}) {
  // this App component will in the end be actual page content of our different pages
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
