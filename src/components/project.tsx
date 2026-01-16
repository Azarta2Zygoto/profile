"use client";

import { useFormatter, useTranslations } from "next-intl";
import { JSX } from "react";

import studyData from "@/data/study.json";
import { Github } from "@/data/svg";
import type { ProjectType } from "@/data/types";

import Accordeon from "./personal/accordeon";
import Box from "./personal/box";

interface ProjectProps {
    projectContent: Array<ProjectType>;
}

export default function Project({ projectContent }: ProjectProps): JSX.Element {
    const format = useFormatter();
    const t = useTranslations("HomePage");

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
                            {studyData.find((s) => s.id === key.study)?.name}
                        </h3>
                    ) : (
                        <h3
                            className="h3-primary"
                            id={key.id}
                        >
                            {key.name}
                        </h3>
                    )}
                    <p style={{ textTransform: "capitalize" }}>
                        {key.period.in &&
                            format.dateTime(new Date(key.period.in), {
                                year: "numeric",
                                month: "long",
                            })}
                        {key.period.start &&
                            key.period.end &&
                            `${format.dateTime(new Date(key.period.start), {
                                year: "numeric",
                                month: "long",
                            })} - ${format.dateTime(new Date(key.period.end), {
                                year: "numeric",
                                month: "long",
                            })}`}
                    </p>
                    {key.commanditaire && (
                        <p>
                            <strong>{t("commanditaire")}</strong>
                            {key.commanditaire}
                        </p>
                    )}
                    <p style={{ margin: "1rem 0" }}>
                        {t(`projectsContent.${key.id}.description`)}
                    </p>
                    {t.has(`projectsContent.${key.id}.paragraph`) && (
                        <Accordeon
                            items={{
                                title: t("see-more"),
                                content: (
                                    <div>
                                        {t.has(
                                            `projectsContent.${key.id}.paragraph.text`,
                                        ) && (
                                            <p>
                                                {t(
                                                    `projectsContent.${key.id}.paragraph.text`,
                                                )}
                                            </p>
                                        )}
                                        {t.has(
                                            `projectsContent.${key.id}.paragraph.li`,
                                        ) && (
                                            <ul className="list-items">
                                                {t
                                                    .raw(
                                                        `projectsContent.${key.id}.paragraph.li`,
                                                    )
                                                    .map(
                                                        (
                                                            item: string,
                                                            idx: number,
                                                        ) => (
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
                        <strong>
                            {t("languages", { count: key.languages.length })}
                        </strong>
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
