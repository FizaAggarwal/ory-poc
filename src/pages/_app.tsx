import "@/styles/globals.css";
import { IntlProvider, ThemeProvider } from "@ory/elements";
import type { AppProps } from "next/app";
import { Fragment } from "react";
import "@ory/elements/style.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <ThemeProvider>
        <IntlProvider>
          <Component {...pageProps} />
        </IntlProvider>
      </ThemeProvider>
    </Fragment>
  );
}
