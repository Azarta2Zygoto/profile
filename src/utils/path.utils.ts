import { Locale, routing } from "@/i18n/routing";
import { APP_CONFIG } from "@/types/common.constants";

export function isActiveNavLink(pathname: string, route: string): boolean {
    if (route === "/") {
        const element = pathname.split("/").filter(Boolean);
        return (
            element.length === 0 ||
            (element.length === 1 &&
                Object.values(routing.locales).includes(element[0] as Locale))
        );
    }
    return pathname.endsWith(route);
}

export const buildAssetPath = (
    assetName: string,
    basePath: string = APP_CONFIG.basePath,
): string => {
    return `${basePath}${assetName}`;
};

export const getLocalizedUrl = (locale: string, path = "") => {
    const localePrefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    return `${APP_CONFIG.baseUrl}${localePrefix}${path}`;
};
