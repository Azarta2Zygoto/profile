import { defineRouting } from "next-intl/routing";

import locales_json from "@/data/locales.json";

export const routing = defineRouting({
    locales: Object.keys(locales_json),
    defaultLocale: "fr",
    localePrefix: "always",
    localeDetection: false,
});
