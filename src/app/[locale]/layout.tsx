import type { Metadata } from "next";
import Script from "next/script";
import { type Locale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Bar from "@/components/bar";
import Footer from "@/components/footer";
import { GlobalProvider } from "@/components/globalProvider";
import Header from "@/components/header";
import { APP_CONFIG } from "@/data/config";
import { ASSETS, buildAssetPath } from "@/data/constants";
import { routing } from "@/i18n/routing";

import "../globals.css";
import JSONLD from "./head";

export async function generateMetadata(props: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = (await props.params) as { locale: Locale };
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
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = (await params) as { locale: Locale };
    setRequestLocale(locale);

    return (
        <html lang={locale}>
            <NextIntlClientProvider locale={locale}>
                <head>
                    <JSONLD locale={locale} />
                </head>
                <body>
                    {process.env.NODE_ENV === "development" && (
                        <Script
                            strategy="afterInteractive"
                            src="https://unpkg.com/react-scan/dist/auto.global.js"
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
