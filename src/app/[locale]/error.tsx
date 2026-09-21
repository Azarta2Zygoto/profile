"use client";

import { useTranslations } from "next-intl";
import { type ReactNode } from "react";

import { ErrorMain } from "../error";

interface Props {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: Readonly<Props>): ReactNode {
    const t = useTranslations("ErrorPage");

    return (
        <ErrorMain
            message={{
                title: t("title"),
                description: t("description"),
                retry: t("retry"),
                retryAria: t("retry-aria"),
                backToHome: t("back-to-home"),
                advise: t("advise"),
            }}
            error={error}
            reset={reset}
        />
    );
}
