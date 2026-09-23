import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Locale, routing } from "@/i18n/routing";
import { APP_CONFIG, ASSETS } from "@/types/common.constants";
import { buildAssetPath, getLocalizedUrl } from "@/utils/path.utils";

export default async function generateGlobalMetadata(
    locale: Locale,
): Promise<Metadata> {
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
            icon: buildAssetPath(ASSETS.IMAGES.LOGO_200, "/profile"),
            shortcut: buildAssetPath(ASSETS.IMAGES.LOGO_200, "/profile"),
            apple: buildAssetPath(ASSETS.IMAGES.LOGO_200, "/profile"),
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
            canonical: getLocalizedUrl(routing.defaultLocale),
            languages: Object.fromEntries(
                routing.locales.map((locale) => [
                    locale,
                    getLocalizedUrl(locale),
                ]),
            ),
        },
    };
}
