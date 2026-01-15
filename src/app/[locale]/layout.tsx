import type { Metadata, Viewport } from "next";
import { type Locale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Bar from "@/components/bar";
import Footer from "@/components/footer";
import { GlobalProvider } from "@/components/globalProvider";
import Header from "@/components/header";
import { base_url } from "@/data/env";
import { routing } from "@/i18n/routing";

import "../globals.css";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: "#6496fa",
    colorScheme: "light dark",
};

export async function generateMetadata(props: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = (await props.params) as { locale: Locale };
    const t = await getTranslations({ locale });

    return {
        metadataBase: new URL(base_url),
        title: t("Metadata.title"),
        description: t("Metadata.description"),
        keywords: t("Metadata.keywords"),
        icons: {
            icon: "/profile/logo-200.png",
            shortcut: "/profile/logo-200.png",
            apple: "/profile/logo-200.png",
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
            images: "/logo-200.png",
            type: "website",
            siteName: t("Metadata.siteName"),
            locale: "fr_FR",
            alternateLocale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title: t("Metadata.title"),
            creator: "@QuentinPotiron",
            description: t("Metadata.description"),
            images: "/logo-200.png",
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
            <body>
                <NextIntlClientProvider locale={locale}>
                    <GlobalProvider>
                        <Header locale={locale} />
                        <main>
                            <Bar />
                            <div className="page-container">{children}</div>
                        </main>
                        <Footer />
                    </GlobalProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
