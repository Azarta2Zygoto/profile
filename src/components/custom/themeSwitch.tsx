"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";
import { ThemeEnum } from "@/types/common.types";

export default function ThemeSwitch(): ReactNode {
    const t = useTranslations("ThemeSwitch");
    const { theme, setTheme } = useTheme();

    return (
        <Switch
            checked={theme === ThemeEnum.DARK}
            onCheckedChange={(isDark) =>
                setTheme(isDark ? ThemeEnum.DARK : ThemeEnum.LIGHT)
            }
            className="theme-switch"
            aria-label={t("switch")}
            symbol={theme === ThemeEnum.DARK ? "🌙" : "☀️"}
        />
    );
}
