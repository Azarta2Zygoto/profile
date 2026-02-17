"use client";

import { usePathname } from "next/navigation";
import { permanentRedirect } from "next/navigation";
import { type JSX, Suspense, useEffect } from "react";

/**
 * Redirect page that detects user locale and redirects to appropriate locale route
 * @returns {JSX.Element} HTML structure with redirect logic in Suspense
 */
export default function RedirectPage(): JSX.Element {
    return (
        <html lang="fr">
            <body>
                <Suspense>
                    <RedirectPageInternal />
                </Suspense>
            </body>
        </html>
    );
}

/**
 * Internal component that handles the actual redirect logic
 * Extracts user language preference and redirects to locale-specific route
 * @returns {JSX.Element} Empty fragment after redirect is triggered
 */
function RedirectPageInternal(): JSX.Element {
    const pathname = usePathname();

    useEffect(() => {
        const navigatorLocale = navigator.language.startsWith("fr")
            ? "fr"
            : "en";
        permanentRedirect(`/${navigatorLocale}${pathname}`);
    });

    return <></>;
}
