"use client";

import { useRouter } from "next/navigation";
import { type JSX, useEffect, useRef } from "react";

export default function RedirectPage(): JSX.Element {
    return <RedirectPageInternal />;
}

function RedirectPageInternal(): JSX.Element {
    const router = useRouter();
    const hasRedirected = useRef(false);

    useEffect(() => {
        if (hasRedirected.current) return;
        hasRedirected.current = true;

        const browserLocales = [navigator.language, ...navigator.languages]
            .filter(Boolean)
            .map((locale) => locale.toLowerCase());

        const locale = browserLocales.some((value) => value.startsWith("fr"))
            ? "fr"
            : "en";

        router.replace(`/${locale}`);
    }, [router]);

    return (
        <html lang="fr">
            <body>
                <p className="p-minor">Redirection...</p>
            </body>
        </html>
    );
}
