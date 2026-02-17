import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Fragment } from "react";

import { APP_CONFIG } from "@/data/config";
import path_json from "@/data/path.json";
import type { Locale } from "@/data/types";
import { routing } from "@/i18n/routing";

export async function generateMetadata(props: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = (await props.params) as { locale: Locale };
    const t = await getTranslations({ locale });
    return {
        title: t("Metadata.study-page-title"),
        description: t("Metadata.study-page-desc"),
        alternates: {
            canonical: `${APP_CONFIG.baseUrl}${routing.defaultLocale}${path_json.study}`,
            languages: routing.locales.reduce(
                (acc, loc) => {
                    acc[loc] = `${APP_CONFIG.baseUrl}${loc}${path_json.study}`;
                    return acc;
                },
                {} as Record<string, string>,
            ),
        },
    };
}

export default function StudyLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <Fragment>{children}</Fragment>;
}
