"use client";

import { type ReactNode } from "react";

import ErrorPage, { ErrorProps } from "@/components/app/error";
import Shell from "@/components/app/shell";
import { routing } from "@/i18n/routing";

export default function Error({
    error,
    reset,
}: Readonly<ErrorProps>): ReactNode {
    return (
        <Shell locale={routing.defaultLocale}>
            <ErrorPage
                error={error}
                reset={reset}
            />
        </Shell>
    );
}
