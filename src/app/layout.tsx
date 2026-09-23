import type { Metadata, Viewport } from "next";
import type { PropsWithChildren } from "react";

import generateGlobalMetadata from "@/components/app/metadata";
import { routing } from "@/i18n/routing";

import "./globals.css";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: "#6496fa",
    colorScheme: "light dark",
};

export async function generateMetadata(): Promise<Metadata> {
    return generateGlobalMetadata(routing.defaultLocale);
}

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
    return (
        <html
            lang="fr"
            suppressHydrationWarning
        >
            <body>{children}</body>
        </html>
    );
}
