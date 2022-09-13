import "../src/shared/styles/globals.css";
import type { AppProps } from "next/app";
import { CustomBreakPointProvider } from "../src/shared/hooks/useCustomBreakPoint";
import { configure } from "mobx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "../src/modules/auth/AuthContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  configure({
    enforceActions: "never",
  });

  return (
    <AuthContextProvider>
      <CustomBreakPointProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
        />
        <Component {...pageProps} />
      </CustomBreakPointProvider>
    </AuthContextProvider>
  );
};

export default MyApp;
