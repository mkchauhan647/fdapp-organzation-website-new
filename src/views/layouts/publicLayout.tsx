"use client"
import { Metadata } from "next";

import "@/styles/globals.css"

import { RootFooter , RootHeader } from "@/helpers/dynamic-imports/components";
import { RootLayoutMetaData } from "@/utils/seo/metadata";
import { RootLayoutSchema } from "@/utils/schema/commonschema";
import Head from "next/head";
import { ReduxProvider } from "@/helpers/dynamic-imports/redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/helpers/redux/store";

export const metadata: Metadata = RootLayoutMetaData;

const PublicLayout: React.FC<RootLayoutSchema> = ({children}) => {
  return (
    <>
      
      <Head>
        <title>{RootLayoutMetaData.title}</title>
        <meta name="description" content={RootLayoutMetaData.description} />
      </Head>
      <ReduxProvider>
        <PersistGate loading={null} persistor={persistor}>
            <RootHeader />
            <main>{children}</main>
            <RootFooter />
        </PersistGate>
      </ReduxProvider>
    </>
  );
}

export default PublicLayout;
