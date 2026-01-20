"use client";

import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";

import { base_path } from "@/data/env";
import studyData from "@/data/study.json";
import { Linkedin, Website } from "@/data/svg";
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
                    className="card-container"
                >
                    <div className="icon-title">
                        <h3
                            className="h3-secondary"
                            id={key.id}
                        >
                            {t(`projectsContent.${key.id}.name`)}
                            {key.commanditaire &&
                                " - " + key.commanditaire.name}
                        </h3>
                        {key.commanditaire && (
                            <Link
                                href={key.commanditaire.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="external-link"
                            >
                                {key.commanditaire.logo ? (
                                    <Image
                                        src={`${base_path}logo/${key.commanditaire.logo}`}
                                        alt={`${key.commanditaire.name} logo`}
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
                        {key.study &&
                            " → " +
                                studyData.find((s) => s.id === key.study)?.name}
                    </p>
                    <br />
                    {key.creators && key.creators.length > 0 && (
                        <p className="p-minor">
                            <strong style={{ marginRight: "0.5rem" }}>
                                {t("creators", { count: key.creators.length })}
                            </strong>
                            {key.creators.map((creator, idx) => (
                                <span
                                    key={idx}
                                    className="inline-text mr-1"
                                >
                                    {creator.linkedin ? (
                                        <a
                                            href={creator.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="external-link"
                                            style={{
                                                margin: "0 0.15rem",
                                            }}
                                        >
                                            <Linkedin
                                                width={16}
                                                height={16}
                                            />
                                        </a>
                                    ) : creator.github ? (
                                        <a
                                            href={creator.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="external-link"
                                            style={{
                                                margin: "0 0.15rem",
                                            }}
                                        >
                                            <Github
                                                width={16}
                                                height={16}
                                            />
                                        </a>
                                    ) : creator.website ? (
                                        <a
                                            href={creator.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="external-link"
                                            style={{
                                                margin: "0 0.15rem",
                                            }}
                                        >
                                            <Website
                                                width={16}
                                                height={16}
                                            />
                                        </a>
                                    ) : (
                                        <></>
                                    )}
                                    {creator.name}
                                    {idx < key.creators!.length - 1 && ", "}
                                </span>
                            ))}
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
                                    className="link-secondary underline-anim"
                                    style={{ marginLeft: "0.5rem" }}
                                >
                                    {website.name}
                                </a>
                            ))}
                        </p>
                    )}
                    {key.repo && (
                        <p className="inline-text">
                            <Github />
                            <a
                                href={key.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link-primary"
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
