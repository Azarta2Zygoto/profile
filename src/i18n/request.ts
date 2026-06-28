import type { Formats } from "next-intl";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { type Locale, routing } from "./routing";

export const formats = {
    number: {
        euro: {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 2,
        },
    },
} satisfies Formats;

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const messageLoaders: Record<Locale, () => Promise<{ default: any }>> = {
        fr: () => import("../../messages/fr.json"),
        en: () => import("../../messages/en.json"),
    };

    const messages = (await messageLoaders[locale]()).default;

    return {
        locale: locale,
        messages: messages,
        formats,
        timeZone: "Europe/Paris",
    };
});
