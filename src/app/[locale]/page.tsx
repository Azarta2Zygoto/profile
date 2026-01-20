"use client";

import { useTranslations } from "next-intl";
import { Fragment, use } from "react";

import ShortProject from "@/components/shortProject";
import ShortStudy from "@/components/shortStudy";
import { Link45deg } from "@/data/svg";
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
                            <Link45deg title={t(`link-${element}`)} />
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
