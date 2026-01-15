"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

import FlagSelectMenu from "@/components/personal/flagSelectMenu";
import ThemeSwitch from "@/components/personal/themeSwitch";
import { base_path } from "@/data/env";
import locales_json from "@/data/locales.json";
import path from "@/data/path.json";

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
            <nav>
                {Object.entries(path).map(([key, route], index) => (
                    <Link
                        key={index}
                        href={`/${locale}/${route.replace(/^\//, "")}`}
                        className={`nav-link ${
                            pathname.split("/").length === 3 &&
                            pathname ===
                                `/${locale}/${route.replace(/^\//, "")}`
                                ? "nav-link-active"
                                : pathname.split("/").length <= 2 &&
                                    pathname ===
                                        `/${locale}${route.replace(/^\//, "")}`
                                  ? "nav-link-active"
                                  : ""
                        }`}
                    >
                        {t(key)}
                    </Link>
                ))}
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
