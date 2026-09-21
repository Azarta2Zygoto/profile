"use client";

import {
    FC,
    PropsWithChildren,
    createContext,
    use,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    DEFAULT_THEME,
    THEME_ATTRIBUTE,
    THEME_STORAGE_KEY,
} from "@/types/common.constants";
import { ThemeEnum } from "@/types/common.types";

interface GlobalContextProps {
    theme: ThemeEnum;
    setTheme: (theme: ThemeEnum) => void;
}

const GlobalContext = createContext<GlobalContextProps | null>(null);

export const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeEnum>(() => {
        if (typeof window === "undefined") return DEFAULT_THEME;

        const storedTheme = localStorage.getItem(
            THEME_STORAGE_KEY,
        ) as ThemeEnum | null;
        if (storedTheme && Object.values(ThemeEnum).includes(storedTheme)) {
            return storedTheme;
        }
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;
        return prefersDark ? ThemeEnum.DARK : ThemeEnum.LIGHT;
    });

    /**
     * Updates the theme state and synchronizes with external systems (localStorage, DOM).
     * This follows an event-driven pattern instead of relying on useEffect for state syncing.
     */
    const changeTheme = useCallback((newTheme: ThemeEnum) => {
        setTheme(newTheme);
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    }, []);

    // Sync the theme state to the DOM whenever it changes
    useEffect(() => {
        document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
    }, [theme]);

    // Listen for OS-level theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            // Only follow system if the user hasn't explicitly set a preference
            const hasUserPreference = !!localStorage.getItem(THEME_STORAGE_KEY);
            if (!hasUserPreference) {
                changeTheme(e.matches ? ThemeEnum.DARK : ThemeEnum.LIGHT);
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [changeTheme]);

    const value = useMemo(
        () => ({ theme, setTheme: changeTheme }),
        [theme, changeTheme],
    );

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => {
    const context = use(GlobalContext);
    if (!context) {
        throw new Error("useGlobal must be used within a GlobalProvider");
    }
    return context;
};
