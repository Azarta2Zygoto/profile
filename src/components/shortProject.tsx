"use client";

import { useTranslations } from "next-intl";
import { JSX } from "react";

import type { ProjectType } from "@/data/types";

import Box from "./personal/box";

export default function ShortProject(): JSX.Element {
    const t = useTranslations("HomePage");
    const projectContent = t.raw("projectContent") as Array<ProjectType>;

    return (
        <section>
            {projectContent.slice(0, 4).map((key, index) => (
                <div
                    key={index}
                    className="container-study-card"
                >
                    <h3 className="h3-primary">{key.name}</h3>
                    <p>
                        {key.period}
                        {key.commanditaire && " → " + key.commanditaire}
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
                    <p>{key.description}</p>
                </div>
            ))}
        </section>
    );
}
