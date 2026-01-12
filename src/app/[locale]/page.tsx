"use client";

import { useTranslations } from "next-intl";
import { Fragment } from "react";

import Bar from "@/components/bar";

export default function HomePage() {
    const t = useTranslations("HomePage");
    return (
        <Fragment>
            <Bar />
            <div className="page-container">{t("title")}</div>
        </Fragment>
    );
}
