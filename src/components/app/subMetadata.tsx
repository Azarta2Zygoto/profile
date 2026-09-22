import type { Metadata } from "next";
import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { APP_CONFIG } from "@/types/common.constants";

export default async function generateSubMetadata(
    locale: Locale,
    path: string,
): Promise<Metadata> {
    const t = await getTranslations({ locale });
    return {
        title: t(`Metadata.${path}-title`),
        description: t(`Metadata.${path}-desc`),
        alternates: {
            canonical: `${APP_CONFIG.baseUrl}${routing.defaultLocale}${path}`,
            languages: routing.locales.reduce(
                (acc, loc) => {
                    acc[loc] = `${APP_CONFIG.baseUrl}${loc}${path}`;
                    return acc;
                },
                {} as Record<string, string>,
            ),
        },
    };
}
