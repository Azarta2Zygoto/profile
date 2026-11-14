"use client";

import { type ReactNode, use } from "react";

import HomePage from "@/components/app/page/homePage";
import type { Locale } from "@/i18n/routing";
import type { AsyncLocaleProps } from "@/types/common.type";

export default function Home({
    params,
}: Readonly<AsyncLocaleProps>): ReactNode {
    const { locale } = use(params);

    return <HomePage locale={locale as Locale} />;
}
