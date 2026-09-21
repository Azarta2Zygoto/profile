"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import { Locale } from "@/i18n/routing";
import { PATH } from "@/types/common.constants";
import { isActiveNavLink } from "@/utils/path.utils";

interface Props {
    locale: Locale;
}

export default function Navigation({ locale }: Readonly<Props>): ReactNode {
    const t = useTranslations("Header");
    const pathname = usePathname();

    return (
        <nav>
            {Object.entries(PATH).map(([key, route]) => {
                const isActive = isActiveNavLink(pathname, locale, route);
                return (
                    <Link
                        key={key}
                        href={`/${route.replace(/^\//, "")}`}
                        className={`btn ${isActive ? "active" : ""}`}
                        aria-current={isActive ? "page" : undefined}
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
    );
}
