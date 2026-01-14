"use client";

import { useTranslations } from "next-intl";
import { JSX } from "react";

export default function ProjectPage(): JSX.Element {
    const t = useTranslations("ProjectPage");
    return (
        <div>
            <h1 className="h1-primary">{t("title")}</h1>
            <p>{t("introduction")}</p>
        </div>
    );
}
