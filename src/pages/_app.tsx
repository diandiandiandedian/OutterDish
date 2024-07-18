import "@/styles/globals.css";
import type {AppProps} from "next/app";
import Head from 'next/head';
import {NotificationProvider} from "../context/NotificationContext";

export default function App({Component, pageProps}: AppProps) {
    return (<>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        </Head>
        <NotificationProvider>
        <Component {...pageProps} />
        </NotificationProvider>
    </>)
}
