import { NextIntlClientProvider } from "next-intl";
import Script from "next/script";
import type { PropsWithChildren } from "react";

import { ThemeProvider } from "next-themes";

import { Locale } from "@/i18n/routing";

import Bar from "../bar";
import Footer from "../footer";
import Header from "../header";
import JSONLD from "./jsonLD";

interface Props {
    locale: Locale;
}

export default function Shell({
    locale,
    children,
}: Readonly<PropsWithChildren<Props>>) {
    return (
        <html
            lang={locale}
            suppressHydrationWarning
        >
            <NextIntlClientProvider locale={locale}>
                <head>
                    <JSONLD locale={locale} />
                </head>
                <body>
                    <ThemeProvider>
                        {process.env.NODE_ENV === "development" && (
                            <Script
                                strategy="afterInteractive"
                                src="https://unpkg.com/react-scan@latest/dist/auto.global.js"
                            />
                        )}
                        <Header locale={locale} />
                        <main>
                            <Bar />
                            <div className="page-container">{children}</div>
                        </main>
                        <Footer />
                    </ThemeProvider>
                </body>
            </NextIntlClientProvider>
        </html>
    );
}
