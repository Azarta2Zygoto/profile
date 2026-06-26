"use client";

import React, {
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
    THEME_VALUES,
} from "@/data/constants";
import type { Themes } from "@/data/types";

const GlobalContext = createContext<{
    theme: Themes;
    setTheme: (theme: Themes) => void;
} | null>(null);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [theme, setTheme] = useState<Themes>(() => {
        if (typeof window === "undefined") return DEFAULT_THEME;

        const storedTheme = localStorage.getItem(
            THEME_STORAGE_KEY,
        ) as Themes | null;
        if (storedTheme && Object.values(THEME_VALUES).includes(storedTheme)) {
            return storedTheme;
        }
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;
        return prefersDark ? THEME_VALUES.DARK : THEME_VALUES.LIGHT;
    });

    /**
     * Updates the theme state and synchronizes with external systems (localStorage, DOM).
     * This follows an event-driven pattern instead of relying on useEffect for state syncing.
     */
    const changeTheme = useCallback((newTheme: Themes) => {
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
                changeTheme(e.matches ? THEME_VALUES.DARK : THEME_VALUES.LIGHT);
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
