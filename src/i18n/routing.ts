import { defineRouting } from "next-intl/routing";

const LOCALES = {
    fr: {
        name: "Français",
    },
    en: {
        name: "English",
    },
} as const;

export const SELECT_LOCALE: { label: string; value: string }[] = Object.entries(
    LOCALES,
).map(([key, locale]) => ({
    label: locale.name,
    value: key,
}));

export const routing = defineRouting({
    locales: Object.keys(LOCALES) as Locale[],
    defaultLocale: "fr" as Locale,
    localePrefix: "always",
    localeDetection: false,
});

export type Locale = keyof typeof LOCALES;
