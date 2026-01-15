"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Fragment, JSX } from "react";

import { Website } from "@/data/svg";
import type { Locale, ProjectType, StudyType } from "@/data/types";

import Box from "./personal/box";

interface StudyProps {
    locale: Locale;
    languages?: { label: string; value: string }[];
}

export default function Study({ locale, languages }: StudyProps): JSX.Element {
    const t = useTranslations("HomePage");
    const studyContent = (t.raw("studyContent") as Array<StudyType>)
        .filter((study) => {
            if (!languages || languages.length === 0) return true;
            return study.lessons.some((lesson) =>
                lesson.languages.some((lang) =>
                    languages.map((l) => l.value).includes(lang),
                ),
            );
        })
        .map((study) => ({
            ...study,
            lessons: study.lessons.filter((lesson) => {
                if (!languages || languages.length === 0) return true;
                return lesson.languages.some((lang) =>
                    languages.map((l) => l.value).includes(lang),
                );
            }),
        }));
    const projectContent = t.raw("projectContent") as Array<ProjectType>;

    if (studyContent.length === 0) {
        return (
            <section>
                <h2 className="h2-primary">{t("no-study-found")}</h2>
                <p>
                    {t.rich("no-study-found-desc", {
                        link: (chunks) => (
                            <Link
                                href={`/${locale}/project`}
                                className="outside-link"
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
                    className="large-study-container"
                >
                    <h3
                        className="h3-primary"
                        id={key.id}
                    >
                        {key.name} - {key.title}
                        {key.link && (
                            <Link
                                href={key.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="external-link"
                            >
                                <Website />
                            </Link>
                        )}
                    </h3>
                    <p>{key.period}</p>
                    <p>{key.description}</p>
                    {key.lessons.map((lesson, lessonIndex) => (
                        <div
                            key={lessonIndex}
                            className="sub-study-container"
                        >
                            <h4 className="h4-primary">
                                {lesson.name} :
                                {lesson.languages.length > 0 && (
                                    <Box
                                        name={lesson.languages[0]}
                                        style={{ marginLeft: "0.5rem" }}
                                    />
                                )}
                            </h4>
                            <p style={{ marginBottom: "0.5rem" }}>
                                {lesson.description}
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
                                    <strong>{t("projects-link")}</strong>
                                    {lesson.projects.map(
                                        (project, projIndex) => (
                                            <Fragment key={project}>
                                                <Link
                                                    href={`/projects#${project}`}
                                                    className="inline-link underline-anim"
                                                >
                                                    {projectContent.find(
                                                        (p) => p.id === project,
                                                    )?.name || project}
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
