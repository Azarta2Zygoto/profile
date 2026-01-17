"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { JSX } from "react";

import FlagSelectMenu from "@/components/personal/flagSelectMenu";
import ThemeSwitch from "@/components/personal/themeSwitch";
import { base_path } from "@/data/env";
import locales_json from "@/data/locales.json";
import path from "@/data/path.json";
import { Link } from "@/i18n/navigation";
import { activeNavLink } from "@/utils/function";

const correctedLocale: { label: string; value: string }[] = Object.entries(
    locales_json,
).map(([key, locale]) => ({
    label: locale.name as string,
    value: key,
}));

interface HeaderProps {
    locale: string;
}

export default function Header({ locale }: HeaderProps): JSX.Element {
    const t = useTranslations("Header");
    const pathname = usePathname();

    return (
        <header role="banner">
            <Image
                src={base_path + "logo.svg"}
                alt={t("alt-logo")}
                className="img-logo"
                width={40}
                height={40}
            />
            <nav role="navigation">
                {Object.entries(path).map(([key, route], index) => {
                    const isActive = activeNavLink(pathname, locale, route);

                    return (
                        <Link
                            key={index}
                            href={`/${route.replace(/^\//, "")}`}
                            className={`nav-link ${isActive ? "active" : ""}`}
                            onClick={(e) => {
                                if (isActive) {
                                    e.preventDefault();
                                    window.location.reload();
                                }
                            }}
                        >
                            {t(key)}
                        </Link>
                    );
                })}
            </nav>
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
