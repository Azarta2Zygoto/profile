"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import path from "@/data/path.json";
import { Link } from "@/i18n/navigation";
import { activeNavLink } from "@/utils/function";

interface NavigationProps {
    locale: string;
}

export default function Navigation({ locale }: NavigationProps): ReactNode {
    const t = useTranslations("Header");
    const pathname = usePathname();

    return (
        <nav>
            {Object.entries(path).map(([key, route]) => {
                const isActive = activeNavLink(pathname, locale, route);
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
