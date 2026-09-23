import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { APP_CONFIG, PATH } from "@/types/common.constants";
import { getLocalizedUrl } from "@/utils/path.utils";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    return Object.values(PATH).map((path) => ({
        url: `${APP_CONFIG.baseUrl}${path}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: path === "/" ? 1 : 0.6,
        alternates: {
            languages: Object.fromEntries(
                routing.locales.map((locale) => [
                    locale,
                    getLocalizedUrl(locale, path),
                ]),
            ),
        },
    }));
}
