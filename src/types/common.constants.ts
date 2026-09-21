import { ThemeEnum } from "./common.types";

export const APP_CONFIG = {
    basePath: "/profile/",
    baseUrl:
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/profile/",
} as const;

export const PATH = {
    home: "/",
    study: "/study",
    project: "/project",
} as const;

export const ASSETS = {
    IMAGES: {
        LOGO: "logo.svg",
        LOGO_200: "logo-200.png",
        PHOTO: "photo.jpg",
    },
} as const;

export const DEFAULT_THEME = ThemeEnum.LIGHT;
export const THEME_ATTRIBUTE = "data-theme";
export const THEME_STORAGE_KEY = "theme";

export const ORDER_CATEGORY = ["default", "date", "lexicographical"] as const;

export const DATE_FORMAT = {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
} as const;
