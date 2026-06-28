"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import type { ReactNode } from "react";

import { APP_CONFIG } from "@/data/config";
import { Website } from "@/components/icons/website";
import studyData from "@/data/study.json";
import { Link } from "@/i18n/navigation";

interface ShortStudyProps {
    locale: string;
}

export default function ShortStudy({
    locale = "fr",
}: ShortStudyProps): ReactNode {
    const t = useTranslations("HomePage");

    return (
        <section>
            {studyData.map((key) => (
                <div
                    key={key.id}
                    className="card-container"
                >
                    <div className="icon-title">
                        <h3 className="h3-secondary">
                            {key.name} - {t(`${key.id}.title`)}
                        </h3>
                        {key.link && (
                            <Link
                                href={
                                    key.link +
                                    (key.locales?.includes(locale)
                                        ? `/${locale}`
                                        : "")
                                }
                                className="external-link"
                                rel="noopener noreferrer"
                                target="_blank"
                                aria-label={t(`${key.id}.title`)}
                            >
                                {key.logo ? (
                                    <Image
                                        src={`${APP_CONFIG.basePath}logo/${key.logo}`}
                                        alt={`${key.name} logo`}
                                        width={30}
                                        height={30}
                                        className="other-logo"
                                    />
                                ) : (
                                    <Website />
                                )}
                            </Link>
                        )}
                    </div>
                    <p className="p-minor">
                        {key.period.start + " - " + key.period.end} →{" "}
                        {key.city + ", France"}
                    </p>
                    <p style={{ margin: "1rem 0" }}>
                        {t(`${key.id}.description`)}
                    </p>
                    <p>{t("some-lessons")}</p>
                    <ul className="list-items">
                        {key.lessons.slice(0, 3).map((lesson) => (
                            <li key={lesson.id}>
                                {t(`${key.id}.lessons.${lesson.id}.name`)}
                            </li>
                        ))}
                    </ul>
                    <Link
                        href={`/study#${key.id}`}
                        className="link-secondary underline-anim"
                        style={{ marginLeft: "1.5rem" }}
                    >
                        {t("see-more")} →
                    </Link>
                </div>
            ))}
        </section>
    );
}
