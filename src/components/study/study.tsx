"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Fragment, type ReactNode } from "react";

import Box from "@/components/custom/box";
import { LinkExternal } from "@/components/icons/link-external";
import { Website } from "@/components/icons/website";
import studyData from "@/data/study.json";
import { Link } from "@/i18n/navigation";
import { Locale } from "@/i18n/routing";
import { APP_CONFIG } from "@/types/common.constants";
import { SelectOption } from "@/types/common.types";
import type { Study } from "@/types/study.types";

interface Props {
    locale: Locale;
    total: number;
    languages: SelectOption[];
}

export default function Study({
    locale,
    total,
    languages,
}: Readonly<Props>): ReactNode {
    const t = useTranslations("HomePage");
    const selectedLanguageValues = new Set(languages.map((l) => l.value));
    const studyContent = (studyData as Study[])
        .filter((study) => {
            if (languages.length === 0) return true;
            return study.lessons.some((lesson) =>
                lesson.languages.some((lang) =>
                    selectedLanguageValues.has(lang),
                ),
            );
        })
        .map((study) => ({
            ...study,
            lessons: study.lessons.filter((lesson) => {
                if (languages.length === 0) return true;
                if (
                    (languages.length === 0 || languages.length === total) &&
                    lesson.languages.length === 0
                )
                    return true;
                return lesson.languages.some((lang) =>
                    selectedLanguageValues.has(lang),
                );
            }),
        })) as Study[];

    if (studyContent.length === 0) {
        return (
            <section>
                <h2 className="h2-primary">{t("no-study-found")}</h2>
                <p>
                    {t.rich("no-study-found-desc", {
                        link: (chunks) => (
                            <Link
                                href="/project"
                                className="link-primary"
                            >
                                {chunks}
                            </Link>
                        ),
                    })}
                </p>
            </section>
        );
    }

    return (
        <section>
            {studyContent.map((key) => (
                <div
                    key={key.id}
                    id={key.id}
                    className="study-container"
                >
                    <div className="icon-title">
                        <h2 className="h2-secondary">
                            {key.name} - {t(`${key.id}.title`)}
                        </h2>
                        {key.link && (
                            <Link
                                href={
                                    key.link +
                                    (key.locales?.includes(locale)
                                        ? `/${locale}`
                                        : "")
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="external-link"
                                aria-label={t(`${key.id}.title`)}
                            >
                                {key.logo ? (
                                    <Image
                                        src={`${APP_CONFIG.basePath}/logo/${key.logo}`}
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
                    <p>{t(`${key.id}.description`)}</p>
                    {key.lessons.map((lesson) => (
                        <div
                            key={lesson.id}
                            className="card-container"
                        >
                            <h3 className="h4-primary">
                                {t(`${key.id}.lessons.${lesson.id}.name`)}
                                {lesson.link && (
                                    <Link
                                        href={lesson.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="external-link"
                                    >
                                        <LinkExternal
                                            title={t("link_lesson")}
                                        />
                                    </Link>
                                )}{" "}
                                :
                                {lesson.languages.length > 0 && (
                                    <Box
                                        name={lesson.languages[0]}
                                        style={{ marginLeft: "0.5rem" }}
                                    />
                                )}
                            </h3>
                            <p style={{ marginBottom: "0.5rem" }}>
                                {t(
                                    `${key.id}.lessons.${lesson.id}.description`,
                                )}
                            </p>

                            {lesson.tools.length > 0 && (
                                <p>
                                    <strong>{t("tools")}</strong>
                                    {lesson.tools.join(", ")}
                                </p>
                            )}
                            {lesson.languages.length > 1 && (
                                <div style={{ display: "inline-block" }}>
                                    <strong>{t("other-languages")}</strong>
                                    {lesson.languages.slice(1).map((lang) => (
                                        <Box
                                            name={lang}
                                            key={lang}
                                            style={{ margin: "0 0.25rem" }}
                                        />
                                    ))}
                                </div>
                            )}
                            {lesson.projects && lesson.projects.length > 0 && (
                                <p>
                                    <strong>
                                        {t("projects-link", {
                                            count: lesson.projects.length,
                                        })}
                                    </strong>
                                    {lesson.projects.map(
                                        (project, projIndex) => (
                                            <Fragment key={project}>
                                                <Link
                                                    href={`/project#${project}`}
                                                    className="link-secondary underline-anim"
                                                >
                                                    {t.has(
                                                        `projectsContent.${project}.name`,
                                                    )
                                                        ? t(
                                                              `projectsContent.${project}.name`,
                                                          )
                                                        : project}
                                                </Link>
                                                {projIndex <
                                                    lesson.projects!.length -
                                                        1 && ", "}
                                            </Fragment>
                                        ),
                                    )}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </section>
    );
}
