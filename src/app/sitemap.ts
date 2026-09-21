import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { APP_CONFIG, PATH } from "@/types/common.constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    return Object.values(PATH).map((path) => ({
        url: `${APP_CONFIG.baseUrl}${routing.defaultLocale}${path}`, // Default locale
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly" as const,
        priority: path === "/" ? 1 : 0.6,
    }));
}
