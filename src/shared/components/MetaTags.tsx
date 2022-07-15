import Head from "next/head";
import { FunctionComponent, ReactNode } from "react";

interface MetaTagsProps {
  titlePrefix: string;
}

const MetaTags: FunctionComponent<MetaTagsProps> = ({ titlePrefix }) => {
  const title = titlePrefix + " | Swish Fragrance";

  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default MetaTags;
