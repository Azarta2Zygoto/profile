"use client";

import { useTranslations } from "next-intl";
import { Fragment, type ReactNode, use, useState } from "react";

import { MultiSelect } from "@/components/personal/multi-select";
import Study from "@/components/study/study";
import CATEGORY_COLORS from "@/data/category-color.json";
import type { Locale } from "@/i18n/routing";
import type { LocaleProps, SelectOption } from "@/types/common.types";

const languagesOptions: SelectOption[] = Object.keys(CATEGORY_COLORS).map(
    (lang) => ({
        label: lang,
        value: lang,
    }),
);

export default function StudyPage({
    params,
}: Readonly<LocaleProps>): ReactNode {
    const { locale } = use(params);

    const t = useTranslations("StudyPage");
    const [languages, setLanguages] =
        useState<SelectOption[]>(languagesOptions);

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
        <Fragment>
            <h1 className="h1-primary">{t("title")}</h1>
            <MultiSelect
                options={languagesOptions}
                onValueChange={(values) => handleLanguagesChange(values)}
            />
            <Study
                languages={languages}
                locale={locale as Locale}
                total={languagesOptions.length}
            />
        </Fragment>
    );
}
