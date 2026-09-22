import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import Shell from "@/components/app/shell";
import generateSubMetadata from "@/components/app/subMetadata";
import { routing } from "@/i18n/routing";
import { PATH } from "@/types/common.constants";

export async function generateMetadata(): Promise<Metadata> {
    return generateSubMetadata(routing.defaultLocale, PATH.project);
}

export default function ProjectLayout({
    children,
}: Readonly<PropsWithChildren>) {
    return <Shell locale={routing.defaultLocale}>{children}</Shell>;
}
