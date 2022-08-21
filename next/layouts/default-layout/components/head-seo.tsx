import Head from "next/head";

export const HeadSEO = (props: any) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width, maximum-scale=5"
      />
      <link rel="icon" href="/favicon.ico" />
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <meta property="og:title" content="Ather Sphere" />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content="⭐️ NFT Play,Learn&amp;Earn Game - Explore,Protect and Save Our Planet ⭐️"
      />
      <meta property="og:site_name" content="Ather Sphere" />
      <meta property="og:image" content="https://athersphere.com/atherforest.jpg" />
      <meta
        property="og:image:alt"
        content="NFT Play,Learn&amp;Earn Game - Explore,Protect and Save Our Planet"
      />
      <meta property="og:url" content="https://athersphere.com/" />
      <meta property="og:image:width" content="560" />
      <meta property="og:image:height" content="292" />
    </Head>
  );
};
