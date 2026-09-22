"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import type { ReactNode } from "react";

import FlagSelectMenu from "@/components/custom/flagSelectMenu";
import ThemeSwitch from "@/components/custom/themeSwitch";
import { Locale, SELECT_LOCALE } from "@/i18n/routing";
import { ASSETS } from "@/types/common.constants";
import { buildAssetPath } from "@/utils/path.utils";

import Navigation from "./navigation";

interface Props {
    locale: Locale;
}

export default function Header({ locale }: Readonly<Props>): ReactNode {
    const t = useTranslations("Header");

    return (
        <header>
            <Image
                src={buildAssetPath(ASSETS.IMAGES.LOGO)}
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
                    options={SELECT_LOCALE}
                    selectedOption={locale}
                />
            </div>
        </header>
    );
}
