/**
 * Application-wide constants for paths, asset names, and configuration values
 */

// ============================================================================
// ASSET PATHS (Images and Static Files)
// ============================================================================

/**
 * Image asset filenames used throughout the application
 * All images are referenced relative to the public folder with this base path prefix
 */
export const ASSETS = {
    IMAGES: {
        LOGO: "logo.svg",
        LOGO_200: "logo-200.png",
        PHOTO: "photo.jpg",
    },
} as const;

// ============================================================================
// ROUTE SEGMENTS and PATHS
// ============================================================================

/**
 * Route segment constants for building locale-aware URLs
 * These are combined with locale prefixes to create full routes
 */
export const ROUTES = {
    HOME: "/",
    STUDY: "/study",
    PROJECT: "/project",
} as const;

/**
 * Route keywords for use in templates and navigation
 * Maps internal keys to actual route paths
 */
export const ROUTE_KEYS = {
    HOME: "home",
    STUDY: "study",
    PROJECT: "project",
} as const;

// ============================================================================
// PATH FORMATTING
// ============================================================================

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
    route: string = ROUTES.HOME,
): string => {
    const normalizedRoute = route.replace(/^\/|\/$/g, "");
    return normalizedRoute ? `/${locale}/${normalizedRoute}` : `/${locale}`;
};

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
export const buildAssetPath = (assetName: string, basePath: string): string => {
    return basePath + assetName;
};

// ============================================================================
// THEME AND STYLING
// ============================================================================

/**
 * Valid theme values for the application
 */
export const THEME_VALUES = {
    LIGHT: "light",
    DARK: "dark",
} as const;

/**
 * Default theme value when no user preference is stored
 */
export const DEFAULT_THEME = THEME_VALUES.LIGHT;

/**
 * CSS selector for theme attribute on document root
 */
export const THEME_ATTRIBUTE = "data-theme";

/**
 * LocalStorage key for persisting user theme preference
 */
export const THEME_STORAGE_KEY = "theme";
