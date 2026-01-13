"use client";

import { JSX, useState } from "react";

import { Switch } from "@/components/ui/switch";

export default function ThemeSwitch(): JSX.Element {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("theme");
            if (storedTheme) {
                document.documentElement.setAttribute(
                    "data-theme",
                    storedTheme,
                );
                return storedTheme === "dark";
            }
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
    });

    function onToggle(checked: boolean) {
        setIsDark(checked);
        const next = isDark ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
    }

    return (
        <div className="theme-switch-container">
            <Switch
                checked={isDark}
                onCheckedChange={onToggle}
                className="theme-switch"
                symbol={isDark ? "🌙" : "☀️"}
            />
        </div>
    );
}
