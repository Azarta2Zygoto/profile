"use client";

import { useTranslations } from "next-intl";
import { Fragment, use } from "react";

import ShortProject from "@/components/shortProject";
import ShortStudy from "@/components/shortStudy";
import { Link } from "@/i18n/navigation";

const listComponents = ["study", "project"] as const;

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
                <p>
                    {t.rich("introduction", {
                        link: (chunks) => (
                            <a
                                className="link-primary"
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
            {listComponents.map((element) => (
                <Fragment key={element}>
                    <h2 className="h2-primary">
                        {t(element)}
                        <Link
                            href={`/${element}`}
                            className="clickable-icon"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                fill="currentColor"
                                className="icon-link"
                                viewBox="0 0 16 16"
                                aria-hidden
                            >
                                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
                            </svg>
                        </Link>
                    </h2>
                    {element === "study" ? (
                        <ShortStudy locale={locale} />
                    ) : (
                        <ShortProject />
                    )}
                </Fragment>
            ))}
        </Fragment>
    );
}
