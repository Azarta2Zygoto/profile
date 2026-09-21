import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { PropsWithChildren } from "react";

import { routing } from "@/i18n/routing";
import { APP_CONFIG, PATH } from "@/types/common.constants";
import { LocaleProps } from "@/types/common.types";

export async function generateMetadata(
    props: Readonly<LocaleProps>,
): Promise<Metadata> {
    const { locale } = await props.params;
    const t = await getTranslations({ locale });
    return {
        title: t("Metadata.projects-page-title"),
        description: t("Metadata.projects-page-desc"),
        alternates: {
            canonical: `${APP_CONFIG.baseUrl}${routing.defaultLocale}${PATH.project}`,
            languages: routing.locales.reduce(
                (acc, loc) => {
                    acc[loc] = `${APP_CONFIG.baseUrl}${loc}${PATH.project}`;
                    return acc;
                },
                {} as Record<string, string>,
            ),
        },
    };
}

export default function ProjectLayout({
    children,
}: Readonly<PropsWithChildren>) {
    return children;
}
