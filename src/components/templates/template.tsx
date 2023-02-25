import Head from "next/head";
import { ReactNode } from "react";
import Header from "@components/organisms/header";

interface IProps {
  children: ReactNode;
}

export default function Template({ children }: IProps) {
  return (
    <>
      <Head>
        <title>Todo app</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div>{children}</div>
    </>
  );
}
