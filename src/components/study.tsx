"use client";

import { useTranslations } from "next-intl";
import { Fragment, JSX } from "react";

import Box from "./personal/box";

interface StudyProps {
    name: string;
    title: string;
    description: string;
    period: string;
    lessons: lessonProps[];
}

interface lessonProps {
    name: string;
    description: string;
    tools: string[];
    languages: string[];
}

export default function Study(): JSX.Element {
    const t = useTranslations("HomePage");
    const studyContent = t.raw("studyContent") as Array<StudyProps>;

    return (
        <section>
            {studyContent.map((key, index) => (
                <div key={index}>
                    <h3 className="h3-primary">
                        {key.name} - {key.title}
                    </h3>
                    <p>{key.period}</p>
                    <p>{key.description}</p>
                    {key.lessons.map((lesson, lessonIndex) => (
                        <div
                            key={lessonIndex}
                            style={{ margin: "1rem" }}
                        >
                            <h4 className="h4-primary">
                                {lesson.name} :
                                {lesson.languages.length > 0 && (
                                    <Box name={lesson.languages[0]} />
                                )}
                            </h4>
                            <p>{lesson.description}</p>
                            <p>
                                <strong>{t("tools")}</strong>
                                {lesson.tools.join(", ")}
                            </p>
                            <p className="rows">
                                {lesson.languages.length > 1 && (
                                    <Fragment>
                                        <strong>{t("other-languages")}</strong>
                                        {lesson.languages
                                            .slice(1)
                                            .map((lang) => (
                                                <Box
                                                    name={lang}
                                                    key={lang}
                                                    primary={false}
                                                />
                                            ))}
                                    </Fragment>
                                )}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </section>
    );
}
