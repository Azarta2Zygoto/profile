"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Fragment, JSX } from "react";

import { base_path } from "@/data/env";
import studyData from "@/data/study.json";
import { Website } from "@/data/svg";
import type { Locale, StudyType } from "@/data/types";
import { Link } from "@/i18n/navigation";

import Box from "./personal/box";

interface StudyProps {
    locale: string;
    total: number;
    languages: { label: string; value: string }[];
}

export default function Study({
    locale = "fr",
    total,
    languages,
}: StudyProps): JSX.Element {
    const t = useTranslations("HomePage");
    const studyContent = (studyData as StudyType[])
        .filter((study) => {
            if (languages.length === 0) return true;
            return study.lessons.some((lesson) =>
                lesson.languages.some((lang) =>
                    languages.map((l) => l.value).includes(lang),
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
                    languages.map((l) => l.value).includes(lang),
                );
            }),
        })) as StudyType[];

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
            {studyContent.map((key, index) => (
                <div
                    key={index}
                    id={key.id}
                >
                    <div className="icon-title">
                        <h3 className="h3-secondary">
                            {key.name} - {t(`${key.id}.title`)}
                        </h3>
                        {key.link && (
                            <Link
                                href={
                                    key.link +
                                    (key.locales?.includes(locale as Locale)
                                        ? `/${locale}`
                                        : "")
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="external-link"
                            >
                                {key.logo ? (
                                    <Image
                                        src={`${base_path}logo/${key.logo}`}
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
                    <p>
                        {key.period.start + " - " + key.period.end} →{" "}
                        {key.city + ", France"}
                    </p>
                    <p>{t(`${key.id}.description`)}</p>
                    {key.lessons.map((lesson, lessonIndex) => (
                        <div
                            key={lessonIndex}
                            className="container-card"
                        >
                            <h4 className="h4-primary">
                                {t(`${key.id}.lessons.${lesson.id}.name`)}
                                {lesson.link && (
                                    <Link
                                        href={lesson.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="external-link"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                                            />
                                        </svg>
                                    </Link>
                                )}{" "}
                                :
                                {lesson.languages.length > 0 && (
                                    <Box
                                        name={lesson.languages[0]}
                                        style={{ marginLeft: "0.5rem" }}
                                    />
                                )}
                            </h4>
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
                                            primary={false}
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
