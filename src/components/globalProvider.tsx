"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

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
}>({
    theme: DEFAULT_THEME,
    setTheme: () => {},
});

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [theme, setTheme] = useState<Themes>(() => {
        if (typeof window === "undefined") return DEFAULT_THEME;

        const storedTheme = localStorage.getItem(
            THEME_STORAGE_KEY,
        ) as Themes | null;
        if (
            storedTheme &&
            (storedTheme === THEME_VALUES.LIGHT ||
                storedTheme === THEME_VALUES.DARK)
        ) {
            return storedTheme;
        }
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;
        return prefersDark ? THEME_VALUES.DARK : THEME_VALUES.LIGHT;
    });

    useEffect(() => {
        document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    return (
        <GlobalContext.Provider value={{ theme, setTheme }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => useContext(GlobalContext);
