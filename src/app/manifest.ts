import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        id: "/profile/",
        name: "My Profile",
        short_name: "Profile",
        description:
            "My personal profile website showcasing my projects and skills.",
        start_url: "/profile/",
        scope: "/profile/",
        display: "standalone",
        background_color: "#f3ede6",
        theme_color: "#6496fa",
        lang: "en",
        categories: ["developer", "networking", "personalization"],
        icons: [
            {
                src: "/profile/logo-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/profile/logo-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
        ],
    };
}
