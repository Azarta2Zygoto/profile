import { APP_CONFIG, PATH } from "@/types/common.constants";

/**
 * Utility for building locale-prefixed paths
 * @param locale - The current locale (e.g., 'en', 'fr')
 * @param route - The route path (e.g., '/projects', '/study')
 * @returns A complete locale-prefixed path (e.g., '/en/projects')
 *
 * @example
 * buildLocalePath('en', '/projects') // Returns: '/en/projects'
 * buildLocalePath('fr', '/') // Returns: '/fr/'
 */
export const buildLocalePath = (
    locale: string,
    route: string = PATH.home,
): string => {
    const normalizedRoute = route.replace(/^\/|\/$/g, "");
    return normalizedRoute ? `/${locale}/${normalizedRoute}` : `/${locale}`;
};

/**
 * Determines if a navigation link is currently active based on the pathname
 * @param {string} pathname - The current pathname from the router (e.g., '/en/projects')
 * @param {string} locale - The current locale (e.g., 'en', 'fr')
 * @param {string} route - The route path to check against (e.g., '/projects', 'projects')
 * @returns {boolean} True if the current pathname matches the expected path for this locale and route
 *
 * @example
 * // Returns true - current page is the projects page
 * activeNavLink('/en/projects', 'en', '/projects')
 *
 * @example
 * // Returns false - current page is not the projects page
 * activeNavLink('/en/studies', 'en', '/projects')
 *
 * @example
 * // Returns true - checks root path when route is empty
 * activeNavLink('/en', 'en', '')
 */
export function isActiveNavLink(
    pathname: string,
    locale: string,
    route: string,
): boolean {
    // Check if pathname matches the expected path
    return pathname === buildLocalePath(locale, route);
}

/**
 * Utility for building asset paths with base path prefix
 * @param assetName - Name of the asset (e.g., 'logo.svg', 'photo.jpg')
 * @param basePath - The base path prefix (e.g., '/profile/', '/')
 * @returns Complete asset path ready for image src attributes
 *
 * @example
 * buildAssetPath('logo.svg', '/profile/') // Returns: '/profile/logo.svg'
 * buildAssetPath('photo.jpg', '/') // Returns: '/photo.jpg'
 */
export const buildAssetPath = (
    assetName: string,
    basePath: string = APP_CONFIG.basePath,
): string => {
    return basePath + assetName;
};
