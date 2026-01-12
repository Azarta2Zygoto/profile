"use client";

import { usePathname } from "next/navigation";
import { permanentRedirect } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function RedirectPage() {
    return (
        <Suspense>
            <html>
                <body>
                    <RedirectPageInternal />
                </body>
            </html>
        </Suspense>
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
