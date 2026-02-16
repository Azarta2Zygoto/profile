"use client";

import { usePathname } from "next/navigation";
import { permanentRedirect } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function RedirectPage() {
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

function RedirectPageInternal() {
    const pathname = usePathname();

    useEffect(() => {
        const navigatorLocale = navigator.language.startsWith("fr")
            ? "fr"
            : "en";
        permanentRedirect(`/${navigatorLocale}${pathname}`);
    });

    return <></>;
}
