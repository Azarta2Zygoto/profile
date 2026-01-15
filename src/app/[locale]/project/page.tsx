"use client";

import { useTranslations } from "next-intl";
import { Fragment, JSX, useState } from "react";

import Project from "@/components/project";
import { MultiSelect } from "@/components/ui/multi-select";
import language_json from "@/data/language-color.json";
import type { ProjectType } from "@/data/types";

const languagesOptions: { label: string; value: string }[] = Object.keys(
    language_json,
).map((lang) => ({
    label: lang,
    value: lang,
}));

export default function ProjectPage(): JSX.Element {
    const t = useTranslations("ProjectPage");
    const tHome = useTranslations("HomePage");

    const constLargeProjectContent = (
        tHome.raw("projectContent") as Array<ProjectType>
    ).filter((project) => project.large);
    const constLittleProjectContent = (
        tHome.raw("projectContent") as Array<ProjectType>
    ).filter((project) => !project.large);

    const [languages, setLanguages] =
        useState<{ label: string; value: string }[]>(languagesOptions);
    const [largeProjectContent, setLargeProjectContent] = useState<
        Array<ProjectType>
    >(constLargeProjectContent);
    const [littleProjectContent, setLittleProjectContent] = useState<
        Array<ProjectType>
    >(constLittleProjectContent);

    function handleLanguagesChange(selected: string[]) {
        const selectedLanguages = selected.map((lang) => ({
            label: lang,
            value: lang,
        }));
        if (selectedLanguages.length === 0) {
            setLanguages(languagesOptions);
            setLargeProjectContent(constLargeProjectContent);
            setLittleProjectContent(constLittleProjectContent);
            return;
        }

        const filteredLarge = constLargeProjectContent.filter((project) =>
            project.languages.some((lang) =>
                selectedLanguages.map((l) => l.value).includes(lang),
            ),
        );
        const filteredLittle = constLittleProjectContent.filter((project) =>
            project.languages.some((lang) =>
                selectedLanguages.map((l) => l.value).includes(lang),
            ),
        );
        setLargeProjectContent(filteredLarge);
        setLittleProjectContent(filteredLittle);
        setLanguages(selectedLanguages);
    }
    return (
        <div>
            <h1 className="h1-primary">{t("title")}</h1>
            <p style={{ marginBottom: "1rem" }}>{t("introduction")}</p>
            <MultiSelect
                options={languagesOptions}
                onValueChange={(values) => handleLanguagesChange(values)}
            />
            {largeProjectContent.length === 0 &&
                littleProjectContent.length === 0 && (
                    <section>
                        <h2
                            className="h2-primary m-2"
                            style={{ marginTop: "1rem" }}
                        >
                            {t("no-project-found")}
                        </h2>
                        <p>{t.rich("no-project-found-desc")}</p>
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
        </div>
    );
}
