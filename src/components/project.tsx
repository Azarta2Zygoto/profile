"use client";

import { useTranslations } from "next-intl";
import { JSX } from "react";

import { Github } from "@/data/svg";
import type { ProjectType, StudyType } from "@/data/types";

import Accordeon from "./personal/accordeon";
import Box from "./personal/box";

interface ProjectProps {
    projectContent: Array<ProjectType>;
}

export default function Project({ projectContent }: ProjectProps): JSX.Element {
    const tProject = useTranslations("ProjectPage");
    const t = useTranslations("HomePage");
    const studyContent = t.raw("studyContent") as Array<StudyType>;

    if (projectContent.length === 0) {
        return (
            <section>
                <h2 className="h2-primary">{tProject("no-project-found")}</h2>
                <p>{tProject("no-project-found-desc")}</p>
            </section>
        );
    }

    return (
        <section>
            {projectContent.map((key, index) => (
                <div
                    key={index}
                    className="container-card"
                >
                    {key.study ? (
                        <h3
                            className="h3-primary"
                            id={key.id}
                        >
                            {key.name} -{" "}
                            {studyContent.find((s) => s.id === key.study)?.name}
                        </h3>
                    ) : (
                        <h3
                            className="h3-primary"
                            id={key.id}
                        >
                            {key.name}
                        </h3>
                    )}
                    <p>{key.period}</p>
                    {key.commanditaire && (
                        <p>
                            <strong>{t("commanditaire")}</strong>
                            {key.commanditaire}
                        </p>
                    )}
                    <p style={{ margin: "1rem 0" }}>{key.description}</p>
                    {key.paragraph && (
                        <Accordeon
                            items={{
                                title: t("see-more"),
                                content: (
                                    <div>
                                        {key.paragraph &&
                                            key.paragraph.text && (
                                                <p>{key.paragraph.text}</p>
                                            )}
                                        {key.paragraph &&
                                            key.paragraph.li &&
                                            key.paragraph.li.length > 0 && (
                                                <ul className="list-items">
                                                    {key.paragraph.li.map(
                                                        (item, idx) => (
                                                            <li key={idx}>
                                                                {item}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            )}
                                    </div>
                                ),
                            }}
                        />
                    )}
                    <div
                        className="rows"
                        style={{ margin: "1rem 0" }}
                    >
                        <strong>{t("languages")}</strong>
                        {key.languages.map((lang) => (
                            <Box
                                name={lang}
                                key={lang}
                            />
                        ))}
                    </div>
                    <p>
                        <strong>{t("tools")}</strong> {key.tools.join(", ")}
                    </p>
                    {key.websites && key.websites.length > 0 && (
                        <p>
                            <strong>
                                {t("visit-website", {
                                    count: key.websites.length,
                                })}
                            </strong>
                            {key.websites.map((website) => (
                                <a
                                    key={website.name}
                                    href={website.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-link underline-anim"
                                    style={{ marginLeft: "0.5rem" }}
                                >
                                    {website.name}
                                </a>
                            ))}
                        </p>
                    )}
                    {key.repo && (
                        <p
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                            }}
                        >
                            <Github />
                            <a
                                href={key.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="outside-link"
                                style={{ marginLeft: "0.5rem" }}
                            >
                                {key.repo}
                            </a>
                        </p>
                    )}
                </div>
            ))}
        </section>
    );
}
