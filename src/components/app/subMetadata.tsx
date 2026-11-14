import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { getLocalizedUrl } from "@/utils/path.utils";

export default async function generateSubMetadata(
    locale: Locale,
    path: string,
): Promise<Metadata> {
    const t = await getTranslations({ locale });
    return {
        title: t(`Metadata.${path}-title`),
        description: t(`Metadata.${path}-desc`),
        alternates: {
            canonical: getLocalizedUrl(locale, path),
            languages: Object.fromEntries([
                ...routing.locales.map((loc) => [
                    loc,
                    getLocalizedUrl(loc, path),
                ]),
                ["x-default", getLocalizedUrl("en", path)],
            ]),
        },
    };
}
