"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { JSX } from "react";

import { Website } from "@/data/svg";
import type { StudyType } from "@/data/types";

interface ShortStudyProps {
    locale?: string;
}

export default function ShortStudy({ locale }: ShortStudyProps): JSX.Element {
    const t = useTranslations("HomePage");
    const studyContent = t.raw("studyContent") as Array<StudyType>;

    return (
        <section>
            {studyContent.map((key, index) => (
                <div
                    key={index}
                    className="container-study-card"
                >
                    <h3 className="h3-primary">
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
                    <p>
                        {key.period} →{" "}
                        {key.city + (locale !== "fr" ? ", France" : "")}
                    </p>
                    <p>{key.description}</p>
                    <p style={{ marginTop: "1rem" }}>{t("some-lessons")}</p>
                    <div style={{ margin: "0 1rem" }}>
                        {key.lessons.slice(0, 3).map((lesson, lessonIndex) => (
                            <p key={lessonIndex}>{lesson.name}</p>
                        ))}
                        <Link
                            className="inline-link underline-anim"
                            href={`/${locale ?? "fr"}/study#${key.id}`}
                        >
                            {t("see-more")} →
                        </Link>
                    </div>
                </div>
            ))}
        </section>
    );
}
