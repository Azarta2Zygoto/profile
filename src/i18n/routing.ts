import { defineRouting } from "next-intl/routing";

import locales_json from "@/data/locales.json";

export const routing = defineRouting({
    locales: Object.keys(locales_json) as Locale[],
    defaultLocale: "fr" as Locale,
    localePrefix: "always",
    localeDetection: false,
});

export type Locale = keyof typeof locales_json;
