"use client";

import { useTranslations } from "next-intl";
import { Fragment, JSX, useState } from "react";

import SelectMenu from "@/components/personal/selectMenu";
import Project from "@/components/project";
import { MultiSelect } from "@/components/ui/multi-select";
import { orderProjectList } from "@/data/data";
import language_json from "@/data/language-color.json";
import projectData from "@/data/project.json";
import type { OrderType, ProjectType } from "@/data/types";

const languagesOptions: { label: string; value: string }[] = Object.keys(
    language_json,
).map((lang) => ({
    label: lang,
    value: lang,
}));

export default function ProjectPage(): JSX.Element {
    const t = useTranslations("ProjectPage");
    const tHome = useTranslations("HomePage");

    const constLargeProjectContent = (projectData as Array<ProjectType>).filter(
        (project) => project.large,
    );
    const constLittleProjectContent = (
        projectData as Array<ProjectType>
    ).filter((project) => !project.large);

    const [largeProjectContent, setLargeProjectContent] = useState<
        Array<ProjectType>
    >(constLargeProjectContent);
    const [littleProjectContent, setLittleProjectContent] = useState<
        Array<ProjectType>
    >(constLittleProjectContent);
    const [selectedOrder, setSelectedOrder] = useState<OrderType>("default");

    function handleLanguagesChange(selected: string[]) {
        const selectedLanguages = selected.map((lang) => ({
            label: lang,
            value: lang,
        }));
        if (selectedLanguages.length === 0) {
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
    }

    function handleOrderChange(order: OrderType) {
        setSelectedOrder(order);
        setLargeProjectContent((prevProjects) =>
            projectOrdering(prevProjects, order),
        );
        setLittleProjectContent((prevProjects) =>
            projectOrdering(prevProjects, order),
        );
    }

    function projectOrdering(
        projects: Array<ProjectType>,
        order: OrderType,
    ): Array<ProjectType> {
        switch (order) {
            case "date":
                return projects.sort((a, b) => {
                    const dateA = a.period.start
                        ? new Date(a.period.start)
                        : a.period.in
                          ? new Date(a.period.in)
                          : null;
                    const dateB = b.period.start
                        ? new Date(b.period.start)
                        : b.period.in
                          ? new Date(b.period.in)
                          : null;
                    if (dateA && dateB) {
                        return dateB.getTime() - dateA.getTime();
                    } else if (dateA) {
                        return -1;
                    } else if (dateB) {
                        return 1;
                    }
                    return 0;
                });
            case "lexicographical":
                return projects.sort((a, b) =>
                    tHome(`projectsContent.${a.id}.name`).localeCompare(
                        tHome(`projectsContent.${b.id}.name`),
                    ),
                );
            case "default":
                return projectData.filter((project) =>
                    projects.some((p) => p.id === project.id),
                );
            default:
                return projects;
        }
    }

    return (
        <Fragment>
            <h1 className="h1-primary">{t("title")}</h1>
            <p style={{ marginBottom: "1rem" }}>{t("introduction")}</p>
            <div className="rows">
                <MultiSelect
                    options={languagesOptions}
                    onValueChange={(values) => handleLanguagesChange(values)}
                />
                <span className="rows">
                    <label htmlFor="project-order-select">
                        {t("order-by")}
                    </label>
                    <SelectMenu
                        id="project-order-select"
                        options={orderProjectList.map((order) => ({
                            label: t(order),
                            value: order,
                        }))}
                        selectedOption={t(selectedOrder)}
                        onOptionSelect={(option) =>
                            handleOrderChange(option as OrderType)
                        }
                        style={{ minWidth: "150px" }}
                    />
                </span>
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
