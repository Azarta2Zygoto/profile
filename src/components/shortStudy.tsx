"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { JSX } from "react";

import { base_path } from "@/data/env";
import studyData from "@/data/study.json";
import { Website } from "@/data/svg";
import { Link } from "@/i18n/navigation";

interface ShortStudyProps {
    locale: string;
}

export default function ShortStudy({
    locale = "fr",
}: ShortStudyProps): JSX.Element {
    const t = useTranslations("HomePage");

    return (
        <section>
            {studyData.map((key, index) => (
                <div
                    key={index}
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
                    <p className="p-minor">
                        {key.period.start + " - " + key.period.end} →{" "}
                        {key.city + ", France"}
                    </p>
                    <p style={{ margin: "1rem 0" }}>
                        {t(`${key.id}.description`)}
                    </p>
                    <p>{t("some-lessons")}</p>
                    <ul className="list-items">
                        {key.lessons.slice(0, 3).map((lesson, lessonIndex) => (
                            <li key={lessonIndex}>
                                {t(`${key.id}.lessons.${lesson.id}.name`)}
                            </li>
                        ))}
                        <Link
                            className="link-secondary underline-anim"
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
