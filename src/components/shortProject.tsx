"use client";

import { useFormatter, useTranslations } from "next-intl";
import { JSX } from "react";

import projectData from "@/data/project.json";
import studyData from "@/data/study.json";

import Box from "./personal/box";

export default function ShortProject(): JSX.Element {
    const format = useFormatter();
    const t = useTranslations("HomePage");

    return (
        <section>
            {projectData.slice(0, 4).map((key, index) => (
                <div
                    key={index}
                    className="card-container"
                >
                    <h3 className="h3-primary">
                        {t(`projectsContent.${key.id}.name`)}
                    </h3>
                    <br />
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
                    <div className="box-container">
                        {key.languages.length > 0 &&
                            key.languages.map((lang) => (
                                <Box
                                    key={lang}
                                    name={lang}
                                />
                            ))}
                    </div>
                    <p>{t(`projectsContent.${key.id}.description`)}</p>
                </div>
            ))}
        </section>
    );
}
