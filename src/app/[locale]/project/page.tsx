"use client";

import { useTranslations } from "next-intl";
import { JSX, useState } from "react";

import Project from "@/components/project";
import { MultiSelect } from "@/components/ui/multi-select";
import language_json from "@/data/language-color.json";

const languagesOptions: { label: string; value: string }[] = Object.keys(
    language_json,
).map((lang) => ({
    label: lang,
    value: lang,
}));

export default function ProjectPage(): JSX.Element {
    const t = useTranslations("ProjectPage");
    const [languages, setLanguages] =
        useState<{ label: string; value: string }[]>(languagesOptions);

    function handleLanguagesChange(selected: string[]) {
        const selectedLanguages = selected.map((lang) => ({
            label: lang,
            value: lang,
        }));
        if (selectedLanguages.length === 0) {
            setLanguages(languagesOptions);
            return;
        }
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
            <Project languages={languages} />
        </div>
    );
}
