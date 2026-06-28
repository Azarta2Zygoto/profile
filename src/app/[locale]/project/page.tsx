"use client";

import { useTranslations } from "next-intl";
import { Fragment, type ReactNode, useCallback, useState } from "react";

import { MultiSelect } from "@/components/personal/multi-select";
import Project from "@/components/project/project";
import ProjectSelect from "@/components/project/projectSelect";
import language_json from "@/data/language-color.json";
import projectData from "@/data/project.json";
import type { ProjectType } from "@/data/types";

const languagesOptions: { label: string; value: string }[] = Object.keys(
    language_json,
).map((lang) => ({
    label: lang,
    value: lang,
}));

const [constLargeProjectContent, constLittleProjectContent] = [
    projectData.filter((project) => project.large) as Array<ProjectType>,
    projectData.filter((project) => !project.large) as Array<ProjectType>,
];

export default function ProjectPage(): ReactNode {
    const t = useTranslations("ProjectPage");

    const [largeProjectContent, setLargeProjectContent] = useState<
        Array<ProjectType>
    >(constLargeProjectContent);
    const [littleProjectContent, setLittleProjectContent] = useState<
        Array<ProjectType>
    >(constLittleProjectContent);

    const handleLanguagesChange = (selected: string[]) => {
        const selectedLanguageValues = new Set(selected);

        if (selectedLanguageValues.size === 0) {
            setLargeProjectContent(constLargeProjectContent);
            setLittleProjectContent(constLittleProjectContent);
            return;
        }

        const filteredLarge = constLargeProjectContent.filter((project) =>
            project.languages.some((lang) => selectedLanguageValues.has(lang)),
        );
        const filteredLittle = constLittleProjectContent.filter((project) =>
            project.languages.some((lang) => selectedLanguageValues.has(lang)),
        );
        setLargeProjectContent(filteredLarge);
        setLittleProjectContent(filteredLittle);
    };

    const handleOrderChange = (
        largeProjects: Array<ProjectType>,
        littleProjects: Array<ProjectType>,
    ) => {
        setLargeProjectContent(largeProjects);
        setLittleProjectContent(littleProjects);
    };

    return (
        <Fragment>
            <h1 className="h1-primary">{t("title")}</h1>
            <p style={{ marginBottom: "1rem" }}>{t("introduction")}</p>
            <div className="rows">
                <MultiSelect
                    options={languagesOptions}
                    onValueChange={handleLanguagesChange}
                />
                <ProjectSelect onOrderChange={handleOrderChange} />
            </div>
            {largeProjectContent.length === 0 &&
                littleProjectContent.length === 0 && (
                    <section>
                        <h2
                            className="h2-primary m-2"
                            style={{ marginTop: "1rem" }}
                        >
                            {t("no-project-found")}
                        </h2>
                        <p>{t("no-project-found-desc")}</p>
                    </section>
                )}
            {largeProjectContent.length > 0 && (
                <Fragment>
                    <h2
                        className="h2-primary"
                        style={{ marginTop: "1rem" }}
                    >
                        {t("large-projects")}
                    </h2>
                    <Project projectContent={largeProjectContent} />
                </Fragment>
            )}
            {littleProjectContent.length > 0 && (
                <Fragment>
                    <h2
                        className="h2-primary"
                        style={{ marginTop: "1rem" }}
                    >
                        {t("little-projects")}
                    </h2>
                    <Project projectContent={littleProjectContent} />
                </Fragment>
            )}
        </Fragment>
    );
}
