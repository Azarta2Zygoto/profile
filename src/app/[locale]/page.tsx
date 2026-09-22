"use client";

import { type ReactNode, use } from "react";

import HomePage from "@/components/app/page/homePage";
import { Locale } from "@/i18n/routing";
import { AsyncLocaleProps } from "@/types/common.types";

export default function Home({
    params,
}: Readonly<AsyncLocaleProps>): ReactNode {
    const { locale } = use(params);

    return <HomePage locale={locale as Locale} />;
}
