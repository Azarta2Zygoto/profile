import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Locale, routing } from "@/i18n/routing";
import { APP_CONFIG, ASSETS } from "@/types/common.constants";
import { buildAssetPath, getLocalizedUrl } from "@/utils/path.utils";

export default async function generateGlobalMetadata(
    locale: Locale,
): Promise<Metadata> {
    const t = await getTranslations({ locale });

    const title = t("Metadata.title");
    const description = t("Metadata.description");
    const ogImage = {
        url: buildAssetPath(ASSETS.IMAGES.LOGO_512, "/"),
        width: 512,
        height: 512,
        type: "image/png",
        alt: t("Metadata.siteName"),
    };

    return {
        metadataBase: new URL(APP_CONFIG.baseUrl),
        title: {
            default: title,
            template: "%s - " + t("Metadata.siteName"),
        },
        description: description,
        keywords: t("Metadata.keywords"),
        icons: {
            icon: buildAssetPath(ASSETS.IMAGES.LOGO_192, "/profile"),
            shortcut: buildAssetPath(ASSETS.IMAGES.LOGO_192, "/profile"),
            apple: buildAssetPath(ASSETS.IMAGES.LOGO_192, "/profile"),
        },
        authors: [
            {
                name: "Quentin Potiron",
            },
        ],
        creator: "Quentin Potiron",
        publisher: "Quentin Potiron",
        category: "IT & Software",
        generator: "Next.js",
        openGraph: {
            title: title,
            description: description,
            url: "/",
            type: "website",
            siteName: t("Metadata.siteName"),
            locale: locale === "fr" ? "fr_FR" : "en_US",
            alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
            images: ogImage,
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: ogImage,
        },
        alternates: {
            canonical: getLocalizedUrl(locale),
            languages: Object.fromEntries([
                ...routing.locales.map((locale) => [
                    locale,
                    getLocalizedUrl(locale),
                ]),
                ["x-default", getLocalizedUrl("en")],
            ]),
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
            },
        },
    };
}
