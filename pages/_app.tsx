import "../src/shared/styles/globals.css";
import type { AppProps } from "next/app";
import { CustomBreakPointProvider } from "../src/shared/hooks/useCustomBreakPoint";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CustomBreakPointProvider>
      <Component {...pageProps} />
    </CustomBreakPointProvider>
  );
}

export default MyApp;
