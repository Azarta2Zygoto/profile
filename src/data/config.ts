export const APP_CONFIG = {
    basePath: "/profile/",
    baseUrl:
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/profile/",
} as const;
