"use client";

import { useTranslations } from "next-intl";
import { Fragment, JSX } from "react";

import ShortProject from "@/components/shortProject";
import ShortStudy from "@/components/shortStudy";
import { Link } from "@/i18n/navigation";

export default function HomePage(): JSX.Element {
    const t = useTranslations("HomePage");

    return (
        <Fragment>
            <h1 className="h1-primary">{t("title")}</h1>
            <section>
                <p>
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
                </p>
            </section>
            <h2 className="h2-primary">
                {t("study")}
                <Link
                    href={`/study`}
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
                    href={`/project`}
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
