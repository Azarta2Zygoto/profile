"use client";

import { type ReactNode } from "react";

import StudyPage from "@/components/app/page/studyPage";
import { routing } from "@/i18n/routing";

export default function Study(): ReactNode {
    return <StudyPage locale={routing.defaultLocale} />;
}
