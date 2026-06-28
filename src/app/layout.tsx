import type { Metadata, Viewport } from "next";
import React from "react";

import { APP_CONFIG } from "@/data/config";
import { ASSETS, buildAssetPath } from "@/data/constants";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: "#6496fa",
    colorScheme: "light dark",
};

export const metadata: Metadata = {
    metadataBase: new URL(APP_CONFIG.baseUrl),
    title: "Quentin Potiron - Mon Profil",
    description: "Site web faisant office de portfolio",
    keywords:
        "Portfolio, Profil, Développement Web, Analyse de données, Informatique",
    alternates: {
        canonical: "https://www.azarta.fr/profile",
        languages: {
            en: "https://www.azarta.fr/en/profile",
            fr: "https://www.azarta.fr/fr/profile",
        },
    },
    icons: {
        icon: buildAssetPath(ASSETS.IMAGES.LOGO_200, "/profile/"),
        shortcut: buildAssetPath(ASSETS.IMAGES.LOGO_200, "/profile/"),
        apple: buildAssetPath(ASSETS.IMAGES.LOGO_200, "/profile/"),
    },
    authors: [
        {
            name: "Quentin Potiron",
        },
    ],
    openGraph: {
        title: "Quentin Potiron - Mon Profil",
        description: "Site web faisant office de portfolio",
        url: "/",
        images: {
            url: buildAssetPath(ASSETS.IMAGES.LOGO_200, "/"),
            alt: "Mon Profile",
        },
        type: "website",
        siteName: "Mon Profile",
        locale: "fr_FR",
        alternateLocale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Mon Profile",
        description: "Site web faisant office de portfolio",
        images: {
            url: buildAssetPath(ASSETS.IMAGES.LOGO_200, "/"),
            alt: "Mon Profile",
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
