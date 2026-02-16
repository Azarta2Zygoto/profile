export function activeNavLink(
    pathname: string,
    locale: string,
    route: string,
): boolean {
    // Normalize route to remove leading/trailing slashes for comparison
    const normalizedRoute = route.replace(/^\/|\/$/g, "");
    const expectedPath = normalizedRoute
        ? `/${locale}/${normalizedRoute}`
        : `/${locale}`;

    // Check if pathname matches the expected path
    return pathname === expectedPath;
}
