import type { Formats } from "next-intl";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

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

    return {
        locale: locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
        formats,
        timeZone: "Europe/Paris",
    };
});
