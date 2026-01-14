"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import type { Themes } from "@/data/types";

const GlobalContext = createContext<{
    theme: Themes;
    setTheme: (theme: Themes) => void;
}>({
    theme: "light",
    setTheme: () => {},
});

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [theme, setTheme] = useState<Themes>(() => {
        if (typeof window === "undefined") return "light";

        const storedTheme = localStorage.getItem("theme") as Themes | null;
        if (
            storedTheme &&
            (storedTheme === "light" || storedTheme === "dark")
        ) {
            return storedTheme;
        }
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;
        return prefersDark ? "dark" : "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <GlobalContext.Provider value={{ theme, setTheme }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => useContext(GlobalContext);
