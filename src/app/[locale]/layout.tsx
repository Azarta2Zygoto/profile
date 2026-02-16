import type { Metadata } from "next";
import { type Locale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Bar from "@/components/bar";
import Footer from "@/components/footer";
import { GlobalProvider } from "@/components/globalProvider";
import Header from "@/components/header";
import { base_url } from "@/data/env";
import personalData from "@/data/personal_data.json";
import { routing } from "@/i18n/routing";

import "../globals.css";

export async function generateMetadata(props: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = (await props.params) as { locale: Locale };
    const t = await getTranslations({ locale });

    return {
        metadataBase: new URL(base_url),
        title: {
            default: t("Metadata.title"),
            template: "%s - " + t("Metadata.siteName"),
        },
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
            description: t("Metadata.description"),
            images: "/logo-200.png",
        },
        alternates: {
            canonical: `${base_url}${routing.defaultLocale}`,
            languages: routing.locales.reduce(
                (acc, locale) => {
                    acc[locale] = `${base_url}${locale}`;
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
    const t = await getTranslations({ locale });
    setRequestLocale(locale);

    const personJsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: `${personalData.lastname} ${personalData.firstname}`,
        url: `${base_url}${locale}`,
        jobTitle: personalData.job,
        email: `mailto:${personalData.gmail}`,
        sameAs: `${base_url}${locale}`,
        knowsLanguage: personalData.languages.map((lang) => {
            return {
                "@type": "Language",
                name: t(`Languages.${lang}`),
                alternateName: lang,
            };
        }),
        nationality: personalData.nationality.map((nat) => {
            return {
                "@type": "Country",
                name: t(`Languages.${nat}`),
                alternateName: nat,
            };
        }),
    };

    return (
        <html lang={locale}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(personJsonLd),
                    }}
                />
            </head>
            <body>
                <NextIntlClientProvider locale={locale}>
                    <GlobalProvider>
                        <Header locale={locale} />
                        <main role="main">
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
