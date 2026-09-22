"use client";

import { type ReactNode } from "react";

import ErrorPage, { ErrorProps } from "@/components/app/error";

export default function Error({
    error,
    reset,
}: Readonly<ErrorProps>): ReactNode {
    return (
        <ErrorPage
            error={error}
            reset={reset}
        />
    );
}
