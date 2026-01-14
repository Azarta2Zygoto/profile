"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Fragment, use } from "react";

import ShortProject from "@/components/shortProject";
import ShortStudy from "@/components/shortStudy";

export default function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params);
    const t = useTranslations("HomePage");
    return (
        <Fragment>
            <h1 className="h1-primary">{t("title")}</h1>
            <section>
                {t.rich("introduction", {
                    link: (chunks) => (
                        <a
                            className="outside-link"
                            href="https://www.ec-lyon.fr/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {chunks}
                        </a>
                    ),
                })}
            </section>
            <h2 className="h2-primary">
                {t("study")}
                <Link
                    href={`/${locale ?? "fr"}/study`}
                    className="clickable-icon"
                >
                    <i
                        className="bi bi-link-45deg"
                        aria-hidden
                    ></i>
                </Link>
            </h2>
            <ShortStudy />
            <h2 className="h2-primary">
                {t("projects")}
                <Link
                    href={`/${locale ?? "fr"}/projects`}
                    className="clickable-icon"
                >
                    <i
                        className="bi bi-link-45deg"
                        aria-hidden
                    ></i>
                </Link>
            </h2>
            <p>{t("desc-projects")}</p>
            <ShortProject />
        </Fragment>
    );
}
