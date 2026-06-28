"use client";

import { type ReactNode, useState, memo } from "react";
import { useTranslations } from "next-intl";
import { orderProjectList } from "@/data/data";
import SelectMenu from "@/components/personal/selectMenu";
import type { OrderType, ProjectType } from "@/data/types";
import projectData from "@/data/project.json";

interface ProjectSelectProps {
    onOrderChange: (largeProjects: Array<ProjectType>, littleProjects: Array<ProjectType>) => void;
}

export default function ProjectSelect({
    onOrderChange,
}: ProjectSelectProps): ReactNode {
    const t = useTranslations("ProjectPage");
    const tHome = useTranslations("HomePage");


    const [selectedOrder, setSelectedOrder] = useState<{
        value: OrderType;
        label: string;
    }>({
        value: "default",
        label: t("default"),
    });

    function handleOrderChange(order: OrderType) {
        setSelectedOrder({
            value: order,
            label: t(order),
        });
        onOrderChange(
            projectOrdering(projectData.filter((project) => project.large), order),
            projectOrdering(projectData.filter((project) => !project.large), order),
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
                return projectData.filter((project) =>
                    projects.some((p) => p.id === project.id),
                );
        }
    }

    return (
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
                selectedOption={selectedOrder}
                onOptionSelect={(option) =>
                    handleOrderChange(option as OrderType)
                }
                style={{ minWidth: "150px" }}
            />
        </span>
    );
}
