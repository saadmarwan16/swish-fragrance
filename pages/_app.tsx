import "../src/shared/styles/globals.css";
import type { AppProps } from "next/app";
import { CustomBreakPointProvider } from "../src/shared/hooks/useCustomBreakPoint";
import { parseCookies } from "nookies";
import Router from "next/router";
import Routes from "../src/shared/constants/routes";
import { configure } from "mobx";
// import { ToastContainer } from "react-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  configure({
    enforceActions: "never",
  });

  return (
    <CustomBreakPointProvider>
      {/* <ToastContainer position="bottom-right" delay={1000} /> */}
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
  );
};

const redirectUser = (ctx: any, location: any) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};

MyApp.getInitialProps = async ({
  Component,
  ctx,
}: {
  Component: any;
  ctx: any;
}) => {
  let pageProps = {};
  const jwt = parseCookies(ctx).jwt;

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (!jwt) {
    if (ctx.pathname !== Routes.ADMIN_LOGIN) {
      redirectUser(ctx, Routes.ADMIN_LOGIN);
    }
  }

  return {
    pageProps,
  };
};

export default MyApp;
