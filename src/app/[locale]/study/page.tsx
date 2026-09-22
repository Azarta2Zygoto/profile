"use client";

import { type ReactNode, use } from "react";

import StudyPage from "@/components/app/page/studyPage";
import type { Locale } from "@/i18n/routing";
import type { AsyncLocaleProps } from "@/types/common.types";

export default function Study({
    params,
}: Readonly<AsyncLocaleProps>): ReactNode {
    const { locale } = use(params);

    return <StudyPage locale={locale as Locale} />;
}
