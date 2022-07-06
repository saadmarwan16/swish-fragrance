import Head from "next/head";
import { FunctionComponent, ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  titlePrefix: string;
}

const MainLayout: FunctionComponent<MainLayoutProps> = ({
  children,
  titlePrefix,
}) => {
  const title = titlePrefix + " | Swish Fragrance";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div>{children}</div>
    </>
  );
};

export default MainLayout;
