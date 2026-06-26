"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { Switch } from "@/components/ui/switch";

import { useGlobal } from "../globalProvider";

export default function ThemeSwitch(): ReactNode {
    const t = useTranslations("ThemeSwitch");
    const { theme, setTheme } = useGlobal();

    return (
        <Switch
            checked={theme === "dark"}
            onCheckedChange={(isDark) => setTheme(isDark ? "dark" : "light")}
            className="theme-switch"
            aria-label={t("switch")}
            symbol={theme === "dark" ? "🌙" : "☀️"}
        />
    );
}
