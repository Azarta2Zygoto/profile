"use client";

import { useTranslations } from "next-intl";
import { JSX } from "react";

import { Github } from "@/data/svg";
import type { ProjectType, StudyType } from "@/data/types";

import Box from "./personal/box";

interface ProjectProps {
    languages?: { label: string; value: string }[];
}

export default function Project({ languages }: ProjectProps): JSX.Element {
    const t = useTranslations("HomePage");
    const projectContent = (
        t.raw("projectContent") as Array<ProjectType>
    ).filter((project) => {
        if (!languages || languages.length === 0) return true;
        return project.languages.some((lang) =>
            languages.map((l) => l.value).includes(lang),
        );
    });
    const studyContent = t.raw("studyContent") as Array<StudyType>;

    return (
        <section>
            {projectContent.map((key, index) => (
                <div
                    key={index}
                    className="project-container"
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
                    <div
                        className="rows"
                        style={{ marginBottom: "1rem" }}
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
                    {key.websites &&
                        key.websites.length > 0 &&
                        key.websites.map((website) => (
                            <p key={website.name}>
                                <strong>{t("visit-website")}</strong>
                                <a
                                    href={website.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="outside-link"
                                >
                                    {website.name}
                                </a>
                            </p>
                        ))}
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
