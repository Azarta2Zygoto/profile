"use client";

import { useTranslations } from "next-intl";
import { JSX } from "react";

import { Website } from "@/data/svg";
import type { StudyType } from "@/data/types";
import { Link } from "@/i18n/navigation";

export default function ShortStudy(): JSX.Element {
    const t = useTranslations("HomePage");
    const studyContent = t.raw("studyContent") as Array<StudyType>;

    return (
        <section>
            {studyContent.map((key, index) => (
                <div
                    key={index}
                    className="container-card"
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
                        {key.period} → {key.city + ", France"}
                    </p>
                    <p style={{ margin: "1rem 0" }}>{key.description}</p>
                    <p>{t("some-lessons")}</p>
                    <ul style={{ margin: "0 1rem" }}>
                        {key.lessons.slice(0, 3).map((lesson, lessonIndex) => (
                            <li key={lessonIndex}>{lesson.name}</li>
                        ))}
                        <Link
                            className="inline-link underline-anim"
                            href={`/study#${key.id}`}
                        >
                            {t("see-more")} →
                        </Link>
                    </ul>
                </div>
            ))}
        </section>
    );
}
