import type { MetadataRoute } from "next";

import { APP_CONFIG } from "@/data/config";
import path_json from "@/data/path.json";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const paths = Object.values(path_json);

    const values = paths.map((path) => ({
        url: `${APP_CONFIG.baseUrl}${routing.defaultLocale}${path}`, // Default locale
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly" as const,
        priority: path === "/" ? 1 : 0.6,
    }));
    return values;
}
