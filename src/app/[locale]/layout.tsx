import type { Metadata } from "next";
import { type Locale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";

import "../globals.css";

export async function generateMetadata(props: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = (await props.params) as { locale: Locale };
    const t = await getTranslations({ locale });

    return {
        title: t("Metadata.title"),
        description: t("Metadata.description"),
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
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
