import type { MetadataRoute } from "next";

import { base_url } from "@/data/env";
import path_json from "@/data/path.json";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const paths = Object.values(path_json);

    const values = paths.map((path) => ({
        url: `${base_url}${routing.defaultLocale}${path}`, // Default locale
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly" as const,
        priority: path === "/" ? 1 : 0.6,
    }));
    return values;
}
