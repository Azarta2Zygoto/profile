"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import type { ReactNode } from "react";

import FlagSelectMenu from "@/components/personal/flagSelectMenu";
import ThemeSwitch from "@/components/personal/themeSwitch";
import { APP_CONFIG } from "@/data/config";
import { ASSETS, buildAssetPath } from "@/data/constants";
import locales_json from "@/data/locales.json";

import Navigation from "./navigation";

const correctedLocale: { label: string; value: string }[] = Object.entries(
    locales_json,
).map(([key, locale]) => ({
    label: locale.name as string,
    value: key,
}));

interface HeaderProps {
    locale: string;
}

export default function Header({ locale }: HeaderProps): ReactNode {
    const t = useTranslations("Header");

    return (
        <header>
            <Image
                src={buildAssetPath(ASSETS.IMAGES.LOGO, APP_CONFIG.basePath)}
                alt={t("alt-logo")}
                className="img-logo"
                priority
                width={40}
                height={40}
            />
            <Navigation locale={locale} />
            <div className="rows">
                <ThemeSwitch />
                <FlagSelectMenu
                    options={correctedLocale}
                    selectedOption={locale}
                />
            </div>
        </header>
    );
}
