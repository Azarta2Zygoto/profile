"use client";

import { JSX } from "react";

import { Switch } from "@/components/ui/switch";

import { useGlobal } from "../globalProvider";

export default function ThemeSwitch(): JSX.Element {
    const { theme, setTheme } = useGlobal();

    function onToggle(isDark: boolean) {
        console.log("Toggling theme", isDark);
        const newTheme = isDark ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    }

    return (
        <div className="theme-switch-container">
            <Switch
                checked={theme === "dark"}
                onCheckedChange={onToggle}
                className="theme-switch"
                symbol={theme === "dark" ? "🌙" : "☀️"}
            />
        </div>
    );
}
