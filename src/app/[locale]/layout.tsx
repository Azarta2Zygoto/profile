import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { PropsWithChildren } from "react";

import generateGlobalMetadata from "@/components/app/metadata";
import Shell from "@/components/app/shell";
import { Locale, routing } from "@/i18n/routing";
import { AsyncLocaleProps } from "@/types/common.types";

import notFound from "../not-found";

export async function generateMetadata(
    props: AsyncLocaleProps,
): Promise<Metadata> {
    const { locale } = await props.params;

    return generateGlobalMetadata(locale as Locale);
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
    children,
    params,
}: Readonly<PropsWithChildren<AsyncLocaleProps>>) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        return notFound();
    }

    return <Shell locale={locale as Locale}>{children}</Shell>;
}
