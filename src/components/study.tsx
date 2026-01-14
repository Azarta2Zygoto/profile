"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Fragment, JSX } from "react";

import { Website } from "@/data/svg";
import type { ProjectType, StudyType } from "@/data/types";

import Box from "./personal/box";

export default function Study(): JSX.Element {
    const t = useTranslations("HomePage");
    const studyContent = t.raw("studyContent") as Array<StudyType>;
    const projectContent = t.raw("projectContent") as Array<ProjectType>;

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
                                    <Box name={lesson.languages[0]} />
                                )}
                            </h4>
                            <p>{lesson.description}</p>

                            {lesson.tools.length > 0 && (
                                <p>
                                    <strong>{t("tools")}</strong>
                                    {lesson.tools.join(", ")}
                                </p>
                            )}
                            {lesson.languages.length > 1 && (
                                <div className="rows">
                                    <strong>{t("other-languages")}</strong>
                                    {lesson.languages.slice(1).map((lang) => (
                                        <Box
                                            name={lang}
                                            key={lang}
                                            primary={false}
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
