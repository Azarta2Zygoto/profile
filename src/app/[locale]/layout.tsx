import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import { PropsWithChildren } from "react";

import Bar from "@/components/bar";
import Footer from "@/components/footer";
import { GlobalProvider } from "@/components/globalProvider";
import Header from "@/components/header";
import { routing } from "@/i18n/routing";
import { APP_CONFIG, ASSETS } from "@/types/common.constants";
import { LocaleProps } from "@/types/common.types";
import { buildAssetPath } from "@/utils/path.utils";

import JSONLD from "./head";

export async function generateMetadata(props: LocaleProps): Promise<Metadata> {
    const { locale } = await props.params;
    const t = await getTranslations({ locale });

    return {
        metadataBase: new URL(APP_CONFIG.baseUrl),
        title: {
            default: t("Metadata.title"),
            template: "%s - " + t("Metadata.siteName"),
        },
        description: t("Metadata.description"),
        keywords: t("Metadata.keywords"),
        icons: {
            icon: buildAssetPath(ASSETS.IMAGES.LOGO_200, "/profile/"),
            shortcut: buildAssetPath(ASSETS.IMAGES.LOGO_200, "/profile/"),
            apple: buildAssetPath(ASSETS.IMAGES.LOGO_200, "/profile/"),
        },
        authors: [
            {
                name: "Quentin Potiron",
            },
        ],
        openGraph: {
            title: t("Metadata.title"),
            description: t("Metadata.description"),
            url: "/",
            images: {
                url: buildAssetPath(ASSETS.IMAGES.LOGO_200, "/"),
                alt: t("Metadata.siteName"),
            },
            type: "website",
            siteName: t("Metadata.siteName"),
            locale: "fr_FR",
            alternateLocale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title: t("Metadata.title"),
            description: t("Metadata.description"),
            images: {
                url: buildAssetPath(ASSETS.IMAGES.LOGO_200, "/"),
                alt: t("Metadata.siteName"),
            },
        },
        alternates: {
            canonical: `${APP_CONFIG.baseUrl}${routing.defaultLocale}`,
            languages: routing.locales.reduce(
                (acc, locale) => {
                    acc[locale] = `${APP_CONFIG.baseUrl}${locale}`;
                    return acc;
                },
                {} as Record<string, string>,
            ),
        },
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
    children,
    params,
}: Readonly<PropsWithChildren<LocaleProps>>) {
    const { locale } = await params;

    return (
        <html
            lang={locale}
            suppressHydrationWarning
        >
            <NextIntlClientProvider locale={locale}>
                <head>
                    <JSONLD locale={locale} />
                    <Script
                        id="theme-script"
                        strategy="beforeInteractive"
                    >
                        {`
                            (function () {
                                const DEFAULT_THEME = "LIGHT";
                                const THEME_ATTRIBUTE = "data-theme";
                                const THEME_STORAGE_KEY = "theme";

                                try {
                                    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
                                    const theme = storedTheme || DEFAULT_THEME;
                                    console.log("Theme set to:", theme);

                                    document.documentElement.setAttribute(
                                        THEME_ATTRIBUTE,
                                        theme
                                    );
                                } catch (error) {
                                    document.documentElement.setAttribute(
                                        THEME_ATTRIBUTE,
                                        DEFAULT_THEME
                                    );
                                }
                            })();
                        `}
                    </Script>
                </head>
                <body>
                    {process.env.NODE_ENV === "development" && (
                        <Script
                            strategy="afterInteractive"
                            src="https://unpkg.com/react-scan@latest/dist/auto.global.js"
                        />
                    )}
                    <GlobalProvider>
                        <Header locale={locale} />
                        <main>
                            <Bar />
                            <div className="page-container">{children}</div>
                        </main>
                        <Footer />
                    </GlobalProvider>
                </body>
            </NextIntlClientProvider>
        </html>
    );
}
