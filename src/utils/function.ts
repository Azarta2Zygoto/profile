import { buildLocalePath } from "@/data/constants";

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
export function activeNavLink(
    pathname: string,
    locale: string,
    route: string,
): boolean {
    // Use centralized path builder for consistent locale path formatting
    const expectedPath = buildLocalePath(locale, route);

    // Check if pathname matches the expected path
    return pathname === expectedPath;
}
