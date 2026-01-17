export function activeNavLink(
    pathname: string,
    locale: string,
    route: string,
): boolean {
    if (pathname.split("/").length === 3) {
        return pathname === `/${locale}/${route.replace(/^\//, "")}`;
    } else if (pathname.split("/").length <= 2) {
        return pathname === `/${locale}${route.replace(/^\//, "")}`;
    }
    return false;
}
