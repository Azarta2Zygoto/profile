"use client";

import { useTranslations } from "next-intl";
import { JSX, use, useState } from "react";

import Study from "@/components/study";
import { MultiSelect } from "@/components/ui/multi-select";
import language_json from "@/data/language-color.json";
import { Locale } from "@/data/types";

const languagesOptions: { label: string; value: string }[] = Object.keys(
    language_json,
).map((lang) => ({
    label: lang,
    value: lang,
}));

export default function StudyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}): JSX.Element {
    const { locale } = use(params);
    const t = useTranslations("StudyPage");
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
            <MultiSelect
                options={languagesOptions}
                onValueChange={(values) => handleLanguagesChange(values)}
            />
            <Study
                languages={languages}
                locale={locale as Locale}
            />
        </div>
    );
}
