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
        title: t("Metadata.study-page-title"),
        description: t("Metadata.study-page-desc"),
        alternates: {
            canonical: `${APP_CONFIG.baseUrl}${routing.defaultLocale}${PATH.study}`,
            languages: routing.locales.reduce(
                (acc, loc) => {
                    acc[loc] = `${APP_CONFIG.baseUrl}${loc}${PATH.study}`;
                    return acc;
                },
                {} as Record<string, string>,
            ),
        },
    };
}

export default function StudyLayout({ children }: Readonly<PropsWithChildren>) {
    return children;
}
